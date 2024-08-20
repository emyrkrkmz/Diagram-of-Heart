import { ArcherElement } from 'react-archer';

interface CourseBoxProps {
  code: string;
  name: string;
  prerequisite: string[];
  isHighlighted: boolean;
  is_oldElective: boolean;
  oldElective_name: string;
}

export default function CourseBox({ code, name, prerequisite, isHighlighted, is_oldElective, oldElective_name, }: CourseBoxProps) {
  const prerequisites = prerequisite || [];

  return (
    <ArcherElement
      id={code}
      relations={prerequisites.map((prereq : string) => ({
        targetId: prereq,
        targetAnchor: 'bottom',
        sourceAnchor: 'top',
        style: { strokeColor: isHighlighted ? "pink" : "white", strokeWidth: isHighlighted ? 3 : 1 },
      }))}
    >
    <div className={`flex items-center justify-center bg-gray-800 text-white rounded-lg  ${isHighlighted ? "border-yellow-500 border-4": "border-gray-500 border"}  p-4 w-28 h-28`}>
      <div className="text-center">
        <p className="text-sm font-semibold">{code}</p>
        <p className="text-xs mt-1">{name}</p>
      </div>
      
    </div>
    </ArcherElement>
  );
}


