import { useEffect, useState } from "react";
import LaptopImage from "../assets/Transpict.svg";

export default function HeroSection() {
    const [isVisible, setIsVisible] = useState(false);
    const [secondTitleVisible, setSecondTitleVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 300);

        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 300) {
                setSecondTitleVisible(true);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            clearTimeout(timer);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <section className="">
            <div>
                <div
                    className={`max-w-[600px] mx-auto transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                        }`}
                >
                    <h1 className="text-center bg-gradient-to-r from-[#141619] to-[#6D63FF] font-extrabold text-7xl bg-clip-text text-transparent">
                        Transform how Clinicians work
                    </h1>
                </div>
                <div
                    className={`mt-5 max-w-[600px] mx-auto transition-all duration-1000 ease-out delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                        }`}
                >
                    <p className="text-center text-[#4D4D4D]">
                        SautiSafi is an AI intake solution for healthcare. SautiSafi listens to patients,
                        gathers their history, and summarizes the information for you.
                        Physicians can see more patients, enhance care quality, and save time on documentation.
                    </p>
                </div>
                <div
                    className={`mt-5 text-center mb-5 transition-all duration-1000 ease-out delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                        }`}
                >
                    <button className="animate-bounce border-[#6D63FF] border-4 bg-white text-[#6D63FF] rounded-full px-20 py-2.5 cursor-pointer hover:bg-[#6D63FF] hover:text-white hover:cursor-pointer transition-all duration-300">
                        Try for free
                    </button>
                </div>
            </div>
            <div
                className={`w-full text-center h-full flex justify-center p-5 transition-all duration-1500 ease-out delay-700 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
            >
                <div className="relative">
                    <div className="absolute inset-0 -top-10 -left-10 -right-10 -bottom-5 bg-purple-400/35 rounded-full blur-3xl "></div>
                    <div className="relative z-10 rounded-[40px] overflow-hidden shadow-lg " style={{ border: '5px solid rgba(209, 213, 219, 0.3)' }}>
                        <img src={LaptopImage} alt="Laptop showing SautiSafi interface" className="self-center w-full" />
                    </div>

                </div>
            </div>
            <div className="text-center mt-10 p-10 max-w-[500px] mx-auto">
                <div
                    className={`transition-all duration-1000 ease-out ${secondTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                        }`}
                >
                    <h1 className="text-center bg-gradient-to-r from-[#141619] to-[#6D63FF] font-extrabold text-5xl bg-clip-text text-transparent mb-5">
                        You deserve more than a Scribe
                    </h1>
                </div>
                <div
                    className={`transition-all duration-1000 ease-out delay-300 ${secondTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                        }`}
                >
                    <p>
                        Help clinicians save time and achieve more with less effort so they can focus on what matters most with SautiSafi AI solution.
                    </p>
                </div>
            </div>
        </section>
    );
}