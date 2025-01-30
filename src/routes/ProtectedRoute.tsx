import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    component: React.ElementType;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
    const token = localStorage.getItem("token");

    return token ? <Component /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
