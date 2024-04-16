// NextPage.js
// import React from "react";
import React, { useState, useEffect } from "react";
function NextPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // api to get user data
    const api = "https://jsonplaceholder.typicode.com/users";

    // fetch funtion to get data , [] dependancy array 
    fetch(api)
      .then((Response) => Response.json())
      .then((Response) => setUsers(Response))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  console.log(users);

  return (
    <div>
      <div className="users">
        <h2 className="title">Users</h2>
        <ul>
          {users.map((user, index) => (
            <li key={index} className="user">
              <strong>Id : </strong> {user.id} <br/>
              <strong> Name : </strong>
              {user.name} <br />
              <strong>Email : </strong>
              {user.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default NextPage;
