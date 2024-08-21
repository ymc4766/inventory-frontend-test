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
import MyOrders from "./screens/userScreens/MyOrders";
import OrderDetails from "./screens/productScreens/OrderDetails";
import ConfirmRequisition from "./screens/productScreens/ConfirmRequisition";
import LPO from "./screens/productScreens/LPO";
import GRN from "./screens/productScreens/GRN";
import LocalPurchaseOrders from "./screens/procurementScreens/LocalPurchaseOrders";
import PendingRequsitions from "./screens/procurementScreens/PendingRequisitions";
import UserList from "./screens/userScreens/ListUsers";
import EditProduct from "./screens/productScreens/EditProduct";

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
          path="/confirm-requisition"
          exact
          element={
            <AuthUser>
              <Layout>
                <ConfirmRequisition />
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

        <Route
          path="/my-orders-list"
          exact
          element={
            <AuthUser>
              <Layout>
                <MyOrders />
              </Layout>
            </AuthUser>
          }
        />
        <Route
          path="/orderdetail/:id"
          exact
          element={
            <AuthUser>
              <Layout>
                <OrderDetails />
              </Layout>
            </AuthUser>
          }
        />

        <Route
          path="/LPO-factory"
          exact
          element={
            <AuthUser>
              <Layout>
                <LPO />
              </Layout>
            </AuthUser>
          }
        />

        <Route
          path="/LPO-procurement"
          exact
          element={
            <AuthUser>
              <Layout>
                <LocalPurchaseOrders />
              </Layout>
            </AuthUser>
          }
        />

        <Route
          path="/pending-requisitions"
          exact
          element={
            <AuthUser>
              <Layout>
                <PendingRequsitions />
              </Layout>
            </AuthUser>
          }
        />
        <Route
          path="/goods-receive-note"
          exact
          element={
            <AuthUser>
              <Layout>
                <GRN />
              </Layout>
            </AuthUser>
          }
        />

        <Route
          path="/listUsers"
          exact
          element={
            <AuthUser>
              <Layout>
                <UserList />
              </Layout>
            </AuthUser>
          }
        />

        <Route
          path="/edit/:id"
          exact
          element={
            <AuthUser>
              <Layout>
                <EditProduct />
              </Layout>
            </AuthUser>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
