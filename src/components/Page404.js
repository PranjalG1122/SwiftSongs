import React from "react";
import { Helmet } from "react-helmet";

export default function Page404() {
  return (
    <div>
      <Helmet>
        <title>404</title>
      </Helmet>
      <div className="flex flex-col justify-center items-cen">
        <p>404</p>
      </div>
    </div>
  );
}
