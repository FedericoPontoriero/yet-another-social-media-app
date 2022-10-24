import { Avatar } from "antd";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { CameraOutlined } from "@ant-design/icons";

const CreatePostForm = ({ content, setContent, postSubmit, handleImage }) => {
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
          <CameraOutlined onChange={handleImage} className="mt-2" />
          <input hidden type="file" accept="images/*" />
        </label>
      </div>
    </div>
  );
};

export default CreatePostForm;
