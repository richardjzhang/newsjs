import Link from "next/link";
import Image from "next/legacy/image";
import dayjs from "dayjs";
import { fetchAllPosts } from "utils/database";

type Props = {
  posts: Array<Post>;
};

type Post = {
  _id: string;
  title: string;
  description: string;
  image: string;
  createdAt: string;
};

export async function getStaticProps() {
  const data = await fetchAllPosts();
  return {
    props: {
      posts: data,
    },
    revalidate: 60,
  };
}

function Post({ _id: id, title, image, createdAt }: Post) {
  return (
    <Link
      href={`/post/${id}`}
      className="w-full max-w-sm mx-auto group hover:no-underline focus:no-underline rounded bg-white shadow-slate-500"
    >
      <div className="relative h-80 w-full">
        <Image
          alt={title}
          src={image}
          className="absolute top-0 left-0"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-6 space-y-2">
        <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
          {title}
        </h3>
        <span className="text-xs dark:text-gray-400">
          {dayjs(createdAt).format("MMMM DD YYYY")}
        </span>
      </div>
    </Link>
  );
}

const Home = (props: Props) => {
  const { posts } = props;
  const [firstPost, ...remainingPosts] = posts;

  return (
    <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
      <Link
        rel="noopener noreferrer"
        href={`/post/${firstPost._id}`}
        className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 rounded bg-white shadow-slate-500"
      >
        <div className="relative h-80 w-full lg:col-span-5">
          <Image
            alt={firstPost.title}
            src={firstPost.image}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="p-6 space-y-2 lg:col-span-7">
          <h3 className="text-2xl font-semibold sm:text-4xl group-hover:underline group-focus:underline">
            {firstPost.title}
          </h3>
          <span className="text-xs dark:text-gray-400">
            {dayjs(firstPost.createdAt).format("MMMM DD YYYY")}
          </span>
          <p className="hidden lg:visible lg:line-clamp-7 lg:text-lg">
            {firstPost.description}
          </p>
        </div>
      </Link>
      <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {remainingPosts.map((post) => (
          <Post
            key={post._id}
            _id={post._id}
            title={post.title}
            description={post.description}
            image={post.image}
            createdAt={post.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
