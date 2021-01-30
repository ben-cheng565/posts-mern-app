import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../redux/actions/posts";

import useStyles from "./styles";

const Post = ({ post, setCurrId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const Likes = () => {
    const likesCount = post.likes.length;
    if (likesCount > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likesCount > 2
            ? `You and ${likesCount - 1} others`
            : `${likesCount} like${likesCount > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{likesCount} {likesCount === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={
          post.selectedFile ||
          "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
        }
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      {(user?.result?.googleId === post?.creator ||
        user?.result?._id === post?.creator) && (
        <div className={classes.overlay2}>
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => setCurrId(post._id)}
          >
            <MoreHorizIcon fontSize="default" />
          </Button>
        </div>
      )}
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography
        className={classes.title}
        variant="h6"
        gutterBottom
        component="h2"
      >
        {post.title}
      </Typography>
      <CardContent>
        <Typography
          className={classes.cardContent}
          variant="body2"
          color="textSecondary"
          component="p"
          noWrap={true}
        >
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={user?.result ? false : true}
          onClick={() => dispatch(likePost(post._id))}
        >
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(deletePost(post._id))}
          >
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
