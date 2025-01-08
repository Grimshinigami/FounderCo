
function Home() {
  return (
    <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Welcome to FoundersCo</h1>
        <p className="text-xl mb-8">Connect with founders and developers to bring your ideas to life.</p>
        <div className="space-x-4">
            <a href="/listings" className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700">
            Browse Listings
            </a>
            <a href="/auth" className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300">
            Get Started
            </a>
        </div>
    </div>
  )
}

export default Home