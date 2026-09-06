import { Route, Routes } from "react-router-dom";
import { Layout } from "../components";
import { HomePage } from "../pages";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  );
}
