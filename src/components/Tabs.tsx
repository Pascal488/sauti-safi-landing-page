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
    const [_, setCurrentWidth] = useState<number>(0);

    const firstChilRef = useRef<HTMLDivElement | null>(null);
    

    const getDefaultIndex = (): number => {
        const index = props.panels.findIndex((el) => el.identifier === searchParams.get("tab"));

        return index > -1 ? index : 0
    }

    const changeIndex = (index: number) => {
        const value = index < props.panels.length ? props.panels[index] : props.panels[0];
        setSearchParams({ tab: value.identifier });
    }

    const handleContainerClick = (event: any) => {
        setCurrentWidth(event.target?.offsetWidth)
    }

    useEffect(() => {
        if(firstChilRef && firstChilRef.current) {
            setCurrentWidth(firstChilRef.current.getBoundingClientRect().width);
        }
    }, [])

    useEffect(() => {
        setTabIndex(getDefaultIndex());
    }, [search])

    return (
        <TabGroup 
            defaultIndex={getDefaultIndex()}
            selectedIndex={tabIndex}
            onChange={(index) => changeIndex(index)}
        >
            <TabList className="flex flex-wrap">
                <div 
                    className="flex z-10 gap-1  max-w-max p-1 "
                    onClick={handleContainerClick}
                >
                    {
                        props.panels.map((item, index) =>
                            <Tab 
                                as="div" 
                                key={index}
                                className={ ({selected}) => {
                                    return `relative z-50 flex justify-center items-center cursor-pointer focus:outline-none
                                    text-2xl text-center font-medium px-10 py-1.5 
                                    transition-transform duration-300 ease-linear 
                                    ${selected ? 'text-[#0A9964] font-bold text-2xl border-b-2 border-[#0A9964]' : 'text-[#4D4D4D]'}`
                                }}
                                onClick={() => {}}
                                ref={firstChilRef}
                            >
                                <span>{item.name}</span>
                            </Tab>
                        )
                    }
                </div>
            </TabList>
            <TabPanels className={twMerge(
                props.panelClassName 
            )}>
                {
                    Children.map(props.children, (child, index) => (
                        <TabPanel key={index}>{child}</TabPanel>
                    ))
                }
            </TabPanels>
        </TabGroup>
    )
}