
import ResearchTile from './research-tile';

interface ResearchItem {
    type: string;
    date: string;
    title: string;
    description: string;
    collaborators?: string;
}

const researchItems: ResearchItem[] = [
    {
        type: "Product",
        date: "25 March 2025",
        title: "Introducing Voith.ai",
        description: "Voith is an AI intake solution for healthcare. Voith listens to patients, gathers their history, and summarizes the information for you. Physicians can see more patients, enhance care quality, and save time on documentation."
    },
    {
        type: "Research",
        date: "25 March 2025",
        title: "Early methods for studying affective use and emotional well-being on Voith",
        description: "",
        collaborators: "A Voith and ADB Media Lab Research collaboration."
    },
    {
        type: "Publication",
        date: "25 March 2025",
        title: "Introducing Voith.ai",
        description: "Voith is an AI intake solution for healthcare. Voith listens to patients, gathers their history, and summarizes the information for you. Physicians can see more patients, enhance care quality, and save time on documentation."
    },
    {
        type: "Research",
        date: "25 March 2025",
        title: "Early methods for studying affective use and emotional well-being on Voith",
        description: "",
        collaborators: "A Voith and ADB Media Lab Research collaboration."
    }
];


export default function Research() {

    return (
        <div className="w-full md:w-3/4">
            <div className="space-y-12">
                {researchItems.map((item, index) => (
                    <ResearchTile
                        key={index}
                        type={item.type}
                        date={item.date}
                        title={item.title}
                        description={item.description}
                        collaborators={item.collaborators} />
                ))}
            </div>
        </div>
    );
}