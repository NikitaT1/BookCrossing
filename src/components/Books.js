import React, { useEffect, useState } from "react";
import { loadBooks, bookDelete } from "../store/booksReducer";
import { loadGenres } from "../store/genresReducer";
import { useDispatch, useSelector } from "react-redux";
import Likes from "./common/Likes";
import { likeUpdate } from "./../store/booksReducer";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import Genres from "./Genres";

function Books() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.list);
  const genres = [
    { name: "All genres" },
    ...useSelector((state) => state.genres.list),
  ];

  useEffect(() => {
    dispatch(loadBooks());
    dispatch(loadGenres());
  }, []);

  const pageSizeNumber = 4;
  const [currentPageNumber, currentPageChange] = useState(1);
  const [currentGenre, currentGenreSelect] = useState(genres[0]);

  const handlePageChange = (page) => {
    currentPageChange(page);
  };

  const handeGenreSelect = (genre) => {
    currentGenreSelect(genre);
    currentPageChange(1);
  };

  if (books.length === 0) return <p>There are no books in database</p>;

  const filteredBooks =
    currentGenre && currentGenre._id
      ? books.filter((b) => b.genre._id === currentGenre._id)
      : books;

  const booksInOnePage = paginate(
    filteredBooks,
    currentPageNumber,
    pageSizeNumber
  );

  return (
    <div className="row">
      <div className="col-3">
        <Genres
          genres={genres}
          onGenreSelect={handeGenreSelect}
          currentGenre={currentGenre}
        />
      </div>

      <div className="col">
        <p>
          There are {filteredBooks.length} of {currentGenre.name.toLowerCase()}{" "}
          books in database
        </p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {booksInOnePage.map((m) => (
              <tr key={m._id}>
                <td>{m.title}</td>
                <td>{m.genre.name}</td>
                <td>{m.numberInStock}</td>
                <td>{m.dailyRentalRate}</td>
                <td>
                  <Likes
                    like={m.like}
                    likeButton={(likeNewStatus) =>
                      dispatch(likeUpdate(m._id, likeNewStatus))
                    }
                  />
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    style={{ cursor: "pointer" }}
                    onClick={() => dispatch(bookDelete(m._id))}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <footer>
          <Pagination
            itemsCount={filteredBooks.length}
            pageSize={pageSizeNumber}
            onPageChange={handlePageChange}
            currentPageNumber={currentPageNumber}
          />
        </footer>
      </div>
    </div>
  );
}

export default Books;
