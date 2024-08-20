interface SelectProps {
  label?: string;
  options: string[];
}

export default function Select({ label, options }: SelectProps) {
  return (
    <div className="w-full max-w-xs">
      {label && (
        <label
          className="block text-gray-400 text-sm font-bold mb-2"
          htmlFor={label}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={label}
          className="block appearance-none w-full bg-transparent text-gray-300 border border-gray-300 py-3 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:ring-2 focus:ring-white focus:border-white"
        >
          <option>-- Option --</option>
          {options.map((option, index) => (
            <option key={index} className="bg-gray-900 text-white">
              {option}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M7 10l5 5 5-5H7z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
