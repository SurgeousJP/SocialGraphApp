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
  timeAgo,
  postImage,
  comments,
}: PostProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6 max-w-2xl mx-auto">
      {/* Post Header */}
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={authorImage}
          alt="Avatar"
          className="w-12 h-12 rounded-full border-2 border-white"
        />
        <div>
          <p className="font-semibold text-gray-800">{author}</p>
          <p className="text-sm text-gray-500">
            {timeAgo.toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Post Content */}
      <p className="text-gray-700 text-lg mb-4">{description}</p>

      {/* Post Images (Optional) */}
      <div className="relative mb-4">
        <img
          src={postImage}
          alt="Post Image"
          className="w-full rounded-lg shadow-md"
        />
      </div>

      {/* Post Actions */}
      <div className="flex space-x-6 text-gray-600">
        <button className="flex items-center space-x-2 hover:text-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h-2v-4H7v-2h4V8h2v4h4v2h-4v4z" />
          </svg>
          <span>Like</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h-2v-4H7v-2h4V8h2v4h4v2h-4v4z" />
          </svg>
          <span>Comment</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h-2v-4H7v-2h4V8h2v4h4v2h-4v4z" />
          </svg>
          <span>Share</span>
        </button>
      </div>

      {/* Post Footer (Optional) */}
      <div className="mt-4 text-sm text-gray-500">
        <p>
          {likes} likes | {comments} comments
        </p>
      </div>
    </div>
  );
};

export default Post;
