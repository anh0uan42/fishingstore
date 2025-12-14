import CategoryCard from "../components/CategoryCard"


const cattegories = [
  {href: 'rods', name: 'Rods', imgUrl: '/rod.jpeg'},
  {href: 'reels', name: 'Reels', imgUrl: 'reel.jpeg'},
  {href: 'apparel', name: 'Apparel', imgUrl: '/apparel.jpeg'},
  {href: 'lures', name: 'Lures', imgUrl: '/lures.jpg'},
  {href: 'others', name: 'Others', imgUrl: '/others.jpeg'},
]

function HomePage() {
  return (
    <div className='relative min-h-screen text-white overflow-hidden'>
        <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
            <h1 className='text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4'>Explore Our Category</h1>
            <p className='text-center text-xl text-gray-300 mb-12'>Discover the largest store of fishing product!</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cattegories.map((category) => (
                    <CategoryCard category={category} key={category.name} />
                ))}
            </div>
        </div>
    </div>
  )
}

export default HomePage
