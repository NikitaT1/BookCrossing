import * as genresAPI from "./fakeGenreService";

const movies = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    title: "Book 1",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Drama" },
    numberInStock: 6,
    dailyRentalRate: 2.5,
    publishDate: "2018-01-03T19:04:28.809Z",
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    title: "Book 2",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Drama" },
    numberInStock: 5,
    dailyRentalRate: 2.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    title: "Book 3",
    genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Fiction" },
    numberInStock: 8,
    dailyRentalRate: 3.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    title: "Book 4",
    genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Poetry" },
    numberInStock: 7,
    dailyRentalRate: 3.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181a",
    title: "Book 5",
    genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Poetry" },
    numberInStock: 7,
    dailyRentalRate: 3.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181b",
    title: "Book 6",
    genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Poetry" },
    numberInStock: 7,
    dailyRentalRate: 3.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181e",
    title: "Book 7",
    genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Fiction" },
    numberInStock: 7,
    dailyRentalRate: 4.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181f",
    title: "Book 8",
    genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Fiction" },
    numberInStock: 4,
    dailyRentalRate: 3.5,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471821",
    title: "Book 9",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Drama" },
    numberInStock: 7,
    dailyRentalRate: 3.5,
  },
];

export function getBooks() {
  return movies;
}

export function getMovie(id) {
  return movies.find((m) => m._id === id);
}

export function saveMovie(movie) {
  let movieInDb = movies.find((m) => m._id === movie._id) || {};
  movieInDb.name = movie.name;
  movieInDb.genre = genresAPI.genres.find((g) => g._id === movie.genreId);
  movieInDb.numberInStock = movie.numberInStock;
  movieInDb.dailyRentalRate = movie.dailyRentalRate;

  if (!movieInDb._id) {
    movieInDb._id = Date.now();
    movies.push(movieInDb);
  }

  return movieInDb;
}

// export function deleteBook(id) {
//   let movieInDb = movies.find((m) => m._id === id);
//   movies.splice(movies.indexOf(movieInDb), 1);
//   return movieInDb;
// }

export function deleteBook(id) {
  let booksDel = movies.filter((f) => f._id !== id);
  movies = booksDel;
  return movies;
}
