import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";

import Link from "next/link";

const Navbar = async () => {
  const { userId } = auth();
  await currentUser();
  
  return (
    <nav className="bg-blue-100 backdrop-blur-md w-full fixed top-0 z-50 px-5 py-2">
      <div className="flex justify-between">
        <div className="flex justify-center items-center">
          {/* logo */}
          <div className="flex space-x-7">
            <Link href="/" className="flex items-center py-4 px-2">
              <svg
                className="h-8 w-8 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="#4F46E5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="#FF6600"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-bold text-gray-90000 text-2xl">
                SkillEngine AI
              </span>
            </Link>
          </div>
        </div>

        {/* secondary nav */}
        <div className="flex items-center space-x-4">
          {!userId ? (
            <>
              <Link
                href="/sign-in"
                className="py-2 px-4 text-black font-sans bg-gray-100 rounded-xl hover:bg-gray-300  shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Log in
              </Link>

              {/* Signup Button */}
              <Link
                href="/sign-up"
                className="py-2 px-6 text-white bg-black hover:bg-blue-600 rounded-xl shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              {/* dashboard button in the center */}
              <div className="flex items-center space-x-3">
                <Link
                  href="/dashboard"
                  className="relative py-2 px-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center gap-3"
                >
                  Dashboard
                  <svg
                    className="h-6 w-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h18M3 9h18M9 15h6M4 21h16"
                    />
                  </svg>
                </Link>
              </div>
              <li className="flex items-center">
                <UserButton />
              </li>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
