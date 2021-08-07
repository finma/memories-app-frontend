import React, { useState, useRef } from "react";
import { Typography, Button, TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";

import useStyles from "./style";
import { commentPost } from "../../config/redux/actions";

const CommentSection = ({ post }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const commentRef = useRef();

  const user = JSON.parse(localStorage.getItem("profile"));
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");

  const handleComment = async () => {
    const finalComment = `${user.result.name}: ${comment}`;
    const newComments = await dispatch(commentPost(finalComment, post._id));

    setComments(newComments);
    setComment("");

    commentRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography variant="h6" gutterBottom>
            Comments
          </Typography>
          {comments.map((c, i) => (
            <Typography key={i} variant="subtitle1" gutterBottom>
              <strong>{c.split(": ")[0]}</strong>
              {c.split(":")[1]}
            </Typography>
          ))}
          <div ref={commentRef} />
        </div>
        <div style={{ width: "70%" }}>
          <Typography variant="h6" gutterBottom>
            Write a Comment
          </Typography>
          <TextField
            label="Comment"
            variant="outlined"
            value={comment}
            rows={4}
            multiline
            fullWidth
            onChange={(e) => setComment(e.target.value)}
          />
          <br />
          <Button
            style={{ marginTop: "10px" }}
            color="primary"
            variant="contained"
            disabled={!user || !comment}
            onClick={handleComment}
          >
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
