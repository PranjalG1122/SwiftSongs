import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Page404 from "./components/Page404";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/*" element={<Page404 />}></Route>
        </Routes>
      </Router>
    </>
  );
}
