interface Props {
  post: {
    userId: number;
    id: number;
    title: string;
    body: string;
  };
}

export const getStaticProps = async () => {
  const response = await fetch("http://jsonplaceholder.typicode.com/posts/5");
  const data = await response.json();
  return {
    props: {
      post: data || null,
    },
  };
};

export default function Post({ post }: Props) {
  return (
    <div>
      <h1 className="mb-1 text-xl font-semibold capitalize">{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
}
