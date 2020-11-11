const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Tour } = require("../models/Tour");
const { auth } = require("../middleware/auth");

var storage = multer.diskStorage({
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

var upload = multer({ storage: storage }).single("file");

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
      return res.status(200).send(tour);
    });
});

module.exports = router;
