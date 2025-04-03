
import { Link, Outlet } from 'react-router-dom';



const categories = ["All", "Publication", "Conclusion", "Milestones"];

export default function ResearchLayout() {

    return (
        <div className="max-w-screen-2xl mx-auto p-5">
            <h1 className="text-4xl font-bold mb-6">Research</h1>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/4">
                    <ul className="space-y-4">
                        {categories.map((category, index) => (
                            <li key={index}>
                                <Link
                                    to={`/research/${category.toLowerCase() === 'all' ? '' : category.toLowerCase()}`}
                                    className={`text-base ${index === 0 ? 'text-green-600' : 'text-gray-600'} hover:text-green-600`}
                                >
                                    {category}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <Outlet/>
            </div>
        </div>
    );
}