import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className=" flex h-5/6 items-center justify-center bg-white">
      <div className="text-center">
        <img src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?semt=ais_hybrid&w=740" className="w-full h-[500px]" alt="" />
        {/* <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p> */}
        <a href="/" className="text-white bg-red-500 p-2 rounded-md   hover:text-gray-700 hover:bg-white transition-colors duration-300">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;