import { useState, useEffect } from "react";
import Logo from "../assets/LogoNew.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";

const menuLinks = [
    {
        id: 1,
        name: "Home",
        section: "hero",
        path: "/"
    },
    {
        id: 2,
        name: "About",
        section: "benefits",
        path: "/#benefits"
    },
    {
        id: 3,
        name: "Features",
        section: "features",
        path: "/#features"
    },
    {
        id: 4,
        name: "Research",
        section: "research",
        path: "/research"
    },
    {
        id: 5,
        name: "Contacts",
        section: "contact",
        path: "/#contact"
    }
];

export default function Header() {
    const [activeLink, setActiveLink] = useState(1);
    const [isScrolling, setIsScrolling] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const currentPath = location.pathname;
        const foundLink = menuLinks.find(link => 
            currentPath === link.path || 
            (currentPath.startsWith('/research') && link.path === '/research')
        );
        
        if (foundLink) {
            setActiveLink(foundLink.id);
        }
    }, [location.pathname]);

    const handleNavClick = (id: number, section: string, path: string) => {
        setActiveLink(id);
        setIsMenuOpen(false);

        if (path !== location.pathname && !path.includes('#')) {
            navigate(path);
            return;
        }

        if (path.includes('#')) {
            const sectionId = path.split('#')[1];
            scrollToSection(sectionId || section);
        } else {
            scrollToSection(section);
        }
    };

    const scrollToSection = (sectionId: string) => {
        if (location.pathname !== '/' && !location.pathname.includes(sectionId)) {
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    setIsScrolling(true);
                    element.scrollIntoView({ behavior: "smooth" });
                    setTimeout(() => {
                        setIsScrolling(false);
                    }, 1000);
                }
            }, 100);
            return;
        }

        const element = document.getElementById(sectionId);
        if (element) {
            setIsScrolling(true);
            element.scrollIntoView({ behavior: "smooth" });
            setTimeout(() => {
                setIsScrolling(false);
            }, 1000);
        }
    };

    useEffect(() => {
        if (location.pathname !== '/') return;

        const handleScroll = () => {
            if (isScrolling) return;

            const sections = menuLinks
                .filter(link => link.path === '/' || link.path.startsWith('/#'))
                .map(link => {
                    const sectionId = link.path.includes('#') ? link.path.split('#')[1] : link.section;
                    const element = document.getElementById(sectionId);
                    if (element) {
                        const rect = element.getBoundingClientRect();
                        return {
                            id: link.id,
                            top: rect.top
                        };
                    }
                    return null;
                }).filter(Boolean);
            
            if (sections.length === 0) return;
            
            const closest = sections.reduce((prev: any, curr: any) => {
                return (Math.abs(curr.top) < Math.abs(prev.top)) ? curr : prev;
            }, { id: 1, top: Infinity });

            setActiveLink(closest.id);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isScrolling, location.pathname]);

    return (
        <div className="md:flex md:justify-between w-full p-16 sticky top-0 backdrop-blur-sm z-50">
            <div className="flex items-center justify-between w-full md:w-auto">
                <Link to="/">
                    <img src={Logo} alt="VoithAI Logo" className="w-32" />
                </Link>
                <button
                    className="md:hidden text-2xl"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    ☰
                </button>
            </div>

            <div className={`md:block ${isMenuOpen ? "block" : "hidden"} md:flex`}>
                <ul className="list-none flex flex-col md:flex-row md:space-x-5 space-y-4 md:space-y-0">
                    {
                        menuLinks.map((menu) => (
                            <li
                                key={menu.id}
                                className={`cursor-pointer relative py-2 px-3 transition-all duration-300 ${
                                    activeLink === menu.id
                                        ? "text-[#0A9964] font-medium"
                                        : "text-gray-600 hover:text-[#0A9964]"
                                    }`}
                                onClick={() => handleNavClick(menu.id, menu.section, menu.path)}
                            >
                                {menu.name}
                                {activeLink === menu.id && (
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0A9964] rounded-full" />
                                )}
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}