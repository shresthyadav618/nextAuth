export default function userProfile({params}){



    return(
        <div className="flex  items-center justify-center" style={{height : '100vh'}}>This is the profile page <div className="p-2 bg-orange-500 ml-2 text-black ">{params.id}</div></div>
    )

}