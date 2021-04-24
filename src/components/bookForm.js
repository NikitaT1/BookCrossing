import React from "react";

const BookForm = ({ match, history }) => {
  return (
    <div>
      <h1>BookForm</h1>
      <h2>{match.params.id}</h2>
      <button
        className="btn btn-primary"
        onClick={() => history.push("/books")}
      >
        Save
      </button>
    </div>
  );
};

export default BookForm;
