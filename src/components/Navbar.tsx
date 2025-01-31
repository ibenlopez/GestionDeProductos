import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem("token");
            navigate("/login");
        } catch (error) {
            console.error("Error al cerrar sesión", error);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                <img src="/src/assets/Logo-Reviewfy.svg" alt="Reviewfy" height="40"/>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {token ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/dashboard">
                                        Dashboard
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-danger ms-2" onClick={handleLogout}>
                                        Cerrar Sesión
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
