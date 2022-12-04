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
            //src="https://play-lh.googleusercontent.com/DO_MKLF-O6xicguHCr66XMLqHJWFQnLTgOcQ8N9bVDLYJXQwpuYXVzvAQ0fbg8y3iQ"
            src="https://preview.redd.it/y2ka4anwb6w81.gif?format=png8&s=8d152d046b3e71c6c02d0ced470e9d28bc25f17a"
            alt=""
          />
          Fräsch<span className="color--primary">Service</span>
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
