import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import JoinContest from "./components/JoinContest";
import ContestDashboard from "./components/ContestDashboard";
import Leaderboard from "./components/Leaderboard";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<JoinContest />} />
          <Route
            path="/contest/:contestId"
            element={<ContestDashboard />}
          />
          <Route
            path="/leaderboard/:contestId"
            element={<Leaderboard />}
          />
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}