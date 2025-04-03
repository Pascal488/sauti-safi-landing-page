
interface IProps{
    type: string
    date: string
    title: string
    description: string
    collaborators?: string
}


export default function ResearchTile({...item}:IProps) {

    return (
        <div className="border-b pb-12 last:border-b-0">
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/3 mb-4 md:mb-0">
                    <div className="text-gray-800 font-medium">{item.type}</div>
                    <div className="text-gray-500 text-sm mt-1">{item.date}</div>
                </div>

                <div className="w-full md:w-2/3">
                    <h2 className="text-xl font-semibold mb-4">{item.title}</h2>
                    {item.description && (
                        <p className="text-gray-600 mb-4">{item.description}</p>
                    )}
                    {item.collaborators && (
                        <p className="text-gray-600">{item.collaborators}</p>
                    )}
                </div>
            </div>
        </div>
    )
}