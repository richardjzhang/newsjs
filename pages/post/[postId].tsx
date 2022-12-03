import { useRouter } from "next/router";

interface StaticProps {
  params: {
    postId: string;
  };
}

interface Props {
  post: {
    userId: number;
    id: number;
    title: string;
    body: string;
  };
}

export const getStaticPaths = () => {
  return {
    paths: [
      {
        params: {
          postId: "5",
        },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps = async ({ params }: StaticProps) => {
  const response = await fetch(
    `http://jsonplaceholder.typicode.com/posts/${params.postId}`
  );
  const data = await response.json();
  return {
    props: {
      post: data || null,
    },
    revalidate: 3,
  };
};

export default function PostDetails({ post }: Props) {
  const router = useRouter();
  const { postId } = router.query;

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <div>{post.body}</div>
    </div>
  );
}
