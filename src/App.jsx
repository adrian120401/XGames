import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import AssasainCreed from "./pages/AssasainCreed";
import Expedition33 from "./pages/Expedition33";
import SpiderMan from "./pages/SpiderMan";
import Shooter from "./pages/Shooter";
import Candycrush from "./pages/Candycrush";
import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/assassins-creed" element={<AssasainCreed />} />
      <Route path="/expedition-33" element={<Expedition33 />} />
      <Route path="/spiderman" element={<SpiderMan />} />
      <Route path="/shooter" element={<Shooter />} />
      <Route path="/Candycrush" element={<Candycrush />} />
      <Route path="/AboutUs" element={<AboutUs />} />
    </Routes>
  );
}

export default App;
