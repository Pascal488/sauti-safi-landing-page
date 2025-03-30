import { useState, useEffect } from "react";
import Logo from "../assets/Logo.svg";

const menuLinks = [
    {
        id: 1,
        name: "Home",
        section: "hero"
    },
    {
        id: 2,
        name: "About",
        section: "benefits"
    },
    {
        id: 3,
        name: "Features",
        section: "features"
    },
    {
        id: 4,
        name: "Integrity",
        section: "integrity"
    },
    {
        id: 5,
        name: "Contacts",
        section: "contact"
    }
];

export default function Header() {
    const [activeLink, setActiveLink] = useState(1);
    const [isScrolling, setIsScrolling] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false); 

    const handleNavClick = (id: any, section: any) => {
        setActiveLink(id);
        scrollToSection(section);
        setIsMenuOpen(false); 
    };

    const scrollToSection = (sectionId: string) => {
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
        const handleScroll = () => {
            if (isScrolling) return;

            const sections = menuLinks.map(link => {
                const element = document.getElementById(link.section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return {
                        id: link.id,
                        top: rect.top
                    };
                }
                return null;
            }).filter(Boolean);
            const closest = sections.reduce((prev: any, curr: any) => {
                return (Math.abs(curr.top) < Math.abs(prev.top)) ? curr : prev;
            }, { id: 1, top: Infinity });

            setActiveLink(closest.id);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isScrolling]);

    return (
        <div className="md:flex md:justify-between w-full p-16 sticky top-0 backdrop-blur-sm z-50">
            <div className="flex items-center justify-between w-full md:w-auto">
                <img src={Logo} alt="SautiSafi Logo" className="w-32" />
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
                                className={`cursor-pointer relative py-2 px-3 transition-all duration-300 ${activeLink === menu.id
                                    ? "text-[#0A9964] font-medium"
                                    : "text-gray-600 hover:text-[#0A9964]"
                                    }`}
                                onClick={() => handleNavClick(menu.id, menu.section)}
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
