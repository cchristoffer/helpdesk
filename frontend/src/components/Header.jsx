import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img
            className="freshLogo"
            src="https://play-lh.googleusercontent.com/DO_MKLF-O6xicguHCr66XMLqHJWFQnLTgOcQ8N9bVDLYJXQwpuYXVzvAQ0fbg8y3iQ"
            alt=""
          />
          FräschService
        </Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className="btn" onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Logga in
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> Registrera konto
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
