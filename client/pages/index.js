import axios from "axios";
import { useContext, useState, useEffect } from "react";
import ParallaxBG from "../components/cards/ParallaxBG";
import { UserContext } from "../context";
import Head from "next/head";
import Link from "next/link";
import PostPublic from "../components/cards/PostPublic";
import io from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKETIO, {
  reconnection: true,
});

const Home = ({ posts }) => {
  const [state, setState] = useContext(UserContext);

  const [newsFeed, setNewsFeed] = useState([]);

  useEffect(() => {
    socket.on("new-post", (newPost) => {
      setNewsFeed([newPost, ...posts]);
    });
  }, []);

  const head = () => (
    <Head>
      <title>Mern Social Network for devs</title>
      <meta name="description" content="A social network for developers" />
      <meta
        property="og:description"
        content="A social network for developers"
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="MERN" />
      {/* <meta property="og:image:secure_url" content="http://mern.com/images/default.jpg" /> */}
      {/* <meta property="og:url" content='http://socialmediaapp.com'/ >  */}
    </Head>
  );

  const collection = newsFeed.length > 0 ? newsFeed : posts;

  return (
    <>
      {head()}
      <ParallaxBG url="/images/default.jpg" />

      <div className="container">
        <div className="row pt-5">
          {collection.map((post) => (
            <div key={post._id} className="col-md-4">
              <Link href={`/post/view/${post._id}`}>
                <a>
                  <PostPublic key={post._id} post={post} />
                </a>
              </Link>
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
