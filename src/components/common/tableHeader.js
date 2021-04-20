import React from "react";

const TableHeader = ({ columns, onSort, ...props }) => {
  //   let sortColumn = { ...props.sortColumn };
  //   if (sortColumn.path === props.path)
  //     sortColumn.order === "asc"
  //       ? setSortColumn({ ...sortColumn, order: "desc" })
  //       : setSortColumn({ ...sortColumn, order: "asc" });
  //   else {
  //     setSortColumn({ ...sortColumn, path: path });
  //   }

  //<i className="fa fa-sort-asc"></i>;
  //<i className="fa fa-sort-desc"></i>;

  let renderSortIcon = (column) => {
    let sortedColumn = props.sortColumn;
    if (column.path !== sortedColumn.path) return null;
    if (sortedColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };

  return (
    <thead>
      <tr style={{ cursor: "pointer" }}>
        {columns.map((c) => (
          <th key={c.path || c.key} onClick={() => onSort(c.path)}>
            {c.label} {renderSortIcon(c)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
