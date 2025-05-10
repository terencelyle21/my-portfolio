import { Outlet } from "react-router-dom";

// styles
import '../styles/MainLayout.css';

// components
import CustomCursor from "../components/ui/CustomCursor";
import Navigation from "../components/Navigation";
// import Footer from "../components/Footer";

const MainLayout = () => {
    return (
        <div className="main-layout">
            <CustomCursor />
            <Navigation />

            <div className="page-content">
                <Outlet />
            </div>

            {/* Footer */}
            {/* <Footer /> */}
        </div>
    );
};

export default MainLayout;
