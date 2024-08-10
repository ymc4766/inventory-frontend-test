import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./components/Landing";
import Layout from "./Layout/Layout";
import Dashboard from "./screens/Dashboard";
import LoginScreen from "./screens/userScreens/LoginScreen";
import RegisterScreen from "./screens/userScreens/RegisterScreen";
import Warehouse from "./screens/productScreens/Warehouse";
import ProductDetails from "./screens/productScreens/ProductDetails";
import CartScreen from "./screens/CartScreen";
import AuthUser from "./components/AuthUser";
import RequisitionType from "./screens/productScreens/RequisitionType";
import PurchaseRequisition from "./screens/productScreens/PurchaseRequisition";
import PlaceOrder from "./screens/productScreens/PlaceOrder";

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
            <AuthUser>
              <Layout>
                <Dashboard />
              </Layout>
            </AuthUser>
          }
        />
        <Route
          path="/warehouse"
          exact
          element={
            <AuthUser>
              <Layout>
                <Warehouse />
              </Layout>
            </AuthUser>
          }
        />

        <Route
          path="/product/:id"
          exact
          element={
            <AuthUser>
              <Layout>
                <ProductDetails />
              </Layout>
            </AuthUser>
          }
        />

        <Route
          path="/store-requisition"
          exact
          element={
            <AuthUser>
              <Layout>
                <CartScreen />
              </Layout>
            </AuthUser>
          }
        />

        <Route
          path="/requisition-type"
          exact
          element={
            <AuthUser>
              <Layout>
                <RequisitionType />
              </Layout>
            </AuthUser>
          }
        />

        <Route
          path="/purchase-requisition"
          exact
          element={
            <AuthUser>
              <Layout>
                <PurchaseRequisition />
              </Layout>
            </AuthUser>
          }
        />

        <Route
          path="/placeorder"
          exact
          element={
            <AuthUser>
              <Layout>
                <PlaceOrder />
              </Layout>
            </AuthUser>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
