import "./App.css";
import { useState } from "react";
import Layout from "./components/Layout/Layout";
import axios from "axios";
import ModelOutputContext from "./contexts/ModelOutputContext";
function App() {
  const token = localStorage.getItem("token");
  const [modelOutputContext, setModelOutputContext] = useState(null);
  //If token is present, add it to headsers of all requests
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return (
    <ModelOutputContext.Provider
      value={{ modelOutputContext, setModelOutputContext }}
    >
      <Layout />;
    </ModelOutputContext.Provider>
  );
}

export default App;
