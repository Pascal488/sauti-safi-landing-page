import { TabContainer, TabPanelProp } from "./Tabs";
import LaptopImage  from "../assets/LaptopImage.svg"
import InteractiveFeatureCards from "./InteractiveFeatureCard";
import FeaturesCardMobile from "./FeatureCardMobile";




const tabs: TabPanelProp[] = [
    { name: "Transcribe", identifier: "transcribe" },
    { name: "Documentation", identifier: "documentation" },
    { name: "Suggestions", identifier: "suggestions" },
    { name: "Notes", identifier: "notes" },
    { name: "Medical Codes", identifier: "medicalcodes" },
]

export default function SautiSafiFeatures() {
    return (
        <div className="md:p-10">
            <div className="md:block hidden">
                <InteractiveFeatureCards/>

            </div>
            <div className="block md:hidden">
                <FeaturesCardMobile />
            </div>

            <div className="mt-10 p-16">
                <div className="max-w-[500px]">
                    <h1 className="bg-gradient-to-r from-[#141619] to-[#6D63FF] font-extrabold text-4xl bg-clip-text text-transparent">
                        Streamline documentation and Automate Tasks
                    </h1>
                </div>

                <div className="max-w-[400px]">
                    <p className=" leading-7">Generate clinical documents (sick notes, referral letters, etc) based on your consults, in just a click.</p>
                </div>
                <div className=" w-full text-center h-full flex justify-center p-5">
                    <img src={LaptopImage} alt="" className="self-center" />
                </div>
            </div>
               

            <div className="md:p-16 ">
                <TabContainer panels={tabs} panelClassName="mt-3 pl-10 ">
                        <div>SautiSafi listens, transcribes your consults, then generates precise medical notes in SOAP format for you.</div>
                        <div>3</div>
                        <div>5</div>
                </TabContainer>
            </div>

        </div>
    );
}