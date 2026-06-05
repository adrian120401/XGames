import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import AssasainCreed from './pages/AssasainCreed';
import Expedition33 from './pages/Expedition33';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/assassins-creed" element={<AssasainCreed />} />
            <Route path="/expedition-33" element={<Expedition33 />} />
        </Routes>
    );
}

export default App;
