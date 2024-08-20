import Link from "next/link"

export default function GpaCalculator() {
	
	return (
	  <div className="relative h-full w-full">
  
		<div className="relative z-10 bg-black w-full h-full lg:bg-opacity-35">
		  <nav className="px-12 py-5 flex flex-col items-center">
			<div className="flex space-x-4 mb-4">
			<Link href="/diagram">
			  <button type="button" className="py-2.5 px-5 text-sm font-medium text-gray-400 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
				Prerequisite Chain
			  </button>
			  </Link>

			  <Link href="/gpa-calculator">
			  <button type="button" className="py-2.5 px-5 text-sm font-medium text-gray-400 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
				GPA Calculator
			  </button>
			  </Link>
			</div>
			<h1 className="text-white text-center text-4xl pt-8">GPA Calculator</h1>
			<img src="./images/katanalogo.png" alt="Logo" className="h-32 mx-auto shadow-xl transform transition duration-500 hover:scale-110"
            style={{ boxShadow: '0 0 10px rgba(255, 255, 255, 0.6)',}}/>		  
		</nav>
		</div>
		</div>
	)
}