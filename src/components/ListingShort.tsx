import { useNavigate } from "react-router"

function ListingShort({lId,title,compensation,equity=""}:
  {lId:string,title:string,compensation:string,equity:string}
) {

  const navigate = useNavigate();

  function handleDetails(){
    // localStorage.setItem('currentListing',lId)
    navigate(`/currenListing/${lId}`)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        {/* <p className="text-gray-600 mb-4">Field: {field}</p> */}
        <p className="text-gray-600 mb-2">Compensation: {compensation}</p>
        <p className="text-gray-600 mb-4">Equity: {equity}</p>
        <button onClick={()=> handleDetails()} className="text-indigo-600 hover:underline w-full outline-gray-300 border-2 border-gray-300">
            View Details
        </button>
    </div>
  )
}

export default ListingShort