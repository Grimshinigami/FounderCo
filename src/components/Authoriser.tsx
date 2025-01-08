import { useEffect, useState } from "react"
import {firebaseAuth, firebaseDb} from '../firebaseConfig'
import {  GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import googleIcon from '../assets/google.svg'
import githubIcon from '../assets/githubIcon.svg'
import { useNavigate } from "react-router"
import { doc, getDoc, setDoc } from "firebase/firestore"

function Authoriser() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(true)
  const [isLogin, setIsLogin] = useState(true)
  // const [email, setEmail] = useState<string>('')
  // const [password, setPassword] = useState<string>('')
  // const [fullName, setFullName] = useState<string>('')
  const [userType, setUserType] = useState<string>('founder')


  async function checkAndCreateUserDocument(){

    const user = firebaseAuth.currentUser;

    if(user){
      const userId = user.uid
      const userDocRef = doc(firebaseDb, 'users',userId);
      const userDocSnap = await getDoc(userDocRef);

      if(userDocSnap.exists()){
        console.log("User document already exists")
      }
      else {
        console.log("Creating new user document...")
        await setDoc(userDocRef, {
          companies: [],
          email: user.email,
          fullname: user.displayName,
          socials: {
            linkedin:"",
            github: "",
          },
          pic: user.photoURL,
          mobile: "",
          founder: userType=='founder'?true:false,
          developer: userType=="developer"?true:false,
          skills: [],
          desc: ""

        });
        console.log("User document created successfully")
      }

    }
    else {
      console.log("No user signed in")
    }

    
  }

  function handleGoogleLogin(){
      if(isLogin){
        const provider = new GoogleAuthProvider();
        signInWithPopup(firebaseAuth, provider)
        .then(async ()=> {
          // console.log(response)
          checkAndCreateUserDocument()
          navigate("/profile")
          
        })
        .catch(async (error)=>{
          console.log(error)
        })

      }
  }

  useEffect(()=>{
    firebaseAuth.onAuthStateChanged(async(user)=>{
      if(user)
          navigate("/profile")
      else
        setLoading(false)
    })
  },[])

  if(loading){
    return (
      <div className=" text-xl flex w-full text-center justify-center">
        ...Loading
      </div>
    )
  }
  
  return (
    <div className=" flex flex-col gap-2 relative -top-20 w-full px-4 md:w-[30%]">
      <h1 className="text-3xl font-bold mb-8 text-center">{isLogin ? 'Login' : 'Sign Up'}</h1>
      <select className=" w-full " name="" id="" value={userType} onChange={(e)=>setUserType(e.target.value)}>
        <option value="founder">Founder</option>
        <option value="developer">Developer</option>
      </select>
      <button
      onClick={()=>handleGoogleLogin()}
      className=" w-full border rounded-md py-2 flex flex-row justify-center gap-2">
        <img src={googleIcon} alt="Google Icon" />
        <p>{isLogin ? 'Login' : 'Sign Up'} with Google</p>
      </button>
      <button
      onClick={()=>handleGoogleLogin()}
      className=" w-full border rounded-md py-2 flex flex-row justify-center gap-2">
        <img src={githubIcon} alt="Google Icon" />
        <p>{isLogin ? 'Login' : 'Sign Up'} with Github</p>
      </button>
      {/* <form className="space-y-4">
        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e)=>setFullName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
        >
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form> */}
      <p className="mt-4 text-center">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-indigo-600 hover:underline"
        >
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </p>
    </div>
  )
}

export default Authoriser