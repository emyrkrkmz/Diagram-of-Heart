"use client"
import React, { useState } from 'react';
import ehb from '../../../data/ehb.json';
import eef from '../../../data/eef.json';
import end from '../../../data/end.json';
import kon from '../../../data/kon.json';

const departmentData: Record<string, any[]> = {
  EHB: ehb,
  EEF: eef,
  END: end,
  KON: kon,
};

export default function CreateSchedule() {
  const [schedule, setSchedule] = useState<any[]>([]);
  const [courseSelections, setCourseSelections] = useState([
    { department: '', course: '', crn: '' },
  ]);

  const handleAddCourseSelection = () => {
    setCourseSelections([...courseSelections, { department: '', course: '', crn: '' }]);
  };

  const handleDepartmentChange = (index: number, value: string) => {
    const updatedSelections = [...courseSelections];
    updatedSelections[index].department = value;
    updatedSelections[index].course = ''; // Reset course and CRN when department changes
    updatedSelections[index].crn = '';
    setCourseSelections(updatedSelections);
  };

  const handleCourseChange = (index: number, value: string) => {
    const updatedSelections = [...courseSelections];
    updatedSelections[index].course = value;
    updatedSelections[index].crn = ''; // Reset CRN when course changes
    setCourseSelections(updatedSelections);
  };

  const handleCRNChange = (index: number, value: string) => {
    const updatedSelections = [...courseSelections];
    updatedSelections[index].crn = value;
    setCourseSelections(updatedSelections);
  };

  const handleAddCourseToSchedule = (index: number) => {
    const { department, crn } = courseSelections[index];
    if (department && crn) {
      const courseDetails = departmentData[department].find(
        (c) => c.crn === crn
      );
      if (courseDetails) {
        setSchedule([...schedule, courseDetails]);
      }
    }
  };

  const handleRemoveCourse = (index: number) => {
    setCourseSelections(courseSelections.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Ders Programı: ilk programım</h1>

      {courseSelections.map((selection, index) => (
        <div key={index} className="flex items-center mb-4">
          <div className="mr-4">
            <label className="block text-gray-700 font-bold mb-1">Department:</label>
            <select
              className="p-2 border rounded-lg"
              value={selection.department}
              onChange={(e) => handleDepartmentChange(index, e.target.value)}
            >
              <option value="">Bölüm Seçin</option>
              {Object.keys(departmentData).map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div className="mr-4">
            <label className="block text-gray-700 font-bold mb-1">Course:</label>
            <select
              className="p-2 border rounded-lg"
              value={selection.course}
              onChange={(e) => handleCourseChange(index, e.target.value)}
              disabled={!selection.department}
            >
              <option value="">Ders Seçin</option>
              {selection.department &&
                departmentData[selection.department]
                  .map((course) => (
                    <option key={course.crn} value={course.dersKodu}>
                      {course.dersAdi}
                    </option>
                  ))}
            </select>
          </div>

          <div className="mr-4">
            <label className="block text-gray-700 font-bold mb-1">CRN:</label>
            <select
              className="p-2 border rounded-lg"
              value={selection.crn}
              onChange={(e) => handleCRNChange(index, e.target.value)}
              disabled={!selection.course}
            >
              <option value="">CRN Seçin</option>
              {selection.department &&
                selection.course &&
                departmentData[selection.department]
                  .filter((course) => course.dersKodu === selection.course)
                  .map((course) => (
                    <option key={course.crn} value={course.crn}>
                      {course.crn}: {course.adSoyad} ({course.gunAdiTR} {course.baslangicSaati})
                    </option>
                  ))}
            </select>
          </div>

          <button
            onClick={() => handleAddCourseToSchedule(index)}
            className="ml-4 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Ders Ekle
          </button>

          <button
            onClick={() => handleRemoveCourse(index)}
            className="ml-4 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Dersi sil
          </button>
        </div>
      ))}

      <button
        onClick={handleAddCourseSelection}
        className="w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add Another Course
      </button>

      {/* Schedule Grid */}
      <div className="mt-4">
        <div className="flex justify-between mb-4">
          <button className="py-2 px-5 bg-blue-600 text-white rounded-lg">Alternatif Program Öner</button>
          <button className="py-2 px-5 bg-blue-600 text-white rounded-lg">Boş CRN Öner</button>
        </div>

        <div className="grid grid-cols-6 gap-4">
          <div className="font-bold">Saat</div>
          <div className="font-bold">Pazartesi</div>
          <div className="font-bold">Salı</div>
          <div className="font-bold">Çarşamba</div>
          <div className="font-bold">Perşembe</div>
          <div className="font-bold">Cuma</div>

          {Array.from({ length: 14 }).map((_, hour) => (
            <React.Fragment key={hour}>
              <div>{`${8 + hour}:00`}</div>
              {Array.from({ length: 5 }).map((_, day) => (
                <div
                  key={day}
                  className="relative h-20 border border-gray-300 rounded-lg"
                >
                  {schedule
                    .filter(
                      (course) =>
                        course.gunAdiTR === ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'][day] &&
                        parseInt(course.baslangicSaati.split(':')[0]) === 8 + hour
                    )
                    .map((course) => (
                      <div
                        key={course.crn}
                        className="absolute inset-0 bg-blue-400 rounded-lg text-white p-2 text-xs"
                      >
                        {course.dersAdi} <br />
                        {course.adSoyad} <br />
                        {course.baslangicSaati} - {course.bitisSaati || "?"}
                      </div>
                    ))}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
