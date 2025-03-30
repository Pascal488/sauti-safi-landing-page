import { Link } from 'react-router-dom';
import Logo from "../assets/Logo.svg";

export default function Footer () {
    return (
        <footer className="w-full border-t border-gray-200 bg-white p-8 sm:p-12 lg:p-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
                    <div className="flex items-center mb-6 md:mb-0">
                        <div className="mr-2">
                            <img src={Logo} alt="Logo" className="w-32" />
                        </div>
                    </div>

                    <nav className="flex flex-col md:flex-row justify-center mb-6 md:mb-0">
                        <ul className="flex flex-col md:flex-row space-y-4 md:space-x-8 md:space-y-0">
                            <li>
                                <Link to="/" className="text-gray-700 hover:text-emerald-600 transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-700 hover:text-emerald-600 transition-colors">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to="/features" className="text-gray-700 hover:text-emerald-600 transition-colors">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link to="/integrity" className="text-gray-700 hover:text-emerald-600 transition-colors">
                                    Integrity
                                </Link>
                            </li>
                            <li>
                                <Link to="/contacts" className="text-gray-700 hover:text-emerald-600 transition-colors">
                                    Contacts
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
                        <Link to="/terms" className="text-gray-600 hover:text-emerald-600 text-sm transition-colors">
                            Terms of Use
                        </Link>
                        <Link to="/privacy" className="text-gray-600 hover:text-emerald-600 text-sm transition-colors">
                            Privacy Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};


