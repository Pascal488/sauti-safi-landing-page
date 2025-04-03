import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AppLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Header with sticky positioning */}
            <Header />
            
            {/* Main content area that takes up remaining space */}
            <main className="flex-grow">
                <Outlet />
            </main>
            
            {/* Footer */}
            <Footer />
        </div>
    );
}