import React from "react";
import _ from "lodash";

const Pagination = (props) => {
  const pagesCount = Math.ceil(props.itemsCount / props.pageSize);
  if (pagesCount === 1) return null;

  const pages = _.range(1, pagesCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((p) => (
          <li
            key={p}
            className={
              p === props.currentPageNumber ? "page-item active" : "page-item"
            }
            style={{ cursor: "pointer" }}
          >
            <a className="page-link" onClick={() => props.onPageChange(p)}>
              {p}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
