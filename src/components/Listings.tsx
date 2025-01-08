import { useEffect, useState } from "react"
import ListingShort from "./ListingShort"
import { collection, doc, getDocs } from "firebase/firestore"
import { firebaseDb } from "@/firebaseConfig"

 

function Listings() {

  interface ListingL {
    id:string,
    heading: string
    companyName: string
    description: string
    compensation: string
    equity: string
    applications: number
  }

  const [Listings, setListings] = useState<ListingL[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  

    async function getListings(){
      // const docRef = doc(firebaseDb,'listings')
      const docSnap = await getDocs(collection(firebaseDb,'listings'));

      const allListings:ListingL[] = []
      docSnap.forEach((doc)=>{
        allListings.push({...doc.data(),id:doc.id})
      })
      // console.log(allListings)
      setListings(allListings)
      setLoading(false)

    }

    useEffect(() => {
      
      getListings();

    }, [])
    

    

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 w-full h-full">
      <h1 className="text-3xl font-bold mb-8">Listings</h1>
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search listings..."
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
      </div>
      {loading && 
        <div className=" w-full border-2 border-black text-center h-full flex justify-center items-center text-3xl">
          ...Loading
        </div>}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        
        
        {!loading && Listings.map((listing,ind) => (
          <ListingShort key={listing.id} lId={listing.id} title={listing.heading} compensation={listing.compensation} equity={listing.equity}/>
        ))}
      </div>
    </div>
  )
}

export default Listings