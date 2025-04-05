import InteractiveFeatureCards from "../../components/InteractiveFeatureCard";
import FeaturesCardMobile from "../../components/FeatureCardMobile";
import FeaturesLayout from "../features/featuresLayout";

export default function VoithAIFeatures() {
    return (
        <div className="md:p-10">
            <div className="md:block hidden">
                <InteractiveFeatureCards/>
            </div>
            <div className="block md:hidden">
                <FeaturesCardMobile />
            </div>

            <div className="p-16">
                <div className="max-w-[500px]">
                    <h1 className="bg-gradient-to-r from-[#141619] to-[#6D63FF] font-extrabold text-4xl bg-clip-text text-transparent">
                        Streamline documentation and Automate Tasks
                    </h1>
                </div>

                <div className="max-w-[400px]">
                    <p className="leading-7">Generate clinical documents (sick notes, referral letters, etc) based on your consults, in just a click.</p>
                </div>
            </div>
               
            <div className="md:p-10">
                <FeaturesLayout />
            </div>
        </div>
    );
}