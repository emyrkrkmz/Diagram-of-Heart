"use client";
import { useState } from "react";
import CourseBox from "@/components/CourseBox";
import Courses from '../../../data/ehb_lectures.course_spy.json';
import Electives from '../../../data/ehb_lectures.elective_spy.json';
import Modal from "@/components/Modal";
import { ArcherContainer } from 'react-archer';

const courses = Courses;
const electives = Electives;

export default function CourseSchema() {
	const semesters = Array.from({ length: 8 }, (_, i) => i + 1); // Array [1, 2, 3, 4, 5, 6, 7, 8]

	const [highlighted, setHighlighted] = useState<string[]>([]);

	const findAllPrereqs = (courseCode: string, acc: string[] = []) => {
    const course = courses.find((c) => c.code === courseCode) || electives.flatMap(e => e.course_list).find((c) => c.code === courseCode);
    if (course && course.prerequisite && course.prerequisite.length > 0) {
      course.prerequisite.forEach((prereq) => {
        if (!acc.includes(prereq)) {
          acc.push(prereq);
          findAllPrereqs(prereq, acc); // Recursively find prerequisites of prerequisites
        }
      });
    }
    return acc;
	};

	const handleCourseClick = (courseCode: string) => {
    	if (courseCode === "ELECTIVE") return;

    	const prerequisites = findAllPrereqs(courseCode);
    	setHighlighted([courseCode, ...prerequisites]);
	};

	return (
    	<div className="space-y-12">
      
    		<ArcherContainer strokeColor="white">
	  			<div className="flex justify-center py-4">
      		  		<pre className="text-2xl font-bold text-white bg-black bg-opacity-50 px-4 py-2 rounded-md max-w-max">Elektronik ve Haberleşme Diyagramı</pre>
      			</div>
				<div>
        		{semesters.map((semester) => (
        	  	<CourseRow
        	    	key={semester}
        	    	semester={semester}
        	    	highlighted={highlighted}
        	    	onCourseClick={handleCourseClick}
        	  	/>
        		))}
				</div>
      		</ArcherContainer>
			  
    	</div>
  	);
}

function CourseRow({ semester, highlighted, onCourseClick }: { semester: number, highlighted: string[], onCourseClick: (courseCode: string) => void }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedElectiveCourses, setSelectedElectiveCourses] = useState<typeof electives[0]["course_list"]>([]);
  const [currentCourses, setCurrentCourses] = useState(
    courses
      .filter((course) => course.semester === semester)
      .sort((a, b) => (a.code === "ELECTIVE" ? 1 : b.code === "ELECTIVE" ? -1 : 0))
  );
  const [currentElectiveName, setCurrentElectiveName] = useState("");

  const handleElectiveClick = (electiveName: string) => {
    const elective = electives.find((e) => e.name === electiveName);
    if (elective) {
      setSelectedElectiveCourses(elective.course_list);
      setCurrentElectiveName(electiveName);
      setIsModalOpen(true);
    }
  };

  const handleCourseSelect = (courseCode: string) => {
    const selectedCourse = selectedElectiveCourses.find((course) => course.code === courseCode);
    if (selectedCourse) {
      // Update the currentCourses state to reflect the selected course
      setCurrentCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.name === currentElectiveName || course.oldElective_name === currentElectiveName
            ? {
                ...selectedCourse,
                semester: semester,
                is_oldElective: true,
                oldElective_name: currentElectiveName,
              }
            : course
        )
      );
	  onCourseClick(selectedCourse.code);
      setIsModalOpen(false); // Close the modal after selecting the course
    }
  };

  // Handle right-click to open the modal
  const handleRightClick = (event: React.MouseEvent, course: any) => {
    event.preventDefault(); // Prevent the default right-click context menu

    // If the course is an elective or a previously selected elective, open the modal
    if (course.code === "ELECTIVE" || course.is_oldElective) {
      handleElectiveClick(course.is_oldElective ? course.oldElective_name : course.name);
    }
  };

  return (
    <>
      <div className="relative w-full flex items-center justify-center border-gray-500 bg-opacity-60 rounded-lg p-4 mb-8">
          <div className="flex space-x-6 mt-20">
            {currentCourses.map((course, index) => (
              <div
                key={index}
                className={`${
                  course.code === "ELECTIVE" ? "cursor-pointer" : ""
                }`}
                onClick={() => onCourseClick(course.code)} // Prevent click on electives
                onContextMenu={(e) => handleRightClick(e, course)} // Right-click to open modal
              >
                <CourseBox
                  code={course.code}
                  name={course.name}
                  prerequisite={course.prerequisite}
                  isHighlighted={highlighted.includes(course.code)}
                  is_oldElective={course.is_oldElective || false} // Pass new props
                  oldElective_name={course.oldElective_name || ""}
                />
              </div>
            ))}
          </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        electiveCourses={selectedElectiveCourses}
        onCourseSelect={handleCourseSelect}
      />
    </>
  );
}
