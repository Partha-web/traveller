// Toast message
import { toast, ToastContainer } from "react-toastify";
import "./App.css";
import Login from "./Components/Login";
import { Routes, Route } from "react-router-dom";
import Searchflight from "./Components/Searchflight";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/search-flight" element={<Searchflight />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
