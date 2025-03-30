import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { useRef, useState } from "react";
import LadySmile from "../assets/LadySmile.svg";
import MicheleSmile from "../assets/MicheleSmile.svg";
//@ts-ignore
import 'swiper/css';
//@ts-ignore
import 'swiper/css/effect-fade';


const ArrowLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>
);

const ArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const benefits = [
  {
    id: 1,
    title: "Boost Clinician Wellbeing",
    description: "Empower healthcare professionals to focus on what matters most while enjoying a better work-life balance with less administrative burden, burnout, and cognitive load.",
    image: LadySmile 
  },
  {
    id: 2,
    title: "Enhance Care Quality",
    description: "Help clinicians focus on patients, capture the full patient story, and improve care quality by producing accurate, comprehensive documentation efficiently and consistently without needing to rely on memory after a visit.",
    image: MicheleSmile 
  },
  {
    id: 3, 
    title: "Increase Operational Efficiency",
    description: "Increase patient throughput and revenue by reducing time spent on documentation and expand accessibility across inpatient, urgent care, and specialty settings.",
    image: LadySmile
  },
  {
    id: 4,
    title: "Boost Clinician Wellbeing",
    description: "Empower healthcare professionals to focus on what matters most while enjoying a better work-life balance with less administrative burden, burnout, and cognitive load.",
    image: LadySmile 
  },
  {
    id: 5,
    title: "Enhance Care Quality",
    description: "Help clinicians focus on patients, capture the full patient story, and improve care quality by producing accurate, comprehensive documentation efficiently and consistently without needing to rely on memory after a visit.",
    image: MicheleSmile 
  },
  {
    id: 6,
    title: "Increase Operational Efficiency",
    description: "Increase patient throughput and revenue by reducing time spent on documentation and expand accessibility across inpatient, urgent care, and specialty settings.",
    image: LadySmile
  }
];

export default function Benefits() {
    const swiperRef = useRef<SwiperType | null>(null);
    const [_, setActiveIndex] = useState<number>(0);

    const handlePrev = () => {
        if (swiperRef.current) {
            swiperRef.current.slidePrev();
        }
    };

    const handleNext = () => {
        if (swiperRef.current) {
            swiperRef.current.slideNext();
        }
    };

    const handleSlideChange = (swiper: SwiperType) => {
        setActiveIndex(swiper.realIndex);
    };

    return (
        <section className="max-w-7xl mx-auto px-6 md:px-8 py-16">
            <Swiper
                spaceBetween={30}
                slidesPerView={1}
                loop={true}
                speed={1000}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                }}
                breakpoints={{
                    // Mobile
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    // Tablet
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                    // Desktop
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    }
                }}

                onSlideChange={handleSlideChange}
                modules={[Autoplay, EffectFade]}
                className="mb-12"
            >
                {benefits.map((benefit) => (
                    <SwiperSlide key={benefit.id} className="h-full">
                        <div className="flex flex-col h-full">
                            <div className="mb-6 h-60 overflow-hidden rounded-lg">
                                <img 
                                    src={benefit.image} 
                                    alt={benefit.title}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </div>
                            <h3 className="text-3xl font-bold mb-4">{benefit.title}</h3>
                            <p className="text-gray-700 text-base leading-relaxed">{benefit.description}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="flex justify-end items-center gap-4 mt-8">
                <button 
                    onClick={handlePrev}
                    className="flex items-center justify-center w-12 h-12 rounded-full border border-purple-200 text-purple-500 hover:bg-purple-50 transition-colors cursor-pointer"
                    aria-label="Previous slide"
                >
                    <ArrowLeft />
                </button>
                <button 
                    onClick={handleNext}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-500 text-white hover:bg-purple-600 transition-colors"
                    aria-label="Next slide"
                >
                    <ArrowRight />
                </button>
            </div>
        </section>
    );
}