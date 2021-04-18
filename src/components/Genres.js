import React from "react";

function Genres({ genres, onGenreSelect, currentGenre }) {
  return (
    <div>
      <ul className="list-group">
        {genres.map((g) => (
          <li
            className={
              g._id === currentGenre._id
                ? "list-group-item active"
                : "list-group-item"
            }
            style={{ cursor: "pointer" }}
            key={g.name}
            onClick={() => onGenreSelect(g)}
          >
            {g.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Genres;
