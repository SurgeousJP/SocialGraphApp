import { IPost } from "../apis/api";

interface PostProps {
  post: IPost;
  author: string;
  authorImage: string;
  timeAgo: Date;
  postImage: string;
  comments: number;
}

const Post = ({
  post: { description, likes },
  author,
  authorImage,
  postImage,
}: PostProps) => {
  return (
    <section id="content" className="mx-60 overflow-y-auto flex-1 mt-4 px-12">
      {/* Post Input Section */}
      <div className="flex flex-row flex-1 bg-white px-4 py-3 space-x-4 items-center rounded-lg mb-4 shadow-sm">
        <img
          src={authorImage}
          alt="Author Avatar"
          className="w-[40px] h-[40px] rounded-full"
        />
        <input
          className="focus:outline-none bg-gray-200 flex-1 rounded-3xl p-3 text-md text-gray-700"
          placeholder="What are you thinking today?"
        />
      </div>

      {/* Post Content */}
      <div className="flex flex-col">
        <div className="flex flex-col bg-white p-3 space-y-3 rounded-t-lg shadow-sm">
          {/* Post Header */}
          <div className="flex flex-row items-center space-x-2">
            <img
              src={authorImage}
              alt="Author Avatar"
              className="w-[40px] h-[40px] rounded-full"
            />
            <span className="text-md font-bold">{author.toUpperCase()}</span>
          </div>
          {/* Post Description */}
          <span className="text-md block text-gray-700">
            {description.toUpperCase()}
          </span>
        </div>

        {/* Post Image */}
        {postImage && (
          <img
            src={postImage}
            alt="Post Visual"
            className="w-full rounded-lg shadow-md"
          />
        )}

        {/* Post Actions */}
        <div className="flex flex-row justify-between rounded-b-lg py-2 bg-white shadow-sm px-3">
          {/* Likes */}
          <div className="flex flex-row items-center space-x-1">
            <img
              className="w-[18px] h-[18px] rounded-full"
              src="https://images.vexels.com/content/223246/preview/like-icon-flat-8f6a3f.png"
              alt="Like Icon"
            />
            <span className="text-blue-500 font-medium">{likes}</span>
          </div>
          {/* Action Buttons */}
          <div className="flex flex-row space-x-1 items-center">
            <ion-icon
              className="text-gray-500"
              name="thumbs-up"
              size="small"
            ></ion-icon>
            <span>Like</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Post;
