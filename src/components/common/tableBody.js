import React from "react";
import _ from "lodash";
//   function _.get from lodash helps to get value from an object.
//   In "data" there are complex objects of books for rendering at current page,
//   which is difficult to get for map, well at least difficult for me :))
//   But prop "column" consists of array of objects with values in path
//   similar to names in "data", so with "column's" values it is possible to get
//   nested values of data using "_.get". The last two objects in columns array
//   are different from others, they have another values, so I designed function
//   "renderCell" to choose what data to map according to incoming value from "columns" array.

const TableBody = ({ data, columns }) => {
  let renderCell = (data, column) => {
    if (column.content) return column.content(data);
    return _.get(data, column.path);
  };

  return (
    <tbody>
      {data.map((data) => (
        <tr key={data._id}>
          {columns.map((column) => (
            <td key={column.path || column.key}>{renderCell(data, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
