import axios from "axios";
import { useContext } from "react";
import ParallaxBG from "../components/cards/ParallaxBG";
import Post from "../components/cards/Post";
import { UserContext } from "../context";

const Home = ({ posts }) => {
  const [state, setState] = useContext(UserContext);

  return (
    <>
      <ParallaxBG url="/images/default.jpg" />

      <div className="container">
        <div className="row pt-5">
          {posts.map((post) => (
            <div className="col-md-4">
              <Post key={post._id} post={post} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { data } = await axios.get("/posts");
  return {
    props: {
      posts: data,
    },
  };
}

export default Home;
