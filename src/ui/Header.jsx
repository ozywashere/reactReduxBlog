import { Link } from "react-router-dom";

export const Header = () => {
  return ( <header className="py-4 bg-gray-500 px-2">
    <nav>
      <div className="max-w-screen-2xl mx-auto flex justify-between">
          <Link to="/" className="text-white text-xl font-bold">
            <span className="ml-2">Redux  </span>
          </Link>
          <ul className="flex items-center">
            <li className="ml-6">
              <Link to="/posts" className="text-white text-sm font-medium">
                Posts
              </Link>
            </li>
            <li className="ml-6">
              <Link to="/posts/create" className="text-white text-sm font-medium">
                Create Post
              </Link>
            </li>
          </ul>
      </div>
    </nav>
  </header> )
}