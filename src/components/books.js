import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import ReactLoading from "react-loading";
import { loadBooks, bookDelete } from "../store/booksReducer";
import { loadGenres } from "../store/genresReducer";
import { likeUpdate } from "../store/booksReducer";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import Genres from "./genres";
import BooksTable from "./booksTable";

const Books = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.list);
  const genres = [
    { name: "All genres" },
    ...useSelector((state) => state.genres.list),
  ];
  const fetchingBooks = useSelector((state) => state.books.isFetching);
  const fetchingGenres = useSelector((state) => state.genres.isFetching);

  useEffect(() => {
    dispatch(loadBooks());
    dispatch(loadGenres());
  }, []);

  const pageSizeNumber = 4;
  const [currentPageNumber, currentPageChange] = useState(1);
  const [currentGenre, currentGenreSelect] = useState(genres[0]);
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });

  const handlePageChange = (page) => {
    currentPageChange(page);
  };

  const handeGenreSelect = (genre) => {
    currentGenreSelect(genre);
    currentPageChange(1);
  };

  const likeUpdateButtom = (id, likeNewStatus) => {
    dispatch(likeUpdate(id, likeNewStatus));
  };

  const bookDeleteButtom = (id) => {
    dispatch(bookDelete(id));
  };

  const onSortButtom = (path) => {
    if (sortColumn.path === path)
      sortColumn.order === "asc"
        ? setSortColumn({ ...sortColumn, order: "desc" })
        : setSortColumn({ ...sortColumn, order: "asc" });
    else {
      setSortColumn({ ...sortColumn, path: path });
    }
  };

  const newBookButton = (
    <Link to="/newbook">
      <button className="btn btn-primary">New Book</button>
    </Link>
  );

  if (!fetchingGenres || !fetchingBooks)
    return (
      <ReactLoading
        type={"bars"}
        color={"deepskyblue"}
        height={"20%"}
        width={"20%"}
      />
    );

  if (books.length === 0)
    return (
      <div>
        <p>There are no books in database</p>
        {newBookButton}
      </div>
    );

  const filteredBooks =
    currentGenre && currentGenre._id
      ? books.filter((b) => b.genre._id === currentGenre._id)
      : books;

  const sorted = _.orderBy(
    filteredBooks,
    [sortColumn.path],
    [sortColumn.order]
  );

  const booksInOnePage = paginate(sorted, currentPageNumber, pageSizeNumber);

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
        {newBookButton}
        <p>
          There are {filteredBooks.length} of {currentGenre.name.toLowerCase()}{" "}
          books in database
        </p>
        <BooksTable
          booksInOnePage={booksInOnePage}
          likeUpdateButtom={likeUpdateButtom}
          bookDeleteButtom={bookDeleteButtom}
          onSort={onSortButtom}
          sortColumn={sortColumn}
        />
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
};

export default Books;
