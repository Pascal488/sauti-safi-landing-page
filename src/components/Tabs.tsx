import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Children, ReactNode, useEffect, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export type TabPanelProp = {
    identifier: string
    name: string
    icon?: ReactNode
}

export type IProps = {
    panels: TabPanelProp[]
    panelClassName?: string
    children: ReactNode
}

export const TabContainer = (props: IProps) => {
    const { search } = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [tabIndex, setTabIndex] = useState<number>(0);
    const [width, setCurrentWidth] = useState<number>(0);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    const firstChildRef = useRef<HTMLDivElement | null>(null);
    const tabListRef = useRef<HTMLDivElement | null>(null);

    const getDefaultIndex = (): number => {
        const index = props.panels.findIndex((el) => el.identifier === searchParams.get("tab"));
        return index > -1 ? index : 0;
    }

    const changeIndex = (index: number) => {
        const value = index < props.panels.length ? props.panels[index] : props.panels[0];
        setSearchParams({ tab: value.identifier });
    }

    const handleContainerClick = (event: any) => {
        setCurrentWidth(event.target?.offsetWidth);
    }
    console.log(width,isMobile)
    const handleResize = () => {
        const mobile = window.innerWidth < 768;
        setIsMobile(mobile);
        
        if (firstChildRef && firstChildRef.current) {
            setCurrentWidth(firstChildRef.current.getBoundingClientRect().width);
        }
    };

    useEffect(() => {
        handleResize();
        
        window.addEventListener('resize', handleResize);
        
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (firstChildRef && firstChildRef.current) {
            setCurrentWidth(firstChildRef.current.getBoundingClientRect().width);
        }
    }, []);

    useEffect(() => {
        setTabIndex(getDefaultIndex());
    }, [search]);

    return (
        <TabGroup 
            defaultIndex={getDefaultIndex()}
            selectedIndex={tabIndex}
            onChange={(index) => changeIndex(index)}
        >
            <TabList className="flex w-full overflow-x-auto scrollbar-hide" ref={tabListRef}>
                <div 
                    className="flex z-10 gap-1 p-1 w-full md:max-w-max"
                    onClick={handleContainerClick}
                >
                    {props.panels.map((item, index) => (
                        <Tab 
                            as="div" 
                            key={index}
                            className={({selected}) => {
                                return `relative z-50 flex justify-center items-center cursor-pointer focus:outline-none
                                text-base md:text-lg lg:text-2xl text-center font-medium 
                                px-3 sm:px-5 md:px-8 lg:px-10 py-1.5 
                                whitespace-nowrap flex-shrink-0
                                transition-all duration-300 ease-linear 
                                ${selected ? 'text-[#0A9964] font-bold border-b-2 border-[#0A9964]' : 'text-[#4D4D4D]'}`
                            }}
                            onClick={() => {}}
                            ref={index === 0 ? firstChildRef : null}
                        >
                            {item.icon && (
                                <span className="mr-1 md:mr-2">{item.icon}</span>
                            )}
                            <span>{item.name}</span>
                        </Tab>
                    ))}
                </div>
            </TabList>
            <TabPanels className={twMerge(
                "mt-2 md:mt-4",
                props.panelClassName 
            )}>
                {Children.map(props.children, (child, index) => (
                    <TabPanel key={index}>{child}</TabPanel>
                ))}
            </TabPanels>
        </TabGroup>
    );
};

