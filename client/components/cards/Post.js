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

const Post = ({
  post,
  handleDelete,
  handleLike,
  handleUnlike,
  handleComment,
  commentCount = 10,
  removeComment,
}) => {
  const [state] = useContext(UserContext);
  const router = useRouter();

  return (
    <>
      {post && post.postedBy && (
        <div key={post._id} className="card mb-5">
          <div className="card-header">
            <Avatar size={40} src={imageSource(post.postedBy)} />
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
              {state &&
              state.user &&
              post.likes &&
              post.likes.includes(state.user._id) ? (
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
              <div className="pt-2 px-3" style={{ marginRight: "1rem" }}>
                {post.likes.length} likes
              </div>
              <CommentOutlined
                onClick={() => handleComment(post)}
                className="text-danger px-2 pt-2 h5"
              />
              <div className="pt-2 px-3">
                <Link href={`/post/${post._id}`}>
                  <a>{post.comments.length} comments</a>
                </Link>
              </div>
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
          {post.comments && post.comments.length > 0 && (
            <ol
              className="list-group"
              style={{ maxHeight: "125px", overflow: "scroll" }}
            >
              {post.comments.slice(0, commentCount).map((c) => (
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div>
                      <Avatar
                        size={20}
                        className="mb-1 mr-3"
                        src={imageSource(c.postedBy)}
                      />
                      {c.postedBy.name}
                    </div>
                    <div>{c.text}</div>
                  </div>
                  <span className="text-muted badge rounded-pill">
                    {moment(c.created).fromNow()}
                    {state && state.user && state.user._id === c.postedBy._id && (
                      <div className="ml-auto mt-1">
                        <DeleteOutlined
                          onClick={() => removeComment(post._id, c)}
                          className="pl-3 text-danger"
                        />
                      </div>
                    )}
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}
    </>
  );
};

export default Post;
