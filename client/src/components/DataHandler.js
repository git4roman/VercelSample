import React, { useState } from "react";
import axiosInstance from "../axiosInstance";

const DataHandler = () => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");

  const fetchData = () => {
    axiosInstance
      .get("/data")
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          setData(response.data);
        } else {
          setMessage("Invalid data format");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setMessage("Error fetching data");
      });
  };

  const postData = () => {
    axiosInstance
      .post("/data", { id: data.length + 1, name: "New User" })
      .then((response) => {
        setMessage(`Data sent successfully: ${JSON.stringify(response.data)}`);
        fetchData(); // Optionally re-fetch data after posting
      })
      .catch((error) => {
        console.error("Error sending data:", error);
        setMessage("Error sending data");
      });
  };

  return (
    <div>
      <h1>Data Handler</h1>
      <button onClick={fetchData}>Fetch Data</button>
      <button onClick={postData}>Post Data</button>
      <p>{message}</p>
      <ul>
        {data && data.length > 0 ? (
          data
            .filter((item) => item != null)
            .map((item) => <li key={item.id}>{item.name}</li>)
        ) : (
          <li>No data available</li>
        )}
      </ul>
    </div>
  );
};

export default DataHandler;
