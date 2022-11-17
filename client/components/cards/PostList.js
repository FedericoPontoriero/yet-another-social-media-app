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

const PostList = ({ posts, handleDelete, handleLike, handleUnlike }) => {
  const [state] = useContext(UserContext);
  const router = useRouter();

  return (
    <>
      {posts &&
        posts.map((post) => (
          <div key={post._id} className="card mb-5">
            <div className="card-header">
              <Avatar size={40}>{post.postedBy.name[0]}</Avatar>
              <span className="pt-2 ml-3" style={{ marginLeft: "1rem" }}>
                {post.postedBy.name}
              </span>
              <span className="pt-2 ml-3" style={{ marginLeft: "1rem" }}>
                {moment(post.createdAt).fromNow()}
              </span>
            </div>
            <div className="card-body">{renderHTML(post.content)}</div>
            <div className="card-footer">
              {post.image && <PostImage url={post.image.url} />}
              <div className="d-flex pt-2">
                {post.likes.includes(state.user._id) ? (
                  <HeartFilled
                    onClick={() => handleUnlike(post._id)}
                    className="text-danger pt-2 px-2 h5"
                  />
                ) : (
                  <HeartOutlined
                    onClick={() => handleLike(post._id)}
                    className="text-danger pt-2 px-2 h5"
                  />
                )}
                <div
                  className="pt-2 px-3"
                  style={{ marginRight: "1rem" }}
                ></div>
                <CommentOutlined className="text-danger px-2 pt-2 h5" />
                <div className="pt-2 px-3"></div>
                {state && state.user && state.user._id === post.postedBy._id && (
                  <>
                    <EditOutlined
                      className="text-danger px-2 mx-auto pt-2 h5"
                      onClick={() => router.push(`/user/post/${post._id}`)}
                    />
                    <DeleteOutlined
                      onClick={() => handleDelete(post)}
                      className="text-danger px-2 pt-2 h5"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default PostList;
