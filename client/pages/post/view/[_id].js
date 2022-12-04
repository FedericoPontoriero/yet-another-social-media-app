import axios from "axios";
import ParallaxBG from "../../../components/cards/ParallaxBG";
import Head from "next/head";
import PostPublic from "../../../components/cards/PostPublic";

const SinglePost = ({ post }) => {
  const head = () => (
    <Head>
      <title>Mern Social Network for devs</title>
      <meta name="description" content={post.content} />
      <meta
        property="og:description"
        content="A social network for developers"
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="MERN" />
      {/* <meta property="og:image:secure_url" content={imageSource(post)}/> */}
      {/* <meta property="og:url" content=`http://socialmediaapp.com/post/view/${post._id}`/ >  */}
    </Head>
  );

  // const imageSource = (post) => {
  //   if (post.image) {
  //     return post.image.url;
  //   } else {
  //     return "/images/default.jpg";
  //   }
  // };

  return (
    <>
      {head()}
      <ParallaxBG url="/images/default.jpg" />

      <div className="container">
        <div className="row pt-5">
          <div className="col-md-8 offset-md-2">
            <PostPublic key={post._id} post={post} />
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const { data } = await axios.get(`/post/${ctx.params._id}`);
  return {
    props: {
      post: data,
    },
  };
}

export default SinglePost;
