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
const queryClient = new QueryClient();
function App() {
  const [isLoggin, setIsLoggin] = useState(false);

  const handleLogin = () => {
    setIsLoggin(true);
  };

  const handleLogout = () => {
    setIsLoggin(false);
  };
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Navbar />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/detail-page" element={<DetailPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
