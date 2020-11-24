const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Tour } = require("../models/Tour");
const { auth } = require("../middleware/auth");
const gTTS = require("gtts");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" || ext !== ".png" || ext !== ".jpeg") {
      return cb(res.status(400).end("only images are allowed"), false);
    }
    cb(null, true);
  },
});

const upload = multer({ storage: storage }).single("file");

router.post("/uploadImage", auth, (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      image: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post("/uploadTour", auth, (req, res) => {
  const tour = new Tour(req.body);
  tour.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/getTours", auth, (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);

  let findArgs = {};
  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  let term = req.body.searchTerm;

  if (term) {
    Tour.find(findArgs)
      .find({ $text: { $search: term } })
      .populate("writer")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, tours) => {
        if (err) {
          return res.status(400).json({ success: false, err });
        }
        return res
          .status(200)
          .json({ success: true, tours, postSize: tours.length });
      });
  } else {
    Tour.find(findArgs)
      .populate("writer")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, tours) => {
        if (err) {
          return res.status(400).json({ success: false, err });
        }
        return res
          .status(200)
          .json({ success: true, tours, postSize: tours.length });
      });
  }
});

router.get("/tours_by_id", auth, (req, res) => {
  let type = req.query.type;
  let tourId = req.query.id;

  if (type === "array") {
    let ids = req.query.id.split(",");
    tourId = [];
    tourId = ids.map((item) => {
      return item;
    });
  }

  Tour.find({ _id: { $in: tourId } })
    .populate("writer")
    .exec((err, tour) => {
      if (err) return res.status(400).send(err);
      // generate sound file
      const speech = tour[0].description;
      const gtts = new gTTS(speech, "vi");

      // save sound file in uploads folder
      if (tour[0].sound) {
        console.log(tour[0].sound);
      } else {
        gtts.save(
          `C:/Users/Admin/Desktop/Project-3/uploads/voice/${tour[0]._id}.mp3`,
          function (err, result) {
            if (err) {
              throw new Error(err);
            }
            console.log("Text to speech converted!");
          }
        );
      }

      return res.status(200).send(tour);
    });
});

router.post("/updateSoundFile", auth, (req, res) => {
  let tourId = req.query.id;
  let soundFile = String.raw`uploads\voice\``;
  soundFile = soundFile.slice(0, -1);
  soundFile += `${tourId}.mp3`;
  Tour.findOneAndUpdate(
    { _id: { $in: tourId } },
    { $set: { sound: soundFile } },
    { new: true },
    (err, tour) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(tour);
    }
  );
});

module.exports = router;
