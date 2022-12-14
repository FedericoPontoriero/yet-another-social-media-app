import renderHTML from "react-render-html";
import moment from "moment";
import { Avatar } from "antd";
import PostImage from "../images/PostImage";
import {
  EditOutlined,
  DeleteOutlined,
  CommentOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { useContext } from "react";
import { useRouter } from "next/router";

import { UserContext } from "../../context";
import { imageSource } from "../../functions";
import Link from "next/link";
import Post from "../../components/cards/Post";

const PostList = ({
  posts,
  handleDelete,
  handleLike,
  handleUnlike,
  handleComment,
  removeComment,
}) => {
  const [state] = useContext(UserContext);
  const router = useRouter();

  return (
    <>
      {posts &&
        posts.map((post) => (
          <Post
            removeComment={removeComment}
            key={post._id}
            post={post}
            handleDelete={handleDelete}
            handleLike={handleLike}
            handleUnlike={handleUnlike}
            handleComment={handleComment}
          />
        ))}
    </>
  );
};

export default PostList;
