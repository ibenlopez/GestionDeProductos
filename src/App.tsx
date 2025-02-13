import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Navbar from "./components/Navbar";
import './App.css'
import ProductPage from "./pages/ProductPage";
import ProductEditPage from "./pages/ProductEditPage";
import Footer from "./components/Footer";

function App() {
    return (
        <>
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/dashboard"
                    element={<ProtectedRoute component={Dashboard} />}
                />
                <Route path="/products/:id" element={<ProductPage />} />
                <Route path="/products/edit/:id" element={<ProtectedRoute component={ProductEditPage} />} />
                <Route path="/products/add" element={<ProtectedRoute component={ProductEditPage} />} />
            </Routes>
            <Footer />
        </Router>
        </>
    );
}

export default App;
