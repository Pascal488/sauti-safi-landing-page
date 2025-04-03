import { Outlet, RouteObject } from "react-router-dom";
import Research from "./research";
import ResearchLayout from "./research-layout";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <ResearchLayout />,
        children:[
            {
                path:"/research",
                element:<Outlet/>,
                children:[
                    {
                        index: true,
                        element: <Research />
                    },
                    {
                        path: "publication",
                        element: <div>Hello</div>
                    },
                    // {
                    //     path: "conclusion",
                    //     element: <ResearchConclusions />
                    // },
                    // {
                    //     path: "milestones",
                    //     element: <ResearchMilestones />
                    // }
                ]
            }
        ]
    }
]

export default routes;