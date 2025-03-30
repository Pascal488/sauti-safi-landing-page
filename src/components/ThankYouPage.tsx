import { useLocation, Link } from 'react-router-dom';

interface LocationState {
    name?: string;
    email?: string;
}

export default function ThankYouPage() {
    const location = useLocation();
    const state = location.state as LocationState || {};
    const { name, email } = state;

    return (
        <div className="w-full py-16 px-4 md:px-8 bg-white">
            <div className="max-w-3xl mx-auto text-center">
                <div className="mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>

                <h1 className="text-4xl font-bold text-slate-800 mb-4">
                    Thank You for Joining Us!
                </h1>

                {name && (
                    <p className="text-lg text-gray-700 mb-6">
                        Hello {name}, we've received your information{email ? ` at ${email}` : ''}.
                        A member of our team will be in touch with you shortly.
                    </p>
                )}

                {!name && (
                    <p className="text-lg text-gray-700 mb-6">
                        We've received your information. A member of our team will be in touch with you shortly.
                    </p>
                )}

                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                    <Link
                        to="/"
                        className="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                    >
                        Return to Home
                    </Link>

                    <Link
                        to="/resources"
                        className="px-6 py-3 border border-indigo-500 text-indigo-500 rounded-lg hover:bg-indigo-50 transition-colors"
                    >
                        Explore Resources
                    </Link>
                </div>
            </div>
        </div>
    );
}