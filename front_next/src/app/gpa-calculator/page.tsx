"use client";
import { useState } from "react";
import Link from "next/link";

interface Lecture {
  name: string;
  credit: string;
  grade: string;
  retake: boolean;
  oldGrade?: string; // Optional field for old grade if retaking
}

export default function GPACalculator() {
  const [currentGPA, setCurrentGPA] = useState("0");
  const [creditsCompleted, setCreditsCompleted] = useState("0");
  const [lectures, setLectures] = useState<Lecture[]>([{ name: "", credit: "", grade: "", retake: false }]);

  // Grade to GPA mapping with + grades
  const gradeToGPA: Record<string, number> = {
    "AA": 4.0,
    "BA+": 3.75,
    "BA": 3.5,
    "BB+": 3.25,
    "BB": 3.0,
    "CB+": 2.75,
    "CB": 2.5,
    "CC+": 2.25,
    "CC": 2.0,
    "DC+": 1.75,
    "DC": 1.5,
    "DD+": 1.25,
    "DD": 1.0,
    "FF": 0.0,
  };

  const handleLectureChange = (index: number, field: keyof Lecture, value: string | boolean) => {
    const newLectures = [...lectures];
  
    // Check if the field is of type 'retake' or 'oldGrade' and handle accordingly
    if (field === 'retake' && typeof value === 'boolean') {
      newLectures[index][field] = value as boolean; // Explicitly cast to boolean
    } else if ((field === 'name' || field === 'credit' || field === 'grade' || field === 'oldGrade') && typeof value === 'string') {
      newLectures[index][field] = value as string; // Explicitly cast to string
    }
  
    setLectures(newLectures);
  };
  
  const handleAddLecture = () => {
    setLectures([...lectures, { name: "", credit: "", grade: "", retake: false }]);
  };

  const calculateGPA = () => {
    let totalCredits = parseFloat(creditsCompleted || "0");
    let totalPoints = parseFloat(currentGPA || "0") * totalCredits;

    lectures.forEach(({ credit, grade, retake, oldGrade }) => {
      const numericGrade = gradeToGPA[grade];
      if (numericGrade !== undefined) {
        const lectureCredits = parseFloat(credit);
        totalCredits += lectureCredits;
        totalPoints += numericGrade * lectureCredits;
      }
      // Handle old grade if retaking
      if (retake && oldGrade) {
        const oldNumericGrade = gradeToGPA[oldGrade];
        if (oldNumericGrade !== undefined) {
          const lectureCredits = parseFloat(credit);
          totalCredits -= lectureCredits;
          totalPoints -= oldNumericGrade * lectureCredits;
        }
      }
    });

    return totalCredits ? (totalPoints / totalCredits).toFixed(2) : "N/A";
  };

  const handleCurrentGPAChange = (value: string) => {
    const gpa = parseFloat(value);
    setCurrentGPA(value);
    if (gpa > 4) {
      setCurrentGPA("4");
    }
  };

  return (
    <>
      <nav className="px-12 py-5 flex flex-col items-center">
        <div className="flex space-x-4 mb-4">
          <Link href="/diagram">
            <button
              type="button"
              className="py-2.5 px-5 text-sm font-medium text-gray-400 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Prerequisite Chain
            </button>
          </Link>

          <Link href="/gpa-calculator">
            <button
              type="button"
              className="py-2.5 px-5 text-sm font-medium text-gray-400 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              GPA Calculator
            </button>
          </Link>
          <Link href="/courses-new">
		  		  <button type="button" className="py-2.5 px-5 text-sm font-medium text-gray-400 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
					    2025 Courses
		  		  </button>
		  		</Link>
        </div>
      </nav>

      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-center">GPA Calculator</h2>

        {/* Current GPA */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Current GPA:</label>
          <input
            type="number"
            step="0.01"
            value={currentGPA}
            onChange={(e) => handleCurrentGPAChange(e.target.value)}
            className="w-full p-2 border rounded-lg"
            max={4.0}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Credits Completed:</label>
          <input
            type="number"
            value={creditsCompleted}
            onChange={(e) => setCreditsCompleted(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <h3 className="text-lg font-bold mb-2">This Semesters Lectures ({lectures.length})</h3>
        {lectures.map((lecture, index) => (
          <div key={index} className="mb-4 border-b pb-4">
            <div className="mb-2">
              <label className="block text-gray-700">Lecture Name:</label>
              <input
                type="text"
                value={lecture.name}
                onChange={(e) => handleLectureChange(index, "name", e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div className="mb-2">
              <label className="block text-gray-700">Credits:</label>
              <select
                value={lecture.credit}
                onChange={(e) => handleLectureChange(index, "credit", e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Select Credits</option>
                {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((credit) => (
                  <option key={credit} value={credit}>
                    {credit}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-2">
              <label className="block text-gray-700">Grade:</label>
              <select
                value={lecture.grade}
                onChange={(e) => handleLectureChange(index, "grade", e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Select Grade</option>
                {Object.keys(gradeToGPA).map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-2">
              <label className="block text-gray-700">Retaking Course?</label>
              <input
                type="checkbox"
                checked={lecture.retake}
                onChange={(e) => handleLectureChange(index, "retake", e.target.checked)}
              />
            </div>

            {lecture.retake && (
              <div className="mb-2">
                <label className="block text-gray-700">Old Grade:</label>
                <select
                  value={lecture.oldGrade || ""}
                  onChange={(e) => handleLectureChange(index, "oldGrade", e.target.value)}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">Select Old Grade</option>
                  {Object.keys(gradeToGPA).map((grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        ))}

        <button
          onClick={handleAddLecture}
          className="w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Another Lecture
        </button>

        {/* GPA Calculation Result */}
        <div className="mt-6 text-center">
          <h3 className="text-lg font-bold">Calculated GPA:</h3>
          <p className="text-xl">{calculateGPA()}</p>
        </div>
      </div>
    </>
  );
}
