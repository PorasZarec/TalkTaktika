import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import { SocketProvider } from "@/context/SocketContext";

function App() {
  return (
    <SocketProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </SocketProvider>
  );
}

export default App;
