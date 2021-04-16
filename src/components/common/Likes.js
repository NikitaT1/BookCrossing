import React, { useState, useEffect } from "react";

function Likes(props) {
  const heart = props.like ? "fa fa-heart" : "fa fa-heart-o";
  const likeNewStatus = !props.like;
  console.log(likeNewStatus);

  return (
    <i
      className={heart}
      aria-hidden="true"
      style={{ cursor: "pointer" }}
      onClick={() => props.likeButton(likeNewStatus)}
    />
  );
}

export default Likes;
