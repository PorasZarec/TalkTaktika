import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Lobby from "@/pages/Lobby";
import Play from "@/pages/Play"; 
import LoginPage from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import { SocketProvider } from "@/context/SocketContext";

function App() {
  return (
    <SocketProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/host" element={<Lobby />} />
          <Route path="/play/:roomCode" element={<Play />} />
          
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </SocketProvider>
  );
}

export default App;