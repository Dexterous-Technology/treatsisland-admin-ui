import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./pagination-index-viewer.scss";

const PaginationIndexViewer = ({
  currentPageNumber,
  pageSize,
  totalCount,
  onPageChange,
}) => {
  // State to manage the current offset
  const [itemOffset, setItemOffset] = useState(0);

  // Calculate the total number of pages
  const pageCount = Math.ceil(totalCount / pageSize);

  // Adjust itemOffset when currentPageNumber changes
  useEffect(() => {
    const newOffset = (currentPageNumber - 1) * pageSize;
    setItemOffset(newOffset);
  }, [currentPageNumber, pageSize]);

  // Handle page change event
  const handlePageClick = (event) => {
    const newPageNumber = event.selected + 1;
    const newOffset = (newPageNumber - 1) * pageSize;
    setItemOffset(newOffset);
    onPageChange(newPageNumber);
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="< previous"
      renderOnZeroPageCount={null}
      containerClassName={"pagination"}
      pageClassName={"page-item"}
      activeClassName={"active"}
      previousClassName={"page-item"}
      nextClassName={"page-item"}
      breakClassName={"page-item"}
    />
  );
};

export default PaginationIndexViewer;
