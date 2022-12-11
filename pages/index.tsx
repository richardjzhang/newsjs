import Link from "next/link";
import Image from "next/legacy/image";
import dayjs from "dayjs";
import { fetchAllPosts } from "utils/database";
import Post, { type PostType } from "components/Post";

type Props = {
  posts: Array<PostType>;
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

const Home = (props: Props) => {
  const { posts } = props;

  if (posts.length === 0) {
    return (
      <div className="h-full flex flex-col justify-center items-center">
        <div className="text-center space-y-4 max-w-sm">
          <h1 className="text-5xl font-semibold">No posts found</h1>
          <p className="text-lg">
            Sorry, it looks like no one has posted yet! Be the first to create a
            post for NewsJs!
          </p>
          <div>
            <Link href="/post/create">
              <button className="w-full px-4 py-3 rounded bg-indigo-600 text-xl text-white font-semibold">
                Create a Post
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
            priority
          />
        </div>
        <div className="p-6 space-y-2 lg:col-span-7">
          <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
            {firstPost.title}
          </h3>
          <span className="text-xs dark:text-gray-400">
            {dayjs(firstPost.createdAt).format("MMMM DD YYYY")}
          </span>
          <p className="hidden lg:visible lg:line-clamp-5 lg:text-lg">
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
            image={post.image}
            createdAt={post.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
