import NavBar from "../navbar/navbar";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
    const location = useLocation();

    const showNavBar = location.pathname !== '/login' && location.pathname !== '/register';
    return (
        <>
            {showNavBar && <NavBar />}
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default Layout;
