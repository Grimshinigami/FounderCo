import { useEffect, useState } from "react"
import { firebaseAuth, firebaseDb } from "../firebaseConfig"
import { redirect, useNavigate } from "react-router"
import { addDoc, collection, doc, getDoc } from "firebase/firestore"

function CreateListing() {

    const [isFounder, setIsFounder] = useState<boolean> (false)
    // const [heading, setHeading] = useState<string> ()
    const navigate = useNavigate();

    useEffect(() => {
      
        firebaseAuth.onAuthStateChanged(async(user)=> {
            if(user){

                const userId = user?.uid;
                const userDocRef = doc(firebaseDb,'users',userId || "");
                const userDocSnap = await getDoc(userDocRef)
        
                if(userDocSnap.exists()){
                    console.log(userDocSnap.data())  
                    if(userDocSnap.data().founder){
                        setIsFounder(true)
                    }      
                }
                else {
                console.log("No such document")
                }

            }
            else {
                redirect('/auth')
            }
        })


    }, [])
    

    const [formData, setFormData] = useState({
        heading: '',
        companyName: '',
        description: '',
        compensation: '',
        equity: '',
        founders: [{ name: '', role: '' }]
      })
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, index?: number) => {
    if (e.target.name === 'founderName' || e.target.name === 'founderRole') {
        const newFounders = [...formData.founders]
        newFounders[index as number][e.target.name === 'founderName' ? 'name' : 'role'] = e.target.value
        setFormData({ ...formData, founders: newFounders })
    } else {
            setFormData({ ...formData, [e.target.name]: e.target.value })
        }
    }


    async function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        // console.log(formData)

        firebaseAuth.onAuthStateChanged(async(user)=>{

            const userId = user?.uid;
            await addDoc(collection(firebaseDb,'listings'),{
                userId:userId,
                heading: formData.heading,
                companyName: formData.companyName,
                description: formData.description,
                compensation: formData.compensation,
                equity: formData.equity,
                founders: formData.founders,
                applications: []
            })

            console.log("Listing created successfully")
            navigate('/mylistings')

        })

    }



    if(!isFounder){
        return (
            <div className=" w-full flex flex-col justify-center text-center text-2xl">
                You need to be a Founder to create listing
            </div>
        )
    }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Create Listing</h1>
      <form onSubmit={(e)=>handleSubmit(e)} className="space-y-4">
        <div>
          <label htmlFor="heading" className="block mb-1 font-medium">
            Heading
          </label>
          <input
            type="text"
            id="heading"
            name="heading"
            value={formData.heading}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            required
          />
        </div>
        <div>
          <label htmlFor="companyName" className="block mb-1 font-medium">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1 font-medium">
            About the Listing / Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            rows={4}
            required
          ></textarea>
        </div>
        <div>
          <label className="block mb-1 font-medium">Founders</label>
          {formData.founders.map((founder, index) => (
            <div key={index} className="flex space-x-4 mb-2">
              <input
                type="text"
                name="founderName"
                value={founder.name}
                onChange={(e) => handleChange(e, index)}
                placeholder="Name"
                className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                required
              />
              <input
                type="text"
                name="founderRole"
                value={founder.role}
                onChange={(e) => handleChange(e, index)}
                placeholder="Role"
                className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => setFormData({ ...formData, founders: [...formData.founders, { name: '', role: '' }] })}
            className="mt-2 text-indigo-600 hover:underline"
          >
            Add Founder
          </button>
        </div>
        <div>
          <label htmlFor="compensation" className="block mb-1 font-medium">
            Compensation
          </label>
          <input
            type="text"
            id="compensation"
            name="compensation"
            value={formData.compensation}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            required
          />
        </div>
        <div>
          <label htmlFor="equity" className="block mb-1 font-medium">
            Equity
          </label>
          <input
            type="text"
            id="equity"
            name="equity"
            value={formData.equity}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
        >
          Create Listing
        </button>
      </form>
    </div>
  )
}

export default CreateListing