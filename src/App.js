import React from "react";
import { Route, Routes } from "react-router-dom";
import MakersEditor from "../src/Page/MakersEditor";
import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MakersEditor />}></Route>
    </Routes>
  );
};
export default App;
