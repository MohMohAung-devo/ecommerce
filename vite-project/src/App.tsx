import Register from "@/pages/auth/register/Register";
import Login from "@/pages/auth/login/Login";
import Home from "@/pages/home/Home";
import Navbar from "@/pages/navbar/Navbar";
import Footer from "@/pages/footer/Footer";
import DetailPage from "@/pages/home/detail/ProductDetail";
import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CartList from "@/pages/cart-list/CartList";

const queryClient = new QueryClient();
const AuthRoute = () => {
  const location = useLocation();
  const showMenu =
    location.pathname !== "/login" && location.pathname !== "/register";
  return (
    <>
      {showMenu && <Navbar />}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/:id/detail" element={<DetailPage />} />
        <Route path="/buy-cart-list" element={<CartList />} />
      </Routes>
      {showMenu && <Footer />}
    </>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthRoute />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
