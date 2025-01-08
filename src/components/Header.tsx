import { useEffect, useState } from "react"
import { firebaseAuth } from "../firebaseConfig"
import { useNavigate } from "react-router"


function Header() {

  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState<boolean>(false)

  useEffect(()=>{
    firebaseAuth.onAuthStateChanged(async(user)=>{
      if(user){
        setLoggedIn(true)
      }
    })
  },[])
  

  function authHandle(){
    if(!loggedIn){
      navigate('/auth')
    }
    else {
      firebaseAuth.signOut()
      .then(()=>{
        setLoggedIn(false)
        navigate('/')
      })
      .catch((error)=>{
        console.log(error)
      })
    }
  }

  return (
    <header className="bg-white shadow-sm flex justify-start ">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold text-indigo-600">
          FoundersCo
        </a>
        <div className="space-x-4">
          <a href="/listings" className="text-gray-600 hover:text-indigo-600">
            Listings
          </a>
          <a href="/mylistings" className="text-gray-600 hover:text-indigo-600">
            My Listings
          </a>
          <a href="/createlisting" className="text-gray-600 hover:text-indigo-600">
            Create Listing
          </a>
          <a href="/profile" className="text-gray-600 hover:text-indigo-600">
            Profile
          </a>
          <button 
          onClick={()=>authHandle()}
          className="text-gray-600 hover:text-indigo-600">
            {loggedIn==false?'Login/Signup':'Signout'}
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Header