import { useStrapiData } from "../contexts/StrapiContext";

// Fallback data
const fallbackFeatures = [
    {
        id: 1,
        number: "1",
        title: "Safety",
        description: "At VoithAI, we have commitments to ensure Trustworthy AI and are building industry-leading supporting technology."
    },
    {
        id: 2,
        number: "2",
        title: "Security",
        description: "Establish Zero Trust access controls, prevent identity attacks, and manage access to resources."
    },
    {
        id: 3,
        number: "3",
        title: "Privacy",
        description: "We are committed to keeping your data private, with transparent policies and rigorous protections with on premise hosting."
    }
];

export default function IntegrityTimeline() {
    const { timeline, loading, error } = useStrapiData();
    
    // Use data from Strapi if available, otherwise use fallback
    const features = timeline?.data?.length
        ? timeline.data.map((item, index) => ({
            id: item.id,
            number: item.attributes.number || (index + 1).toString(),
            title: item.attributes.title,
            description: item.attributes.description
          }))
        : fallbackFeatures;
        
    // Show loading state (could be a skeleton)
    if (loading) {
        return <div className="flex justify-center items-center h-[60vh]">Loading timeline...</div>;
    }

    // If there's an error, still render with fallback data
    if (error) {
        console.error("Error loading timeline data:", error);
        // Continue with fallback data
    }
    
    return (
        <div className="w-full px-8 py-16">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
             
                <div className="pr-8">
                    <h2 className="text-4xl md:text-5xl font-bold text-indigo-700 mb-6">
                        Intelligence<br />with Integrity
                    </h2>
                    <p className="text-gray-700 text-lg">
                        We are dedicated to helping customers use and build AI that is trustworthy, secure, safe, and private.
                    </p>
                </div>

           
                <div className="relative pl-4">
                    <div className="absolute left-12 top-0 bottom-0 w-[2px] bg-gradient-to-b from-indigo-500 to-fuchsia-500"></div>
                    <div className="space-y-16">
                        {features.map((feature) => (
                            <div key={feature.id} className="flex items-start relative">
                    
                                <div className="absolute left-0 -ml-4 flex items-center justify-center">
                                    <div className="w-24 h-24 rounded-full border-2 bg-white border-transparent bg-gradient-to-br from-indigo-500 to-fuchsia-500 p-[2px]">
                                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                                            <span className="text-3xl font-bold text-indigo-700">{feature.number}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="ml-28">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                                    <p className="text-gray-700">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}