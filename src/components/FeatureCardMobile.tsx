
const ConversationalIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7.5 12C7.5 14.4853 9.51472 16.5 12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5 9.51472 14.4853 7.5 12 7.5C9.51472 7.5 7.5 9.51472 7.5 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 12L15 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ComprehensiveIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 12H8.01M12 12H12.01M16 12H16.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const AdaptiveIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm0 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14.5 7.5a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0zm0 0a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4.5 16.5a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0zm0 0a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const CustomizableIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L14.8 8.5L22 9.4L17 14.4L18.5 22L12 18.5L5.5 22L7 14.4L2 9.4L9.2 8.5L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);


const features = [
    {
        id: 1,
        icon: <ConversationalIcon />,
        title: "Conversational",
        description: "No rigid forms needed. Chats with patients transcribed in natural language with empathy.",
        bgClass: "bg-gradient-to-br from-purple-400 to-fuchsia-500"
    },
    {
        id: 2,
        icon: <ComprehensiveIcon />,
        title: "Comprehensive",
        description: "",
        bgClass: "bg-slate-600"
    },
    {
        id: 3,
        icon: <AdaptiveIcon />,
        title: "Adaptive",
        description: "",
        bgClass: "bg-slate-600"
    },
    {
        id: 4,
        icon: <CustomizableIcon />,
        title: "Customizable",
        description: "",
        bgClass: "bg-slate-600"
    }
];

export default function FeaturesCardMobile() {
    return (
        <div className="w-full bg-slate-900 p-8 rounded-3xl">
            <div className="mb-8">
                <h2 className="text-4xl font-bold text-white mb-4">SautiSafi AI</h2>
                <p className="text-white text-lg max-w-2xl">
                    SautiSafi automates patient history-taking, charting, and documentation, helping you deliver high-quality care faster.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {features.map((feature) => (
                    <div
                        key={feature.id}
                        className={`${feature.bgClass} rounded-xl p-6 min-h-[280px] flex flex-col`}
                    >
                        <div className="text-white mb-auto">
                            {feature.icon}
                        </div>
                        <div className="mt-auto">
                            <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                            {feature.description && (
                                <p className="text-white text-sm opacity-90">{feature.description}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}