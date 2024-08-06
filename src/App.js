import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./components/Landing";
import Layout from "./Layout/Layout";
import Dashboard from "./screens/Dashboard";
import LoginScreen from "./screens/userScreens/LoginScreen";
import RegisterScreen from "./screens/userScreens/RegisterScreen";
import Warehouse from "./screens/productScreens/Warehouse";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/*" element={<Navigate to="/" />} />

        <Route exact path="/login" element={<LoginScreen />} />
        <Route exact path="/register" element={<RegisterScreen />} />

        <Route
          path="/dashboard"
          exact
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/warehouse"
          exact
          element={
            <Layout>
              <Warehouse />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
