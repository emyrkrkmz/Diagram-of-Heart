"use client";
import React, { useState, useEffect } from "react";
import ehb from "../../../data/ehb.json";
import eef from "../../../data/eef.json";
import end from "../../../data/end.json";
import kon from "../../../data/kon.json";
import ecn from "../../../data/ecn.json";

const departmentData: Record<string, any[]> = {
  EHB: ehb,
  EEF: eef,
  END: end,
  KON: kon,
  ECN: ecn,
};

const colors = [
  "bg-blue-500",
  "bg-red-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-orange-500",
];

export default function CreateSchedule() {
  const [schedule, setSchedule] = useState<any[]>([]);
  const [courseSelections, setCourseSelections] = useState([
    { department: "", course: "", crn: "" },
  ]);

  useEffect(() => {
    updateSchedule();
  }, [courseSelections]);

  const handleAddCourseSelection = () => {
    setCourseSelections([
      ...courseSelections,
      { department: "", course: "", crn: "" },
    ]);
  };

  const handleDepartmentChange = (index: number, value: string) => {
    const updatedSelections = [...courseSelections];
    updatedSelections[index].department = value;
    updatedSelections[index].course = ""; // Reset course and CRN when department changes
    updatedSelections[index].crn = "";
    setCourseSelections(updatedSelections);
  };

  const handleCourseChange = (index: number, value: string) => {
    const updatedSelections = [...courseSelections];
    updatedSelections[index].course = value;
    updatedSelections[index].crn = ""; // Reset CRN when course changes
    setCourseSelections(updatedSelections);
  };

  const handleCRNChange = (index: number, value: string) => {
    const updatedSelections = [...courseSelections];
    updatedSelections[index].crn = value;
    setCourseSelections(updatedSelections);
  };

  const updateSchedule = () => {
    const newSchedule = courseSelections
      .map((selection, index) => {
        const { department, crn } = selection;
        if (department && crn) {
          const courseDetails = departmentData[department].find(
            (c) => c.crn === crn
          );
          if (courseDetails) {
            const color = colors[index % colors.length];
            return { ...courseDetails, color };
          }
        }
        return null;
      })
      .filter(Boolean);

    setSchedule(newSchedule);
  };

  const parseTimeRange = (timeRange: string) => {
    const [baslangicSaati, bitisSaati] = timeRange.split("/");

    return { baslangicSaati, bitisSaati };
  };

  const calculateRowSpan = (start: string, end: string) => {
    const [startHour, startMinutes] = start.split(":").map(Number);
    const [endHour, endMinutes] = end.split(":").map(Number);

    const startTotalMinutes = startHour * 60 + startMinutes;
    const endTotalMinutes = endHour * 60 + endMinutes;

    return Math.ceil((endTotalMinutes - startTotalMinutes) / 30);
  };

  const handleRemoveCourse = (index: number) => {
    const updatedSelections = courseSelections.filter((_, i) => i !== index);
    const courseToRemove = courseSelections[index];
    setCourseSelections(updatedSelections);
    setSchedule(schedule.filter((course) => course.crn !== courseToRemove.crn));
  };

  return (
    <div className="container mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Ders Programım</h1>

      {courseSelections.map((selection, index) => (
        <div key={index} className="flex items-center mb-4 space-x-4">
          <div className="flex-1">
            <label className="block text-gray-700 font-bold mb-1">
              Department:
            </label>
            <select
              className="p-2 border rounded-lg w-full"
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

          <div className="flex-1">
            <label className="block text-gray-700 font-bold mb-1">Course:</label>
            <select
              className="p-2 border rounded-lg w-full"
              value={selection.course}
              onChange={(e) => handleCourseChange(index, e.target.value)}
              disabled={!selection.department}
            >
              <option value="">Ders Seçin</option>
              {selection.department &&
                Array.from(
                  new Set(
                    departmentData[selection.department].map(
                      (course) => course.dersKodu
                    )
                  )
                ).map((dersKodu) => {
                  const course = departmentData[selection.department].find(
                    (c) => c.dersKodu === dersKodu
                  );
                  return (
                    <option key={course?.crn} value={course?.dersKodu}>
                      {course?.dersKodu} : {course?.dersAdi}
                    </option>
                  );
                })}
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-gray-700 font-bold mb-1">CRN:</label>
            <select
              className="p-2 border rounded-lg w-full"
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
                      {course.crn}: {course.adSoyad} ({course.gunAdiTR}{" "}
                      {course.baslangicSaati})
                    </option>
                  ))}
            </select>
          </div>

          <button
            onClick={() => handleRemoveCourse(index)}
            className="py-2 px-4 mt-7 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        onClick={handleAddCourseSelection}
        className="w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add Another Course
      </button>

      <div className="mt-4">
        <div className="flex justify-between mb-4">
          <button className="py-2 px-5 bg-blue-600 text-white rounded-lg">
            Alternatif Program Öner
          </button>
          <button className="py-2 px-5 bg-blue-600 text-white rounded-lg">
            Boş CRN Öner
          </button>
        </div>

        <div className="grid grid-cols-6 gap-4">
          <div className="font-bold">Saat</div>
          <div className="font-bold">Pazartesi</div>
          <div className="font-bold">Salı</div>
          <div className="font-bold">Çarşamba</div>
          <div className="font-bold">Perşembe</div>
          <div className="font-bold">Cuma</div>

          {Array.from({ length: 24 }).map((_, index) => {
            const hour = Math.floor(index / 2) + 8;
            const minutes = index % 2 === 0 ? "00" : "30";
            const displayTime = `${hour}:${minutes}`;

            return (
              <React.Fragment key={index}>
                {minutes === "00" && (
                  <div className="border-dashed border-b-2">{displayTime}</div>
                )}
                {minutes === "30" && <div className="border-b-2"></div>}
                {Array.from({ length: 5 }).map((_, day) => (
                  <div
                    key={day}
                    className="relative border-gray-300 rounded-lg flex flex-npwrap"
                    style={{ height: "1rem" }} // Adjust height for 30 min intervals
                  >
                    {schedule
                      .filter((course) => {
                        const { baslangicSaati, bitisSaati } = parseTimeRange(
                          course.baslangicSaati
                        );
                        const courseStartHour = parseInt(
                          baslangicSaati.split(":")[0]
                        );
                        const courseStartMinutes = parseInt(
                          baslangicSaati.split(":")[1]
                        );
                        const courseStartIndex =
                          (courseStartHour - 8) * 2 +
                          (courseStartMinutes >= 30 ? 1 : 0);

                        return (
                          course.gunAdiTR ===
                            ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma"][
                              day
                            ] && courseStartIndex === index
                        );
                      })
                      .map((course) => {
                        const { baslangicSaati, bitisSaati } = parseTimeRange(
                          course.baslangicSaati
                        );
                        const rowSpan = calculateRowSpan(
                          baslangicSaati,
                          bitisSaati
                        );

                        return (
                          <div
                            key={course.crn}
                            className={`inset-0 ${course.color} rounded-lg text-white p-2 text-xs flex-grow`}
                            style={{
                              height: `${rowSpan * 2}rem`,
                            }}
                          >
                            {course.dersKodu} <br />
                            {course.dersAdi} <br />
                            {course.adSoyad} <br />
                            {baslangicSaati} - {bitisSaati || "?"}
                          </div>
                        );
                      })}
                  </div>
                ))}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
