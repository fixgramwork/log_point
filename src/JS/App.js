import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./JS/navbar.js";
import Signin from "./JS/signin.js";
import Signup from "./JS/signup.js";
import Function from "./JS/function.js";
import Home from "./JS/home.js";
import Ranking from "./JS/ranking.js";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        {/* 로그인이랑 회원가입 */}
        <Route path="/Signin" element={<Signin />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
        {/* 기능 */}
        <Route path="/function" element={<Function />}></Route>
        <Route path="/ranking" element={<Ranking />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
