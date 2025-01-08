import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { firebaseAuth, firebaseDb } from "@/firebaseConfig"
import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { redirect, useNavigate } from "react-router"

function MyListings() {
    interface Listing {
        id: string
        heading: string
        companyName: string
        description: string
        compensation: string
        equity: string
        applications: number
      }

      const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(true)


    const [listings, setListings] = useState<Listing[]>([])


    useEffect(()=>{

        firebaseAuth.onAuthStateChanged(async(user)=>{
            if(user){

                const userId = user?.uid;
                const listingDocRef = collection(firebaseDb,'listings');
                const q = query(listingDocRef, where("userId",'==',userId))

                const querySnapshot = await getDocs(q);
                
                if(!querySnapshot.empty){
                    const currentListing:Listing[] = []
                    querySnapshot.forEach((doc)=>{
                        console.log(doc.id)
                        console.log(doc.data())
                        currentListing.push({
                            id:doc.id,
                            heading:doc.data().heading,
                            companyName:doc.data().companyName,
                            description:doc.data().description,
                            compensation: doc.data().compensation,
                            equity: doc.data().equity,
                            applications: doc.data().applications.length
                        })
                    })
                    setListings(currentListing)
                    setLoading(false)
                }
                else {
                    console.log("No listings made")
                }

            }
            else {
                redirect('/auth')
            }
        })

        // setListings([ls])
    },[])
    
    async function submitHandler(e:React.FormEvent<HTMLFormElement>, listing:Listing){
        e.preventDefault();

        const listingDocRef = doc(firebaseDb,'listings',listing.id);
        updateDoc(listingDocRef, {
            heading:listing.heading,
            companyName:listing.companyName,
            description:listing.description,
            compensation: listing.compensation,
            equity: listing.equity,
        })
        .then((response)=>{
            console.log("Edit successfull: ",response)
        })
        .catch((err)=>{
            console.log("Error occured: ",err)
        })


    }

    async function handleDelete(listingId:string){

        // const listingDocRef = doc(firebaseDb,'listings',listingId);
        deleteDoc(doc(firebaseDb,'listings',listingId))
        .then((response)=>{
            console.log(response)
        })
        .catch((err)=>{
            console.log(err)
        })
        setListings((currlist)=>
            currlist.filter((currLs)=> currLs.id!=listingId)
        )

    }

    function viewHandler(listing:Listing){
        console.log("View applications clicked")
        // localStorage.setItem('myCurrentListing',listing.id)
        navigate(`/currentlisting/${listing.id}`)
    }

    
    if(loading){
        return (
            <div className=" w-full h-full flex flex-col justify-center text-center">
                ...Loading
            </div>
        )
    }


  return (
    <div className=" w-full h-full flex flex-col px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Listings</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing) => (
          <Card key={listing.id}>
            <CardHeader>
              <CardTitle>{listing.heading}</CardTitle>
              <CardDescription>{listing.companyName}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">Compensation: {listing.compensation}</p>
              <p className="text-sm text-gray-600 mb-2">Equity: {listing.equity}</p>
              <p className="text-sm text-gray-600">Applications: {listing.applications}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" onClick={() => console.log("edit clicked")}>Edit</Button>
                </DialogTrigger>
                <DialogContent>
                  <form onSubmit={(e)=>submitHandler(e, listing)} >
                    <DialogHeader>
                      <DialogTitle>Edit Listing</DialogTitle>
                      <DialogDescription>Make changes to your listing here. Click save when you're done.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="heading" className="text-right">Heading</Label>
                        <Input
                          id="heading"
                          value={listing.heading}
                          onChange={(e)=>setListings((currListing)=> 
                            currListing.map((currls)=> {
                                if(currls.id==listing.id){
                                    currls.heading = e.target.value
                                }
                                return currls
                            })
                        )}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="companyName" className="text-right">Company</Label>
                        <Input
                          id="companyName"
                          value={listing.companyName}
                          onChange={(e)=>setListings((currListing)=> 
                            currListing.map((currls)=> {
                                if(currls.id==listing.id){
                                    currls.companyName = e.target.value
                                }
                                return currls
                            })
                        )}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">Description</Label>
                        <Textarea
                          id="description"
                          value={listing.description}
                          onChange={(e)=>setListings((currListing)=> 
                            currListing.map((currls)=> {
                                if(currls.id==listing.id){
                                    currls.description = e.target.value
                                }
                                return currls
                            })
                        )}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="compensation" className="text-right">Compensation</Label>
                        <Input
                          id="compensation"
                          value={listing.compensation}
                          onChange={(e)=>setListings((currListing)=> 
                            currListing.map((currls)=> {
                                if(currls.id==listing.id){
                                    currls.compensation = e.target.value
                                }
                                return currls
                            })
                        )}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="equity" className="text-right">Equity</Label>
                        <Input
                          id="equity"
                          value={listing.equity}
                          onChange={(e)=>setListings((currListing)=> 
                            currListing.map((currls)=> {
                                if(currls.id==listing.id){
                                    currls.equity = e.target.value
                                }
                                return currls
                            })
                        )}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">
                            Save changes
                        </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              <Button variant="destructive" 
              onClick={() => handleDelete(listing.id)}
              >
                Delete
              </Button>
              <Button 
              variant="default" 
              onClick={() => viewHandler(listing)}
              >
                View Applications
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default MyListings