import { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";


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

const initialFeatures = [
    {
        id: 1,
        icon: <ConversationalIcon />,
        title: "Conversational",
        description: "No rigid forms needed. Chats with patients transcribed in natural language with empathy.",
        bgClass: "bg-gradient-to-br from-purple-400 to-fuchsia-500",
        rotation: -15,
        translateX: -20, 
        translateY: -100, 
        zIndex: 4
    },
    {
        id: 2,
        icon: <ComprehensiveIcon />,
        title: "Comprehensive",
        description: "Complete medical histories and documentation that capture everything important with no detail missed.",
        bgClass: "bg-slate-600",
        rotation: 8, 
        translateX: 30, 
        translateY: -200, 
        zIndex: 3
    },
    {
        id: 3,
        icon: <AdaptiveIcon />,
        title: "Adaptive",
        description: "Learns from your preferences and adapts to your specific medical workflow requirements.",
        bgClass: "bg-slate-600",
        rotation: -5, 
        translateX: -15, 
        translateY: -150,
        zIndex: 2
    },
    {
        id: 4,
        icon: <CustomizableIcon />,
        title: "Customizable",
        description: "Tailor the system to your specialty needs with customizable templates and workflows.",
        bgClass: "bg-slate-600",
        rotation: 12, 
        translateX: 10, 
        translateY: -180, 
        zIndex: 1
    }
];

export default function InteractiveFeatureCards() {
    const [features, setFeatures] = useState(initialFeatures);
    const [selectedCardId, setSelectedCardId] = useState(null);
    const [draggedCardId, setDraggedCardId] = useState(null);
    const [dragStartPosition, setDragStartPosition] = useState(null);
    const [isAnimating, setIsAnimating] = useState(true);
    const containerRef = useRef(null);
    const controls = [useAnimation(), useAnimation(), useAnimation(), useAnimation()];

    useEffect(() => {
        const animateCards = async () => {
            setIsAnimating(true);

            for (let i = 0; i < features.length; i++) {
                const randomDuration = 0.8 + Math.random() * 0.7; 
                const randomDelay = 0.1 + Math.random() * 0.4
                const randomBounce = 0.3 + Math.random() * 0.4; 


                const finalX = (Math.random() * 40) - 20; 
                const finalRotation = features[i].rotation;

                setTimeout(() => {
                    controls[i].start({
                        y: 0,
                        x: finalX,
                        rotate: finalRotation,
                        transition: {
                            type: "spring",
                            duration: randomDuration,
                            bounce: randomBounce
                        }
                    });
                }, randomDelay * 1000);
            }


            setTimeout(() => {
                setIsAnimating(false);
            }, 2000); 
        };

        animateCards();
    }, []);

    const handleDoubleClick = (id:any) => {
        if (isAnimating) return;

        setFeatures(currentFeatures =>
            currentFeatures.map(feature =>
                feature.id === id ?
                    { ...feature, rotation: feature.rotation + (Math.random() * 40 - 20) } :
                    feature
            )
        );
    };

    const handleSelect = (id:any) => {
        if (isAnimating) return;

        if (selectedCardId === id) {
            setSelectedCardId(null);
        } else {
            setSelectedCardId(id);
        }
    };

    const handleDragStart = (e:any, id:any, index:any) => {
        if (isAnimating) return;

        setDraggedCardId(id);
        setDragStartPosition(index);
        e.dataTransfer.effectAllowed = "move";
    };

    const handleDragOver = (e:any) => {
        e.preventDefault();
        if (isAnimating) return;

        e.dataTransfer.dropEffect = "move";
    };

    const handleDrop = (e:any, dropIndex:any) => {
        e.preventDefault();
        if (isAnimating) return;
        if (draggedCardId === null || dragStartPosition === null) return;

        const newFeatures = [...features];
        const draggedItem = newFeatures[dragStartPosition];

        newFeatures.splice(dragStartPosition, 1);

        newFeatures.splice(dropIndex, 0, draggedItem);

        setFeatures(newFeatures);
        setDraggedCardId(null);
        setDragStartPosition(null);
    };

    const handleKeyDown = (e:any, id:any, index:any) => {
        if (isAnimating) return;
        if (selectedCardId !== id) return;

        if (e.key === 'r') {
            handleDoubleClick(id);
        }

        if (e.key === 'ArrowLeft' && index > 0) {
            const newFeatures = [...features];
            [newFeatures[index], newFeatures[index - 1]] = [newFeatures[index - 1], newFeatures[index]];
            setFeatures(newFeatures);
        }

        if (e.key === 'ArrowRight' && index < features.length - 1) {
            const newFeatures = [...features];
            [newFeatures[index], newFeatures[index + 1]] = [newFeatures[index + 1], newFeatures[index]];
            setFeatures(newFeatures);
        }
    };

    return (
        <div className="w-full bg-slate-900 p-10 rounded-3xl overflow-hidden">
            <div className="mb-10">
                <h2 className="text-4xl font-bold text-white mb-4">SautiSafi AI</h2>
                <p className="text-white text-lg max-w-2xl">
                    SautiSafi automates patient history-taking, charting, and documentation, helping you deliver high-quality care faster.
                </p>
            </div>

            <div
                ref={containerRef}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative min-h-[320px]"
            >
                {features.map((feature, index) => (
                    <motion.div
                        key={feature.id}
                        className={`
                        ${feature.bgClass} rounded-xl p-6 min-h-[280px] flex flex-col
                        ${!isAnimating ? 'cursor-move' : 'cursor-default'}
                        ${selectedCardId === feature.id ? 'ring-4 ring-white' : ''}
                        transition-shadow duration-300 hover:shadow-lg
                        absolute lg:relative
                        `}
                        style={{
                            zIndex: draggedCardId === feature.id ? 10 : feature.zIndex,
                            position: 'absolute',
                            width: 'calc(25% - 12px)',
                            left: `calc(${index * 25}% + 3px)`,
                            transform: `rotate(${feature.rotation}deg) translateX(${feature.translateX}px)`,
                        }}
                        animate={controls[index]}
                        initial={{
                            y: feature.translateY,
                            x: feature.translateX,
                            rotate: feature.rotation,
                        }}
                        onClick={() => handleSelect(feature.id)}
                        onDoubleClick={() => handleDoubleClick(feature.id)}
                        draggable={!isAnimating}
                        onDragStart={(e) => handleDragStart(e, feature.id, index)}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, feature.id, index)}
                        tabIndex={0}
                        aria-selected={selectedCardId === feature.id}
                        role="option"
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
                    </motion.div>
                ))}
            </div>
        </div>
    );
}