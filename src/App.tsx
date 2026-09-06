import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import "./styles/app.css";

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
