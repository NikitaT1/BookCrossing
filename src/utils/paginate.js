import _ from "lodash";

export function paginate(items, currentPageNumber, pageSizeNumber) {
  const startIndex = (currentPageNumber - 1) * pageSizeNumber;
  return _(items).slice(startIndex).take(pageSizeNumber).value();
}
