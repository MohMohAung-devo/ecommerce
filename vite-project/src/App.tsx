import Register from "@/pages/auth/register/Register";
import Login from "@/pages/auth/login/Login";
import Home from "@/pages/home/Home";
import Navbar from "@/pages/navbar/Navbar";
import Footer from "@/pages/footer/Footer";
import DetailPage from "@/pages/detailPage/DetailPage";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { useAuth } from "@/pages/hook/useAuth";
import { useLocation } from "react-router-dom";
const queryClient = new QueryClient();
function App() {
  const [isLoggin, setIsLoggin] = useState(false);
  const { isAuthenicated } = useAuth();

  // const location = useLocation();
  // const hideMenu = ["/register", "/login"];

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/detail-page" element={<DetailPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
