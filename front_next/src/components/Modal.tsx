"use client"
import { useState } from "react";

interface Course {
	code: string;
	name: string;
	semester: string;
  }
  
  interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	electiveCourses: Course[]; 
	onCourseSelect: (courseCode: string) => void; 
  }
export default function Modal({ isOpen, onClose, electiveCourses, onCourseSelect  } : ModalProps) {
	const [selectedCourse, setSelectedCourse] = useState<string>("");
	if (!isOpen) return null;


	const handleOkClick = () => {
		if (selectedCourse) {
		  onCourseSelect(selectedCourse);
		  onClose();
		}
	  };
  	
	
	  return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
		  <div className="bg-gray-900 text-white p-8 rounded-lg max-w-lg w-full shadow-lg relative">
			{/* Close Button */}
			<button
			  onClick={onClose}
			  className="absolute top-2 right-2 text-white hover:text-gray-300"
			>
			  ✕
			</button>
	
			{/* Title */}
			<h2 className="text-xl font-semibold mb-2 uppercase tracking-wide">
			  Elective Courses
			</h2>
			<hr className="border-gray-700 mb-4" />
	
			{/* Select Dropdown */}
			<div className="relative">
			  <select
				className="w-full p-3 bg-black bg-opacity-70 border border-gray-400 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
				value={selectedCourse}
				onChange={(e) => setSelectedCourse(e.target.value)}
			  >
				<option value="">-- Seçiniz --</option>
				{electiveCourses.map((course, index) => (
				  <option key={index} value={course.code}>
					{course.code} -
					{course.name}
				  </option>
				))}
			  </select>
			</div>
	
			{/* OK Button */}
			<div className="mt-4 flex justify-end">
			  <button
				onClick={handleOkClick}
				className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
			  >
				OK
			  </button>
			</div>
		  </div>
		</div>
	  );
	
}
