import _ from "lodash";
import React from "react";
// import { _renderMatches } from "react-router/dist/lib/hooks";

const Pagination = ({ users, changePageNumber, pageNumber, pageSize }) => {
  const pageCount = Math.ceil(users.length / pageSize);
  if (pageCount === 1) return (<></>);


  const pages = _.range(0, pageCount);

  
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map((page,index) => {
          return (
            <li key={index}
              className={page === pageNumber ? "page-item active" : "page-item"}
              onClick={() => changePageNumber(page)}
            >
              <a className="page-link">{page + 1}</a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
