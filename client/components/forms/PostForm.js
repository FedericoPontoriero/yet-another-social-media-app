import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { CameraOutlined, LoadingOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

const PostForm = ({
  content,
  uploading,
  image,
  setContent,
  postSubmit,
  handleImage,
}) => {
  return (
    <div className="card">
      <div className="card-body pb-3">
        <form className="form-group">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={(e) => setContent(e)}
            className="form-control"
            placeholder="Write something..."
          />
        </form>
      </div>
      <div className="d-flex justify-content-between text-muted card-footer">
        <button
          disabled={!content}
          onClick={postSubmit}
          className="btn btn-sm btn-primary mt-1"
        >
          Post
        </button>
        <label>
          {image && image.url ? (
            <Avatar size={30} src={image.url} className="mt-1" />
          ) : uploading ? (
            <LoadingOutlined className="mt-2" />
          ) : (
            <CameraOutlined onChange={handleImage} className="mt-2" />
          )}
          <input hidden type="file" accept="images/*" />
        </label>
      </div>
    </div>
  );
};

export default PostForm;
