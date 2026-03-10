// Layout.jsx
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = ({ theme, setTheme }) => {
  return (
    <div className="d-flex flex-column vh-100">
      <Navbar theme={theme} setTheme={setTheme} />
      <div className="d-flex flex-grow-1">
        <Sidebar />
        <main className="flex-grow-1">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
