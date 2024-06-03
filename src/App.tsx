import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Map from "./pages/Map";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import { Navigate, useLocation } from "react-router-dom";
import TableData from "./pages/TableData";

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
          <Route path="/map" element={<ProtectedElement element={<Map />} />} />
          <Route
            path="/dataBase"
            element={<ProtectedElement element={<TableData />} />}
          />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<h1>Reset Password</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
