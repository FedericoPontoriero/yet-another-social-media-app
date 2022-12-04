import axios from "axios";
import { useContext } from "react";
import ParallaxBG from "../components/cards/ParallaxBG";
import { UserContext } from "../context";
import Head from "next/head";
import Link from "next/link";
import PostPublic from "../components/cards/PostPublic";

const Home = ({ posts }) => {
  const [state, setState] = useContext(UserContext);

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

  return (
    <>
      {head()}
      <ParallaxBG url="/images/default.jpg" />

      <div className="container">
        <div className="row pt-5">
          {posts.map((post) => (
            <div className="col-md-4">
              <Link href={`/post/${post._id}`}>
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
