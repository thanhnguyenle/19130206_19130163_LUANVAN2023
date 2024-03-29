import React, { useState } from "react";
import SideNav from "./components/layout/sideNav";
import Navbar from "./components/layout/navbar";
import { Routes, Route } from "react-router-dom";
import SEODashboard from "./components/views1/SEODashboard";
import ECommerce1 from "./components/views1/ECommerce1";
import ECommerce2 from "./components/views1/ECommerce2";
import ChatApp from "./components/views1/ChatApp";
import NotFound404 from "./components/views1/NotFound404";
import ChangePassword from "./components/views1/ChangePassword";
import ForgotPassword from "./components/views1/ForgotPassword";
import LoginRegister from "./components/views1/LoginRegister";
import UserManagement from "./components/views1/UserManagement";
import UserProfile from "./components/views1/UserProfile";
import InvoicePage from "./components/views1/InvoicePage";
import MailboxApp from "./components/views1/MailboxApp";
import OrderDashboard from "./components/views1/OrderDashboard";
import TrafficDashboard from "./components/views1/TrafficDashboard";
import AdsDashboard from "./components/views1/AdsDashboard";
import './i18n/i18n';
import HomePage from "./views/home/homePage";
import NavBottom from "./components/layout/navBottom";
import CategoryPage from "./views/goods/category";
import TableRoomPage from "./views/tableRoom/tableRoom";
import PriceSettingPage from "./views/goods/priceSetting";
import InventoryControlPage from "./views/goods/inventoryControl";
import BillPage from "./views/transaction/ bill";
import ReturnOrderPage from "./views/transaction/returnOrder";
import ImportGoodsPage from "./views/transaction/importGoods";
import MaterialReturnPage from "./views/transaction/materialReturn";
import CancellationPage from "./views/transaction/cancellation";
import ClientPage from "./views/partner/Client";
import SupplierPage from "./views/partner/Supplier";
import CashBookPage from "./views/cashbook/cashbook";

function App() {
  const [basicOpen, setBasicOpen] = useState(true);
  const [collapseSidebar, setCollapseSidebar] = useState(false);
  return (
    <>
      <header>
        <SideNav basicOpen={basicOpen} setBasicOpen={setBasicOpen} collapseSidebar={collapseSidebar} setCollapseSidebar={setCollapseSidebar} />
        <Navbar updateSidenav={setBasicOpen} sidenavState={basicOpen} />
        <NavBottom />
      </header>
      <main className={collapseSidebar ? "collapseSidebar1" : ""}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/price-setting" element={<PriceSettingPage />} />
          <Route path="/inventory-control" element={<InventoryControlPage />} />
          <Route path="/table-room" element={<TableRoomPage />} />
          <Route path="/bill" element={<BillPage />} />
          <Route path="/return-order" element={<ReturnOrderPage />} />
          <Route path="/import-goods" element={<ImportGoodsPage />} />
          <Route path="/supplier" element={<SupplierPage />} />
          <Route path="/cancellation" element={<CancellationPage />} />
          <Route path="/client" element={<ClientPage />} />
          <Route path="/supplier" element={<SupplierPage />} />
          <Route path="/cask-book" element={<CashBookPage />} />
          <Route path="/traffic-dashboard" element={<TrafficDashboard />} />
          <Route path="/mailbox-app" element={<MailboxApp />} />
          <Route path="/chat-app" element={<ChatApp />} />
          <Route path="/invoice-page" element={<InvoicePage />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/login-register" element={<LoginRegister />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/not-found404" element={<NotFound404 />} />
        </Routes>
      </main>
      <footer className="mt-5"></footer>
    </>
  );
}

export default App;
