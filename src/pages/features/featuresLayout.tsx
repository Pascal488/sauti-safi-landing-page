import { useState } from 'react';

const featureTabsData = [
    {
        id: "Transcribe",
        title: "Voith listens, transcribes your consults, then generates precise medical notes in SOAP format for you.",
        description: "Voith listens, transcribes your consults, then generates precise medical notes in SOAP format for you.",
        imageSrc: "IMAGEHERE",
        imageAlt: "Medical interface showing transcription"
    },
    {
        id: "Documentation",
        title: "Comprehensive documentation at your fingertips",
        description: "Our AI captures every clinical detail and organizes it into professional documentation that meets regulatory standards while maintaining the human touch in your practice.",
        imageSrc: "IMAGEHERE",
        imageAlt: "Documentation interface"
    },
    {
        id: "Suggestions",
        title: "Smart clinical suggestions and decision support",
        description: "Get intelligent diagnostic and treatment suggestions based on patient history and current presentation, helping you deliver evidence-based care with confidence.",
        imageSrc: "IMAGEHERE",
        imageAlt: "Suggestions interface"
    },
    {
        id: "Notes",
        title: "Efficient clinical note-taking",
        description: "Access your complete patient documentation library anytime, anywhere, securely",
        imageSrc: "IMAGEHERE",
        imageAlt: "Notes interface"
    },
    {
        id: "Medical Codes",
        title: "Automatic medical coding",
        description: "Automatically identify and apply appropriate ICD-10 and CPT codes to maximize reimbursement accuracy and streamline your workflow.",
        imageSrc: "IMAGEHERE",
        imageAlt: "Medical Codes interface"
    },
    {
        id: "AI Assistant",
        title: "Intelligent AI medical assistant",
        description: "Your dedicated medical AI assistant works alongside you, handling documentation while you focus on what matters most—your patients.",
        imageSrc: "IMAGEHERE",
        imageAlt: "AI Assistant interface"
    }
];

const FeatureContent = ({ content }:any) => (
    <div className="w-full md:w-3/4">
        <div className="relative">
            <div className="absolute inset-0 -top-10 -left-10 -right-10 -bottom-5 bg-[#F4F1F8]/50 rounded-full blur-3xl"></div>
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-lg" style={{ border: '1px solid rgba(209, 213, 219, 0.3)' }}>
                <img
                    src={content.imageSrc}
                    alt={content.imageAlt}
                    className="w-full"
                />
            </div>
        </div>
        <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">{content.title}</h2>
            <p className="text-gray-600">{content.description}</p>
        </div>
    </div>
);

export default function FeaturesTabComponent() {
    const [activeTab, setActiveTab] = useState(featureTabsData[0].id);

    const activeContent = featureTabsData.find(tab => tab.id === activeTab);

    return (
        <div className="max-w-screen-2xl mx-auto p-5">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/4">
                    <ul className="space-y-10">
                        {featureTabsData.map((feature) => (
                            <li key={feature.id}>
                                <button
                                    onClick={() => setActiveTab(feature.id)}
                                    className={`cursor-pointer text-xl font-medium ${activeTab === feature.id
                                            ? 'text-[#0A9964]'
                                            : 'text-gray-400'
                                        } hover:text-[#0A9964] transition-colors duration-300`}
                                >
                                    {feature.id}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {activeContent && <FeatureContent content={activeContent} />}
            </div>
        </div>
    );
}