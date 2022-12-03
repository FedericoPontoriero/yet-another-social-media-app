import axios from "axios";
import { useContext } from "react";
import ParallaxBG from "../components/cards/ParallaxBG";
import Post from "../components/cards/Post";
import { UserContext } from "../context";
import Head from "next/head";

const Home = ({ posts }) => {
  const [state, setState] = useContext(UserContext);

  const head = () => (
    <Head>
      <title>Mern Social Network for devs</title>
      <meta name="description" content="A social network for developers" />
    </Head>
  );

  return (
    <>
      {head()}
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

export async function getServerSideProps() {
  const { data } = await axios.get("/posts");
  return {
    props: {
      posts: data,
    },
  };
}

export default Home;
