import "./index.css";
import { ThemeTest } from "./components/ThemeTest";

export default function App() {
  return (
    <div data-theme="talktaktikaTheme" className="min-h-screen bg-base-200 p-8">
      <ThemeTest />
    </div>
  );
}
