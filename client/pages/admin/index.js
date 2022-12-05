import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import renderHTML from "react-render-html";

import AdminRoute from "../../components/routes/AdminRoute";

const Admin = () => {
  const [state, setState] = useContext(UserContext);

  const [posts, setPosts] = useState([]);

  const router = useRouter();

  useEffect(() => {
    if (state && state.token) {
      newsFeed();
    }
  }, [state && state.token]);

  const newsFeed = async () => {
    try {
      const { data } = await axios.get(`/posts`);
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (post) => {
    try {
      const answer = window.confirm("Are you sure?");
      if (!answer) return;
      const { data } = await axios.delete(`/admin/delete-post/${post._id}`);
      toast.error("Post deleted");
      newsFeed();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AdminRoute>
      <div className="container-fluid">
        <div className="row py-5 bg-default-image text-light">
          <div className="col text-center">
            <h1>Admin</h1>
          </div>
        </div>
        <div className="row py-4">
          <div className="col-md-8 offset-md-2">
            {posts &&
              posts.map((p) => (
                <div className="d-flex justify-content-between" key={p._id}>
                  <div>{renderHTML(p.content)}</div>
                  <div className="text-danger" onClick={() => handleDelete(p)}>
                    Delete
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </AdminRoute>
  );
};

export default Admin;
