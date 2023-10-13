export default function profilePage({params} : any) {
    return (
        <>
            <div className="flex justify-center items-center min-h-screen w-screen">
                <h1 className="p-4 text-center text-2xl font-bold">Profile Page {params.id}</h1>
            </div>
        </>
    )
}