import React, { useState } from "react";
import { Comment, Avatar, Button, Input } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";

function SingleComment(props) {
  const user = useSelector((state) => state.user);
  const [commentValue, setCommentValue] = useState("");
  const [openReply, setOpenReply] = useState(false);

  const handleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  };

  const onOpenReply = () => {
    setOpenReply(!openReply);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      writer: user.userData._id,
      tourId: props.tourId,
      responseTo: props.comment._id,
      content: commentValue,
    };

    axios.post("/api/comments/saveComment", variables).then((response) => {
      if (response.data.success) {
        setCommentValue("");
        setOpenReply(!openReply);
        props.refreshFunction(response.data.result);
      } else {
        alert("Failed to save Comment");
      }
    });
  };

  const actions = [
    <span onClick={onOpenReply} key="comment-basic-reply-to">
      Reply to{" "}
    </span>,
  ];

  return (
    <div>
      <Comment
        actions={actions}
        author={props.comment.writer.name}
        avatar={<Avatar src={props.comment.writer.image} alt="image" />}
        content={<p>{props.comment.content}</p>}
      ></Comment>

      {openReply && (
        <form style={{ display: "flex", marginBottom: 15 }} onSubmit={onSubmit}>
          <Input
            style={{ width: "100%", borderRadius: "5px" }}
            onChange={handleChange}
            value={commentValue}
            placeholder="Write some comments ..."
          />
          <br />
          <Button style={{ marginLeft: 10 }} onClick={onSubmit}>
            Submit
          </Button>
        </form>
      )}
    </div>
  );
}

export default SingleComment;
