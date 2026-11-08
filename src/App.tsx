
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Employee from "./pages/Employee";
import Salary from "./pages/Salary";
import Organization from "./pages/Organization";
import Evaluation from "./pages/Evaluation";
import Document from "./pages/Document";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={<Navigate to="/dashboard" replace />}
          />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/salary" element={<Salary />} />
          <Route path="/organization" element={<Organization />} />
          <Route path="/evaluation" element={<Evaluation />} />
          <Route path="/document" element={<Document />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
