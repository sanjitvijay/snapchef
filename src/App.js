import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Navbar from "./components/Navbar";
import Home from "./pages/Home"
import About from "./pages/About";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      <ToastContainer/>
      <Router>
          <Navbar/>
          <div className="pb-5">
            <Routes> 
                <Route exact path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
            </Routes>
          </div>
      </Router>

    </>
  );
}

export default App;
