import { useEffect, useState } from "react";
import LaptopImage from "../assets/Transpict.svg";
import { useStrapiData } from "../contexts/StrapiContext";

export default function HeroSection() {
    const [isVisible, setIsVisible] = useState(false);
    const [secondTitleVisible, setSecondTitleVisible] = useState(false);
    const { heroContent, loading, error } = useStrapiData();

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

    // Fallback content if data is loading or there's an error
    const title = heroContent?.data?.attributes?.title || "Transform how Clinicians work";
    const subtitle = heroContent?.data?.attributes?.subtitle || "VoithAI is an AI intake solution for healthcare. VoithAI listens to patients, gathers their history, and summarizes the information for you. Physicians can see more patients, enhance care quality, and save time on documentation.";
    const buttonText = heroContent?.data?.attributes?.buttonText || "Try for free";
    
    // Use Strapi image URL if available, otherwise fallback to local image
    const imageSrc = heroContent?.data?.attributes?.mainImage?.data?.attributes?.url 
        ? `${import.meta.env.VITE_STRAPI_MEDIA_URL}${heroContent.data.attributes.mainImage.data.attributes.url}` 
        : LaptopImage;
    
    const imageAlt = heroContent?.data?.attributes?.mainImage?.data?.attributes?.alternativeText || "Laptop showing VoithAI interface";

    // Show loading state
    if (loading) {
        return <div className="flex justify-center items-center h-[60vh]">Loading...</div>;
    }

    // Show error state
    if (error) {
        console.error("Error loading hero content:", error);
        // Continue with fallback content
    }

    return (
        <section className="">
            <div>
                <div
                    className={`max-w-[600px] mx-auto transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                        }`}
                >
                    <h1 className="text-center bg-gradient-to-r from-[#141619] to-[#6D63FF] font-extrabold text-7xl bg-clip-text text-transparent">
                        {title}
                    </h1>
                </div>
                <div
                    className={`mt-5 max-w-[600px] mx-auto transition-all duration-1000 ease-out delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                        }`}
                >
                    <p className="text-center text-[#4D4D4D]">
                        {subtitle}
                    </p>
                </div>
                <div
                    className={`mt-5 text-center mb-5 transition-all duration-1000 ease-out delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                        }`}
                >
                    <button className="animate-bounce border-[#6D63FF] border-4 bg-white text-[#6D63FF] rounded-full px-20 py-2.5 cursor-pointer hover:bg-[#6D63FF] hover:text-white hover:cursor-pointer transition-all duration-300">
                        {buttonText}
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
                        <img src={imageSrc} alt={imageAlt} className="self-center w-full" />
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
                        Help clinicians save time and achieve more with less effort so they can focus on what matters most with VoithAI AI solution.
                    </p>
                </div>
            </div>
        </section>
    );
}