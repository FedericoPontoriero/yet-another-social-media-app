import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";

import UserRoute from "../../components/routes/UserRoute";
import PostForm from "../../components/forms/PostForm";
import PostList from "../../components/cards/PostList";
import People from "../../components/People";

const Home = () => {
  const [state, setState] = useContext(UserContext);

  const [content, setContent] = useState("");
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [people, setPeople] = useState([]);

  const router = useRouter();

  useEffect(() => {
    if (state && state.token) {
      fetchUserPosts();
      findPeople();
    }
  }, [state && state.token]);

  const fetchUserPosts = async () => {
    try {
      const { data } = await axios.get("/user-posts");
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const findPeople = async () => {
    try {
      const { data } = await axios.get("/find-people");
      setPeople(data);
    } catch (err) {
      console.log(err);
    }
  };
  const postSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/create-post", { content, image });
      if (data.error) {
        toast.error(data.error);
      } else {
        fetchUserPosts();
        toast.success("Post created");
        setContent("");
        setImage({});
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const { data } = await axios.post("/upload-image", formData);
      setImage({
        url: data.url,
        public_id: data.public_id,
      });
      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  const handleDelete = async (post) => {
    try {
      const answer = window.confirm("Are you sure?");
      if (!answer) return;
      const { data } = await axios.delete(`/delete-post/${post._id}`);
      toast.error("Post deleted");
      fetchUserPosts();
    } catch (err) {
      console.log(err);
    }
  };

  const handleFollow = async (user) => {
    try {
      const { data } = await axios.put("/user-follow", { _id: user._id });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UserRoute>
      <div className="container-fluid">
        <div className="row py-5 bg-default-image text-light">
          <div className="col text-center">
            <h1>Newsfeed</h1>
          </div>
        </div>
        <div className="row py-3">
          <div className="col-md-8">
            <PostForm
              uploading={uploading}
              image={image}
              handleImage={handleImage}
              content={content}
              setContent={setContent}
              postSubmit={postSubmit}
            />
            <br />
            <PostList handleDelete={handleDelete} posts={posts} />
          </div>
          <div className="col-md-4">
            <People handleFollow={handleFollow} people={people} />
          </div>
        </div>
      </div>
    </UserRoute>
  );
};

export default Home;
