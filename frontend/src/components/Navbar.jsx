import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = ({ theme, setTheme }) => {
  const { pathname } = useLocation();
  const { isAuth, user, logout } = useContext(AuthContext);

  const toggleTheme = () => {
    setTheme(theme === "light-theme" ? "dark-theme" : "light-theme");
  };
  // const navBtn = (path) =>
  //   `btn btn-sm me-2 ${pathname === path ? "btn-light" : "btn-outline-light"}`;

  const navBtn = (path) =>
    `btn btn-sm me-2 rounded-pill nav-btn ${
      pathname === path
        ? "btn-glossy shadow-lg border-2 active-nav"
        : "btn-outline-light text-light border-2"
    }`;

  return (
    <nav
      className={`navbar navbar-expand px-4 ${
        theme === "light-theme" ? "navbar-light-custom" : "navbar-dark bg-dark"
      }`}
    >
      <Link className="navbar-brand" to="/">
        RxFluency
      </Link>

      <div className="ms-4">
        <Link className={navBtn("/quizsetup2")} to="/quizsetup2">
          Rx Quiz
        </Link>
        <Link className={navBtn("/flashcards")} to="/flashcards">
          Rx Flashcards
        </Link>
        {/* <Link to="/pthealthcarequiz" className="btn btn-primary">
          PT Healthcare quiz
        </Link>
        <Link to="/pthealthcare" className="btn btn-primary">
          PT Healthcare
        </Link> */}
        <Link to="/pt-drug-reference" className="btn btn-outline-dark">
          PT Drug Reference
        </Link>
        <Link className="btn btn-outline-dark" to="/pt-reference">
          PT Drug Reference Table
        </Link>
        <Link className="btn btn-outline-dark" to="/pt-flashcards">
          PT Flashcards
        </Link>
        <Link to="/pthealthcare/quiz" className="btn btn-success ms-2">
          Quiz PT Drugs
        </Link>
        {isAuth && user?.is_staff && (
          <>
            <Link className={navBtn("/admin/drugs")} to="/admin/drugs">
              Manage Drugs
            </Link>
            <Link className={navBtn("/admin/pt-drugs")} to="/admin/pt-drugs">
              Manage PT Drugs
            </Link>
          </>
        )}
      </div>
      <div className="ms-auto">
        {isAuth ? (
          <>
            {/* Welcome message */}
            <span className="text-light me-3">
              Welcome, {user?.username || "User"}
            </span>
            <Link className={navBtn("/profile")} to="/profile">
              Profile
            </Link>
            <button className="btn btn-outline-light btn-sm" onClick={logout}>
              Logout <i className="bi bi-door-open ms-2"></i>
            </button>
          </>
        ) : (
          <>
            <Link className={navBtn("/login")} to="/login">
              Login<i className="bi bi-key ms-2"></i>
            </Link>
            <Link className={navBtn("/register")} to="/register">
              Register <i className="bi bi-pencil-square ms-2"></i>
            </Link>
          </>
        )}
      </div>

      <button className="btn btn-outline-secondary m-2" onClick={toggleTheme}>
        {/* {theme === "light-theme" ? "🌙" : "☀️"} */}
        <i className={theme === "light-theme" ? "bi bi-moon" : "bi bi-sun"}></i>
      </button>
    </nav>
  );
};

export default Navbar;
