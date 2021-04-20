import React, { Component } from "react";
import Likes from "./common/likes";
import TableBody from "./common/tableBody";
import TableHeader from "./common/tableHeader";

const BooksTable = ({
  booksInOnePage,
  bookDeleteButtom,
  likeUpdateButtom,
  onSort,
  sortColumn,
}) => {
  const columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (books) => (
        <Likes
          like={books.like}
          likeButton={(likeNewStatus) =>
            likeUpdateButtom(books._id, likeNewStatus)
          }
        />
      ),
    },
    {
      key: "delete",
      content: (books) => (
        <button
          className="btn btn-danger btn-sm"
          style={{ cursor: "pointer" }}
          onClick={() => bookDeleteButtom(books._id)}
        >
          Delete
        </button>
      ),
    },
  ];
  return (
    <table className="table">
      <TableHeader onSort={onSort} columns={columns} sortColumn={sortColumn} />
      <TableBody data={booksInOnePage} columns={columns} />

      {/* <tbody>
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
                  likeUpdateButtom(m._id, likeNewStatus)
                }
              />
            </td>
            <td>
              <button
                className="btn btn-danger btn-sm"
                style={{ cursor: "pointer" }}
                onClick={() => bookDeleteButtom(m._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody> */}
    </table>
  );
};

export default BooksTable;
