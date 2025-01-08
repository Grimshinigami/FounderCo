import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
// import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { doc, getDoc } from "firebase/firestore"
import { firebaseDb } from "@/firebaseConfig"


function CurrentListing() {

    interface ListingL {
        id:string,
        heading: string,
        companyName: string,
        description: string,
        compensation: string,
        equity: string,
        applications: number
      }
    
    const [listing, setListings] = useState<ListingL>({
        id:'',
        heading: '',
        companyName: '',
        description: '',
        compensation: '',
        equity: '',
        applications: 0
    })
    const [loading, setLoading] = useState<boolean>(true)
    

    async function getListings(){
        // const docRef = doc(firebaseDb,'listings')
        const listingId = JSON.stringify(localStorage.getItem('myCurrentListing')||"")
        console.log(listingId)
        const docRef = doc(firebaseDb,'listings',listingId)
        const docSnap = await getDoc(docRef)

        console.log(docSnap.data())
        // console.log(allListings)
        setListings({
            id:docSnap.id,
            heading: docSnap.data().heading,
            companyName: docSnap.data().companyName,
            description: docSnap.data().description,
            compensation: docSnap.data().compensation,
            equity: docSnap.data().equity,
            applications: docSnap.data().applications
        })
        setLoading(false)

    }

    useEffect(() => {
        
        getListings();

    }, [])
        

    if(loading){
        return (
            <div>
                ...Loading
            </div>
        )
    }



  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        // onClick={() => router.back()} 
        className="mb-4"
        variant="outline"
      >
        &larr; Back to My Listings
      </Button>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">{listing.heading}</CardTitle>
          <CardDescription>{listing.companyName}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Description</h3>
              <p>{listing.description}</p>
            </div>
            <div>
              <h3 className="font-semibold">Founders</h3>
              {/* <ul>
                {listing.founders.map((founder, index) => (
                  <li key={index}>{founder.name} - {founder.role}</li>
                ))}
              </ul> */}
            </div>
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold">Compensation</h3>
                <p>{listing.compensation}</p>
              </div>
              <div>
                <h3 className="font-semibold">Equity</h3>
                <p>{listing.equity}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Applications</h2>
      <ScrollArea className="h-[600px] rounded-md border p-4">
        {/* {listing.applications.map((application) => (
          <div key={application.id} className="mb-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  <Link href={`/profile/${application.id}`} className="text-indigo-600 hover:underline">
                    {application.applicantName}
                  </Link>
                </CardTitle>
                <CardDescription>
                  <a href={application.githubProfile} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:underline">
                    GitHub Profile
                  </a>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{application.description}</p>
              </CardContent>
            </Card>
            <Separator className="my-4" />
          </div>
        ))} */}
      </ScrollArea>
    </div>
  )
}

export default CurrentListing