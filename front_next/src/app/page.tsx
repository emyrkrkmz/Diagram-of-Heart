import Link from 'next/link';
export default function Home() {
  return (
    <div className="relative h-screen w-full bg-[url('/images/itu-eef.jpg')] bg-no-repeat bg-center bg-cover">
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
        
        <h1 className="text-5xl text-gray-300 font-extrabold mb-8 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          Welcome
        </h1>
        
        <p className="text-lg text-gray-300 mb-6">
          Your one-stop solution for managing prerequisites and GPA calculations
        </p>
        
        <div className="flex space-x-4">
          <Link href="/diagram">
            <button
              className="py-3 px-8 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition duration-300 ease-in-out"
            >
              Prerequisite Chain
            </button>
          </Link>
          <Link href="/gpa-calculator">
            <button
              className="py-3 px-8 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              GPA Calculator
            </button>
          </Link>
          <Link href="/courses-new">
            <button
              className="py-3 px-8 bg-orange-500 text-white rounded-lg shadow-lg hover:bg-orange-600 transition duration-300 ease-in-out"
            >
              Show 2025 Course Program
            </button>
          </Link>

        </div>
        
        
        <div className="w-full max-w-xs md:max-w-md lg:max-w-lg mt-12">
          <div className="border-t border-white mb-2"></div>
          <img src="./images/logoitu.png  " alt="Logo" className="h-32 mx-auto shadow-xl transform transition duration-500 hover:scale-110"
            style={{ boxShadow: '0 0 10px rgba(255, 255, 255, 0.6)'}}/>
          
          <div className="border-b border-white mt-2"></div>
        </div>
      </div>
      

    </div>
  );
}
