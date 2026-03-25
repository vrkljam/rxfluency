import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = ({ theme, setTheme }) => {
  const { pathname } = useLocation();
  const { isAuth, user, logout } = useContext(AuthContext);

  const toggleTheme = () => {
    setTheme(theme === "light-theme" ? "dark-theme" : "light-theme");
  };

  const navBtn = (path) =>
    `btn-glossy nav-btn ${pathname === path ? "active-nav" : ""}`;

  return (
    <nav
      className={`navbar navbar-expand-md px-4 ${
        theme === "light-theme" ? "navbar-light-custom" : "navbar-dark bg-dark"
      }`}
    >
      <Link className="navbar-brand oleo-script-bold" to="/">
        RxFluency
      </Link>

      {/* Hamburger toggler for small screens */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto mt-3 mt-lg-0 gap-4">
          {/* <div className="navbar-nav me-auto"> */}
          <li className="nav-item">
            <Link className={navBtn("/quizsetup2")} to="/quizsetup2">
              Rx Quizz
            </Link>
          </li>
          <li className="nav-item">
            <Link className={navBtn("/flashcards")} to="/flashcards">
              Rx Flashcards
            </Link>
          </li>
          <li className="nav-item">
            {/* Add this link anywhere you want in the navbar links section */}
            <Link className={navBtn("/memory")} to="/memory">
              Memory Game
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={navBtn("/pt-drug-reference")}
              to="/pt-drug-reference"
            >
              PT Drug Reference
            </Link>
          </li>
          <li className="nav-item">
            <Link className={navBtn("/pt-reference")} to="/pt-reference">
              PT Drug Reference Table
            </Link>
          </li>
          <li className="nav-item">
            <Link className={navBtn("/pt-flashcards")} to="/pt-flashcards">
              PT Flashcards
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={navBtn("/pthealthcare/quiz")}
              to="/pthealthcare/quiz"
            >
              Quiz PT Drugs
            </Link>
          </li>

          {isAuth && user?.is_staff && (
            <>
              <li className="nav-item">
                <Link className={navBtn("/admin/drugs")} to="/admin/drugs">
                  Manage Drugs
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={navBtn("/admin/pt-drugs")}
                  to="/admin/pt-drugs"
                >
                  Manage PT Drugs
                </Link>
              </li>
            </>
          )}
        </ul>
        {/* </div> */}
        <div className="ms-auto nav-right">
          {isAuth ? (
            <>
              {/* Welcome message */}
              <span className="text-light me-3">
                Welcome, {user?.username || "User"}
              </span>
              <Link className={navBtn("/profile")} to="/profile">
                Profile
              </Link>
              <button className="btn-glossy nav-btn" onClick={logout}>
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
          <button className="btn-glossy nav-btn m-2" onClick={toggleTheme}>
            <i
              className={theme === "light-theme" ? "bi bi-moon" : "bi bi-sun"}
            ></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
