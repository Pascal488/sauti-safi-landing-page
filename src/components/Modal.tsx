import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { Fragment } from "react";
import { twMerge } from "tailwind-merge";


interface IProps {
    isOpen: boolean
    title?: string
    subtitle?: string
    size: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
    children: React.ReactNode
    onClose: (value: boolean) => void
}

export default function(props: IProps) {

    const computedSize = () => {
        switch(props.size) {
            case "xs":
                return "w-full md:max-w-xs xl:max-w-sm"
            case "sm":
                return "w-full md:max-w-md xl:max-w-lg"
            case "md":
                return "w-full md:max-w-xl xl:max-w-2xl"
            case "lg":
                return "w-full md:max-w-2xl xl:max-w-3xl"
            case "xl":
                return "w-full max-w-3xl xl:max-w-5xl"
            case "2xl":
                return "w-full max-w-4xl xl:max-w-7xl"
            default:
                return "w-full max-w-md"
        }
    }

    return (
        <Transition appear show={props.isOpen} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 z-50" onClose={() => props.onClose(false)}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="absolute inset-0 bg-zinc-800/10 backdrop-blur-sm" />
                </TransitionChild>

                <div className="absolute inset-0">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-out duration-300"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-90 scale-95"
                        >
                            <DialogPanel 
                                className={twMerge(
                                    "transform rounded-xl bg-white border border-zinc-200 text-left align-middle shadow-sm transition-all",
                                    computedSize()
                                )}
                            >
                                <div className="m-4">
                                    {
                                        props.title && (
                                            <div className="mb-6 px-2">
                                                <h2 className="text-zinc-800 font-semibold">
                                                    { props.title }
                                                </h2>
                                                <p className="text-xs text-zinc-600">
                                                    {props.subtitle}
                                                </p>
                                            </div>
                                        )
                                    }
                                    
                                    <div className="rounded-b-md max-h-[80vh] px-2 overflow-y-auto">
                                        {props.children}
                                    </div>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>

            </Dialog>
        </Transition>
    )
}