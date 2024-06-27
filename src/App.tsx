import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Map from "./pages/Map";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import { Navigate, useLocation } from "react-router-dom";
import TableData from "./pages/TableData";
import ResetPassword from "./pages/ResetPassword";
import { useState } from "react";

function App() {
  const [userName, setUserName] = useState<string>("");

  const ProtectedElement = ({ element }: { element: React.ReactElement }) => {
    const location = useLocation();
    const isAuthenticated = localStorage.getItem("token") !== null;

    if (!isAuthenticated) {
      return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return element;
  };

  return (
    <div className="App bg-custom-color min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route
            path="/home"
            element={<Home setGlobalUserName={setUserName} />}
          />
          <Route
            path="/map"
            element={<ProtectedElement element={<Map userName={userName} />} />}
          />
          <Route
            path="/dataBase"
            element={
              <ProtectedElement element={<TableData userName={userName} />} />
            }
          />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
