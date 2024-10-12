import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Authors from "./pages/Authors";
import Books from "./pages/Books"
import AuthorBooks from "./pages/AuthorBooks"
import HomePage from "./pages/HomePage"
import MyNavBar from "./components/MyNavBar";
import Book from "./pages/Book";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <MyNavBar />
        <Routes>

          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/books" element={<Books />} />
          <Route exact path="/authors" element={<Authors />} />
          <Route exact path="/authorbooks" element={<AuthorBooks />} />
          <Route exact path="/bookdetails" element={<Book />} />

        </Routes>

      </Router>
    </>
  );
}
