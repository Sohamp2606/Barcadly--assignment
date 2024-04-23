
// import React from "react";
import React, { useState, useEffect } from "react";
function NextPage() {

  // states
  const [users, setUsers] = useState([]);

  const [searchId, setSearchId] = useState("");

  const [filteredUser, setFilteredUser] = useState([]);

  useEffect(() => {
    // api to get user data
    const api = "https://jsonplaceholder.typicode.com/users";

    // fetch funtion to get data , [] dependancy array
    fetch(api)
      .then((Response) => Response.json())
      .then((Response) => setUsers(Response))
      .catch((error) => console.error("Error fetching users:"));
  }, []);

  // here i handle submit and filter the data by using id
  const handleSubmit = () => {
    const filtered = users.filter((user) => user.id.toString() === searchId);

    // point:  if user found then update 
    setFilteredUser(filtered);
  };

  return (
    <div>
      <div className="users">
        <h2 className="title">Users</h2>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button onClick={handleSubmit} className="button">
            Search
          </button>
        </div>

        <ul>
        
          {filteredUser.length > 0 ? (
            filteredUser.map((user, index) => (
              <li key={index} className="user">
                <strong>Id : </strong> <span> {user.id} </span>
                <br />
                <strong> Name : </strong>
                <span> {user.name} </span> <br />
                <strong>Email : </strong>
                <span> {user.email}</span>
              </li>
            ))
          ) : (
            <p className="not-found"> User not found </p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default NextPage;
