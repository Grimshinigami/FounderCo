import { useEffect, useState } from "react"
import { firebaseAuth, firebaseDb } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

function Profile() {

  const [loading, setLoading] = useState<boolean>(true)
  // const [data, setData] = useState()
  const [fullname, setFullName] = useState<string>('');
  const [profilePic, setProfilePic] = useState<string>('')
  // const [heading, setHeading] = useState<string>('');
  const [desc, setDesc] = useState<string>('')
  const [skills, setSkills] = useState<string[]>([])

  async function getUserInfo () {
    
    firebaseAuth.onAuthStateChanged(async(user)=>{
      console.log(user)

      const userId = user?.uid;
      const userDocRef = doc(firebaseDb,'users',userId || "");
      const userDocSnap = await getDoc(userDocRef)

      if(userDocSnap.exists()){
        console.log(userDocSnap.data())
        // console.log(userDocSnap.data()?.fullname)
        setFullName(userDocSnap.data()?.fullname)
        // console.log("User pic: ",userDocSnap.data()?.pic)
        setProfilePic(userDocSnap.data()?.pic)
        setDesc(userDocSnap.data()?.desc)
        setSkills(userDocSnap.data()?.skills)
        setLoading(false)

      }
      else {
        console.log("No such document")
      }
    })
    
  } 

  useEffect(()=>{
    
    getUserInfo();

  },[])

  if(loading){
    return (
      <div className=" w-full flex flex-col justify-center text-center">
        ...Loading
      </div>
    )
  }


  return (
    <div className="w-full flex flex-col justify-center items-center mx-auto border-2 border-black">
      <h1 className="text-3xl font-bold mb-8">Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow-md md:w-1/2 w-full">
        <div className="flex items-center mb-6">
          {profilePic?<img
            src={profilePic}
            alt="Profile"
            className="w-24 h-24 rounded-full mr-6"
          />:''}
          <div>
            <h2 className="text-2xl font-semibold">{fullname}</h2>
            <p className="text-gray-600">Full Stack Developer</p>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">About</h3>
          <p className="text-gray-600">
            {desc}
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile