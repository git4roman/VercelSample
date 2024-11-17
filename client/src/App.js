import { useEffect, useState } from "react";
import axios from "./utils/axios.js"; // Import custom Axios instance

function App() {
  const [users, setUsers] = useState([]); // State to store users
  const [newUser, setNewUser] = useState(""); // State to manage new user input

  // Fetch existing users from the API
  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/v1/users`);
      const data = response.data;
      console.log("Here's your console", data);
      setUsers(data); // Update state with fetched users
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to handle input change
  const handleInputChange = (event) => {
    setNewUser(event.target.value);
  };

  // Function to handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Example: Sending a POST request to add a new user
      const response = await axios.post(`/api/v1/users`, { name: newUser });
      const addedUser = response.data;
      setUsers([...users, addedUser]); // Add the new user to the existing user list
      setNewUser(""); // Clear the input field after submission
    } catch (error) {
      console.error("Error adding new user:", error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>App</h1>

      {/* Form to add a new user */}
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Enter new user name"
          value={newUser}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add User</button>
      </form>

      {/* List of users */}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
