import React from "react";

const Table = (props) => {
//   console.log("props: ", props);
  const users =props.data;
  const deleteUser = props.deleteUser;
  const updateUser = props.updateUser;
//   console.log('users: ', users);
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">age</th>
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        {users.map((item) => {
          return (
            <tr>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.age}</td>
              <td>
                  <button onClick={()=> updateUser(item)}>Edit</button>
              </td>
              <td>
                  <button onClick={()=> deleteUser(item._id)}>Delete</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;