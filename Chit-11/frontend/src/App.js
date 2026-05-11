import React, { useEffect, useState } from 'react';

import './App.css';

function App() {

  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  const [users, setUsers] = useState([]);

  // Fetch Users

  const fetchUsers = async () => {

    const res = await fetch('http://localhost:5000/users');

    const data = await res.json();

    setUsers(data);

  };

  useEffect(() => {

    fetchUsers();

  }, []);

  // Add User

  const addUser = async () => {

    await fetch('http://localhost:5000/add', {

      method: 'POST',

      headers: {

        'Content-Type': 'application/json'

      },

      body: JSON.stringify({

        name,

        email

      })

    });

    fetchUsers();

    setName('');

    setEmail('');
  };

  // Delete User

  const deleteUser = async (id) => {

    await fetch(`http://localhost:5000/delete/${id}`, {

      method: 'DELETE'

    });

    fetchUsers();
  };

  return (

    <div className="container">

      <h1>User Management System</h1>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={addUser}>

        Add User

      </button>

      <h2>User List</h2>

      <table>

        <thead>

          <tr>

            <th>Name</th>

            <th>Email</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {users.map((user) => (

            <tr key={user._id}>

              <td>{user.name}</td>

              <td>{user.email}</td>

              <td>

                <button
                  onClick={() => deleteUser(user._id)}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}

export default App;