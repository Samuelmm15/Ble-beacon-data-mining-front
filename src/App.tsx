import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Map from "./pages/Map";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import { Navigate, useLocation } from "react-router-dom";

function App() {
  const ProtectedElement = ({ element }: { element: React.ReactElement }) => {
    const location = useLocation();
    const isAuthenticated = localStorage.getItem("token") !== null;

    return isAuthenticated ? (
      element
    ) : (
      <Navigate to="/login" replace state={{ from: location }} />
    );
  };

  return (
    <div className="App bg-custom-color min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="/map" element={<ProtectedElement element={<Map />} />} />
          <Route
            path="/dataBase"
            element={<ProtectedElement element={<h1>Data Base</h1>} />}
          />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
