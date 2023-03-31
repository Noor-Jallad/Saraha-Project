import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import pagination from "./../../utilities/pagination";

const UsersPage = ({ users }) => {
  const navigate = useNavigate();
  const [results, setResults] = useState(users);
  const [pageInfo, setPageInfo] = useState({
    pageNumber: 0,
    pageSize: 12
  });
  const changePageNumber =((page) => {
    setPageInfo({ ...pageInfo, pageNumber: page });
  });
  const searchUser = (event) => {
    const { value } = event.target;
    const arr = [];
    {
      users.map((user) => {
        if (user.userName.toLowerCase().includes(value.toLowerCase())) {
          arr.push(user);
        }
      });
    }
    setPageInfo({ ...pageInfo, pageNumber: 0 });
    setResults(arr);
  };
  return (
    <div className="container my-4">
      <input
        type="search"
        className="form-control"
        placeholder="Input Field"
        aria-label="Input Field"
        onChange={searchUser}
        aria-describedby="basic-addon1"
        
      ></input>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {pagination(results, pageInfo.pageNumber, pageInfo.pageSize).map(
            (user, index) => {
              return (
                <tr key={user._id}>
                  <th scope="row">{1 + index+ pageInfo.pageNumber*pageInfo.pageSize}</th>
                  <td>{user.userName}</td>
                  <td>
                    <button
                      className="px-3 py-1 bg-dark text-white"
                      onClick={() => navigate(`/user/${user._id}`)}
                    >
                      Send Message <i className="fa-solid fa-paper-plane" />
                    </button>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
      <Pagination
        users={results}
        changePageNumber={changePageNumber}
        {...pageInfo}
      />
    </div>
  );
};

export default UsersPage;
