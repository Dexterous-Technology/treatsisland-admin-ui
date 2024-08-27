import React, { useState, useEffect } from "react";
import PaginationIndexViewer from "../../../../core/table-elements/pagination-index-viewer/pagination-index-viewer";
import { useSelector } from "react-redux";
import EventUtils from "../../utils/event-utils";

const EventsViewerPagination = () => {
  const { eventsPagination } = useSelector((state) => state.adminStore);
  return (
    <>
      <PaginationIndexViewer
        currentPageNumber={eventsPagination.currentPage}
        pageSize={eventsPagination.pageSize}
        totalCount={eventsPagination.totalEvents}
        onPageChange={(pageNumber) => {
          console.log("pageNumber :>> ", pageNumber);
          EventUtils.onNewPageSelected(pageNumber)
        }}
      />
    </>
  );
};

export default EventsViewerPagination;
