import Select from "@/components/Select";
import Link from 'next/link';

export default function DiagramPage() {

	const options1 = ['Elektrik-Elektronik Fakultesi'];
	const options2 = ['Elektronik ve Haberlesme'];
	const options3 = ['EHBE'];


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
			<h1 className="text-white text-center text-4xl pt-8">Prerequisite Chain</h1>
			<div className="w-full max-w-xs md:max-w-md lg:max-w-lg mt-12">
          		<div className="border-t border-white mb-2"></div>
          		<img src="./images/katanalogo.png" alt="Logo" className="h-32 mx-auto shadow-xl transform transition duration-500 hover:scale-110"
            	style={{ boxShadow: '0 0 10px rgba(255, 255, 255, 0.6)',}}/>
          		<div className="border-b border-white mt-2"></div>
        </div>
		  </nav>
		  
		  <div className="flex justify-center">
			<div className="bg-black bg-opacity-50 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
		  		<div className="flex flex-col gap-4">
      				<Select label="Choose Faculty" options={options1} />
      				<Select label="Choose Department" options={options2} />
      				<Select label="Choose Code" options={options3} />
				</div>

				<div className="flex justify-center mt-8">
      			<Link href="/show-diagram">
				<button
      			  className="py-2.5 px-8 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"

				>
    			    Show Diagram
    			  </button>
				</Link>
    			</div>

			</div>
		  </div>
		  
		</div>
	  </div>
	  
	);
  }
  