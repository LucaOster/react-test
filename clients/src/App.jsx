import { Routes, Route, Navigate } from "react-router-dom";

import Home from "@pages/Home";
import Login from "@pages/Auth/Login";
import "@styles/App.scss";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Home />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
    );
}

export default App;
