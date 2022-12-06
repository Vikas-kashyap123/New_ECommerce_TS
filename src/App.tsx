import { Routes, Route } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ProductPage from "./ProductPage";
// import Details from "./Details";
import NotFound from "./NotFound";
import CartPage from "./CartPage";
import LoginPage from "./LoginPage";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import AlertCard from "./Alert/AlertCard";
import UserProvider from "./providers/UserProvider";
import AlertProvider from "./providers/AlertProvider";
import CartProvider from "./providers/CartProvider";
import Contact from "./Contact";
import Home from "./Home";
import DetailsWithClass from "./DetailsWithClass";
import Details from "./Details";

function App() {
  return (
    <div className="flex flex-col h-screen p-2 overflow-scroll bg-gray-default">
      <UserProvider>
        <CartProvider>
          <AlertProvider>
            <Navbar />
            <AlertCard />
            <div className="grow">
              <Routes>
                <Route index element={<ProductPage />} />
                <Route path="/Products/:id" element={<Details />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/forgot" element={<ForgotPassword />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/home" element={<Home />} />
              </Routes>
            </div>
            <Footer />
          </AlertProvider>
        </CartProvider>
      </UserProvider>
    </div>
  );
}

export default App;
