import "./App.css";
import Layout from "@/pages/Layout";
import Dashboard from "@/pages/dashboard/Dashboard";
import ProductAdd from "@/pages/product-add/ProductAdd";
import UserList from "@/pages/user-list/UserList";
import BuyProduct from "@/pages/buy-product/BuyProduct";
import BuyUserList from "@/pages/buy-user-list/BuyUserList";
import Register from "@/pages/auth/register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<Dashboard />} />
            <Route path="/product-add" element={<ProductAdd />} />
            <Route path="/user-list" element={<UserList />} />
            <Route path="/buy-product" element={<BuyProduct />} />
            <Route path="/buy-user-list" element={<BuyUserList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
