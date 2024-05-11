import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App bg-custom-color min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="/map" element={<h1>Map</h1>} />
          <Route path="/dataBase" element={<h1>Data Base</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
