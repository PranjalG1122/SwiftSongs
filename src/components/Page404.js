import React from "react";
import { Helmet } from "react-helmet";

export default function Page404() {
  return (
    <div>
      <Helmet>
        <title>404</title>
      </Helmet>
      <div className="flex flex-col justify-center items-center h-screen px-4">
        <p className="text-6xl">404</p>
        <p className="text-base tablet:text-xl my-4 text-gray-600">
          How'd you get here?
        </p>
        <a
          href="/"
          className="text-xl bg-emerald-700 px-4 py-1 rounded transition-all hover:bg-emerald-500"
        >
          Home
        </a>
      </div>
    </div>
  );
}
