import { Routes, Route, HashRouter } from "react-router-dom";
import { Home } from "./Pages/Home";

export const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </HashRouter>
  );
};
