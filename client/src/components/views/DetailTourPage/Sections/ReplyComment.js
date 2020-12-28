/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable array-callback-return */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import SingleComment from './SingleComment';

function ReplyComment(props) {
  const [childCommentNumber, setChildCommentNumber] = useState(0);
  const [openReplyComments, setOpenReplyComments] = useState(false);

  useEffect(() => {
    let commentNumber = 0;
    props.commentLists.map((comment) => {
      if (comment.responseTo === props.parentCommentId) {
        commentNumber += 1;
      }
    });

    setChildCommentNumber(commentNumber);
  }, [props.commentLists, props.parentCommentId]);

  const renderReplyComment = (parentCommentId) => props.commentLists.map((comment, index) => (
    <>
      {comment.responseTo === parentCommentId && (
      <div style={{ width: '80%', marginLeft: '40px' }}>
        <SingleComment
          comment={comment}
          tourId={props.tourId}
          refreshFunction={props.refreshFunction}
        />

        <ReplyComment
          commentLists={props.commentLists}
          parentCommentId={comment._id}
          tourId={props.tourId}
          refreshFunction={props.refreshFunction}
        />
      </div>
      )}
    </>
  ));

  const handleChange = () => {
    setOpenReplyComments(!openReplyComments);
  };

  return (
    <div>
      {childCommentNumber > 0 && (
        <p
          style={{ fontSize: '14px', marginBottom: 15, color: 'gray' }}
          onClick={handleChange}
        >
          View
          {' '}
          {childCommentNumber}
          {' '}
          more comment(s)
        </p>
      )}

      {openReplyComments && renderReplyComment(props.parentCommentId)}
    </div>
  );
}

export default ReplyComment;
