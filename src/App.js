import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Page404 from "./pages/Page404";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/*" element={<Page404 />}></Route>
        </Routes>
      </Router>
    </>
  );
}
