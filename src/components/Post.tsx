import Image from "next/image";

export const Post = () => {
  return (
    <div className="bg-gray-300/50 shadow-md shadow-gray-200/60 p-5">
      {/* Post Image */}
      <div className="mb-5 flex items-center justify-center">
        <Image
          width={0}
          height={0}
          src="/logo/logo.svg"
          alt="post image"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Post Content */}
      <div className="flex flex-col gap-4">
        {/* Post Title */}
        <h3 className="font-roboto text-xl font-semibold">
          How to build a blog with Next.js and Appwrite
        </h3>

        {/* Post Description */}
        <p className="text-gray-400 font-nunito">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed molestie,
          nisl vel ultricies mattis, orci neque aliquet nisi, ac tincidunt nisi
          nisl eu nisl. Sed euismod, nisl vel ultricies mattis, orci neque
          aliquet nisi, ac tincidunt nisi nisl eu nisl. Sed euismod, nisl vel
          ultricies mattis, orci neque aliquet nisi, ac tincidunt nisi nisl eu
          nisl. Sed euismod, nisl vel ultricies mattis, orci neque aliquet nisi,
          ac tincidunt nisi nisl eu nisl. Sed euismod, nisl vel ultricies
          mattis, orci neque aliquet nisi, ac tincidunt nisi nisl eu nisl.
        </p>

        {/* Created At */}
        <p className="text-gray-400 font-nunito">
          Posted on {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};
