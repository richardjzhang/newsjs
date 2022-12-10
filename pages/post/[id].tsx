import { fetchAllPosts, fetchPost } from "utils/database";

type PostType = {
  _id: string;
  title: string;
  description: string;
  image: string;
  createdAt: string;
};

interface Params {
  params: {
    id: string;
  };
}

export const getStaticPaths = async () => {
  const posts = await fetchAllPosts();
  return {
    paths: posts.map((post: PostType) => ({
      params: { id: post._id },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }: Params) => {
  const { id } = params;
  const data = await fetchPost(id);
  return {
    props: {
      post: data,
    },
  };
};

export default function Post(props: { post: PostType }) {
  return <div>{JSON.stringify(props.post)}</div>;
}
