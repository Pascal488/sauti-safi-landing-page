import { Link } from 'react-router-dom';

import DoctorImage from '../assets/DoctorImage.svg';

export default function HealthcareHero() {
    return (
        <div className="w-full bg-emerald-600 py-16 px-8">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">

                <div className="md:w-1/2">
                    <div className="mb-6">
                        <span className="bg-gradient-to-r from-[#A193E9] to-[#0A9964] text-white px-6 py-2 rounded-full inline-block text-sm font-medium">
                            For Institutions
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        Achieve more<br />in healthcare
                    </h1>

                    <p className="text-white text-lg mb-8 max-w-lg">
                        Focus your clinicians on high-value work with
                        AI-enabled tools that enhance productivity.
                    </p>

                    <div className="mt-8 md:hidden">
                        <Link
                            to="/try-free"
                            className="bg-white text-emerald-600 hover:bg-emerald-50 transition-colors px-8 py-3 rounded-full font-medium inline-block"
                        >
                            Try for free
                        </Link>
                    </div>
                </div>

                <div className="md:w-1/2 flex flex-col items-center">
                    <div className="rounded-2xl overflow-hidden mb-8 w-full max-w-md">
                        <img
                            src={DoctorImage}
                            alt="Doctor with nurse looking at tablet"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="hidden md:block">
                        <Link
                            to="/try-free"
                            className="bg-white text-emerald-600 hover:bg-emerald-50 transition-colors px-8 py-3 rounded-full font-medium inline-block"
                        >
                            Try for free
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}