import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const localApiBaseUrl = import.meta.env.VITE_LOCAL_API_BASE_URL;
const prodApiBaseUrl = import.meta.env.VITE_PROD_API_BASE_URL;
const baseUrl = import.meta.env.PROD ? prodApiBaseUrl : localApiBaseUrl;

function App() {
  const [data, setData] = useState({
    aveRooms: "",
    aveBedrms: "",
  });
  const [result, setResult] = useState({
    rSquare: null,
    predicted: null,
  });

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { aveRooms, aveBedrms } = data;
    const response = await axios.post(`${baseUrl}/predict`, {
      aveRooms,
      aveBedrms,
    });
    setResult({
      ...result,
      rSquare: response.data.r_square,
      predicted: response.data.y_pred,
    });
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          Average Rooms:
          <input
            type="number"
            name="aveRooms"
            value={data.aveRooms}
            onChange={handleChange}
          />
        </label>
        <label>
          Average Bedrooms:
          <input
            type="number"
            name="aveBedrms"
            value={data.aveBedrms}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      {result.rSquare && <p>R-Square: {result.rSquare}</p>}
      {result.predicted && <p>Predicted Result: {result.predicted}</p>}
    </div>
  );
}

export default App;
