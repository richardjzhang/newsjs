import Link from "next/link";
import Image from "next/legacy/image";
import dayjs from "dayjs";

export type PostType = {
  _id: string;
  title: string;
  description?: string;
  image: string;
  createdAt: string;
};

export default function Post({
  _id: id,
  title,
  description,
  image,
  createdAt,
}: PostType) {
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
        {description && (
          <p className="hidden lg:visible lg:line-clamp-5 lg:text-lg">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
}
