import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import React from "react";

function BackButton({ url }) {
  return (
    <Link to={url} className="btn btn-reverse btn-back">
      <FaArrowCircleLeft /> Tillbaka
    </Link>
  );
}

export default BackButton;
