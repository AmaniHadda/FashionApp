
import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <i id="err-icon" className="fa fa-exclamation-circle"></i>
      <h1>404 Not Found!</h1>
      <p>The file or directory you are looking for isn't here!</p>
      <Link to="/profile">Refresh page</Link>
    </div>
  );
}

export default NotFound;
