"use client";
import React, { useState, useEffect, useRef } from "react";
import { toJpeg } from "html-to-image";
import axios from "axios";

const departmentCodes: Record<string, number> = {
	"AKM": 42,
	"ALM": 227,
	"ARB": 305,
	"ARC": 302,
	"ATA": 43,
	"BBF": 310,
	"BEB": 200,
	"BED": 149,
	"BEN": 165,
	"BIL": 38,
	"BIO": 30,
	"BLG": 3,
	"BLS": 180,
	"BUS": 155,
	"CAB": 127,
	"CEN": 304,
	"CEV": 7,
	"CHA": 169,
	"CHE": 137,
	"CHZ": 81,
	"CIE": 142,
	"CIN": 245,
	"CMP": 146,
	"COM": 208,
	"CVH": 168,
	"DAN": 243,
	"DEN": 10,
	"DFH": 163,
	"DGH": 181,
	"DNK": 44,
	"DUI": 32,
	"EAS": 141,
	"ECN": 232,
	"ECO": 154,
	"EEE": 289,
	"EEF": 294,
	"EFN": 297,
	"EHA": 182,
	"EHB": 196,
	"EHN": 241,
	"EKO": 39,
	"ELE": 59,
	"ELH": 2,
	"ELK": 1,
	"ELT": 178,
	"END": 15,
	"ENE": 183,
	"ENG": 179,
	"ENR": 207,
	"ENT": 225,
	"ESL": 140,
	"EM": 163,
	"ETK": 110,
	"EUT": 22,
	"FIZ": 28,
	"FRA": 226,
	"FZK": 175,
	"GED": 138,
	"GEM": 11,
	"GEO": 74,
	"GID": 4,
	"GLY": 162,
	"GMI": 46,
	"GMK": 176,
	"GMZ": 109,
	"GSB": 53,
	"GSN": 173,
	"GUV": 31,
	"GVT": 177,
	"GVZ": 111,
	"HSS": 256,
	"HUK": 41,
	"IAD": 301,
	"ICM": 63,
	"ILT": 253,
	"IML": 112,
	"IND": 300,
	"ING": 33,
	"INS": 8,
	"ISE": 153,
	"ISH": 231,
	"ISL": 14,
	"ISP": 228,
	"ITA": 255,
	"ITB": 50,
	"JDF": 9,
	"JEF": 19,
	"JEO": 18,
	"JPN": 202,
	"KIM": 27,
	"KMM": 6,
	"KMP": 125,
	"KON": 58,
	"LAT": 156,
	"MAD": 16,
	"MAK": 12,
	"MAL": 48,
	"MAR": 148,
	"MAT": 26,
	"MCH": 160,
	"MDN": 293,
	"MEK": 48,
	"MEN": 258,
	"MET": 5,
	"MIM": 20,
	"MKN": 184,
	"MMD": 290,
	"MOD": 150,
	"MRE": 157,
	"MRT": 158,
	"MST": 257,
	"MTH": 143,
	"MTK": 174,
	"MTM": 260,
	"MTO": 23,
	"MTR": 199,
	"MUH": 29,
	"MUK": 40,
	"MUT": 126,
	"MUZ": 128,
	"MYZ": 309,
	"NAE": 259,
	"NTH": 263,
	"ODS": 161,
	"PAZ": 151,
	"PEM": 64,
	"PET": 17,
	"PHE": 262,
	"PHY": 147,
	"PREP": 203,
	"RES": 36,
	"ROS": 307,
	"RUS": 237,
	"SBP": 21,
	"SEC": 308,
	"SED": 288,
	"SEN": 171,
	"SES": 124,
	"SGI": 291,
	"SNT": 193,
	"SPA": 172,
	"STA": 37,
	"STI": 159,
	"TDW": 261,
	"TEB": 121,
	"TEK": 13,
	"TEL": 57,
	"TER": 49,
	"TES": 269,
	"THO": 129,
	"TRN": 65,
	"TRS": 215,
	"TRZ": 170,
	"TUR": 34,
	"UCK": 25,
	"ULP": 195,
	"UZB": 24,
	"VBA": 306,
	"X100": 198,
	"YTO": 213,
	"YZV": 221
};

// Function to fetch schedule data for a department
async function fetchSchedule(department: string) {
  try {
    const response = await axios.get('/api/proxy', {
      params: {
        ProgramSeviyeTipiAnahtari: "LS",
        __RequestVerificationToken: "YourTokenHere",
        dersBransKoduId: departmentCodes[department],
      },
    });

    if (response.status === 200) {
      console.log(`Response data for department ${department}:`, response.data);

      const dersProgramList = response.data.dersProgramList || [];
      console.log(`Type of dersProgramList for ${department}:`, typeof dersProgramList);
      console.log(`Is dersProgramList an array?`, Array.isArray(dersProgramList));
      console.log(`dersProgramList for ${department}:`, dersProgramList);

      return Array.isArray(dersProgramList) ? dersProgramList : [];
    } else {
      console.error(`Failed to fetch data for ${department}: Status ${response.status}`);
      return [];
    }
  } catch (error: unknown) {
    console.error(`Error fetching data for ${department}:`, error);
    return [];
  }
}



const colors = [
  "bg-blue-500",
  "bg-red-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-orange-500",
];
 //bize ulaşma kısmı
const WhatsAppButton = () => {
  const handleClick = () => {
      const phoneNumber = '5522481395';
      const url = `https://wa.me/${phoneNumber}`;
      window.open(url, '_blank');
  };

  return (
      <button 
      className="py-2 px-5 bg-blue-600 text-white rounded-lg"
      onClick={handleClick}>
          Hataları Bize Bildirin!
      </button>
  );
};

export default function CreateSchedule() {
  const [schedule, setSchedule] = useState<any[]>([]);
  const [departmentData, setDepartmentData] = useState<Record<string, any[]>>({});
  const [courseSelections, setCourseSelections] = useState([
    { department: "", course: "", crn: "" },
  ]);
  const scheduleRef = useRef<HTMLDivElement>(null);
  const requestedDepartmentsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    // Retrieve stored courses from localStorage
    const storedCoursesString = localStorage.getItem("courses");
    let courses = storedCoursesString ? JSON.parse(storedCoursesString) : [];

    if (courses.length === 0) {
      courses = [{ department: "", course: "", crn: "" }];
    }

    setCourseSelections(courses);
  }, []);

  useEffect(() => {
    const fetchDepartments = async () => {
      const departmentsToFetch = courseSelections
        .map((selection) => selection.department)
        .filter((dept) => dept && !departmentData[dept]);
  
      if (departmentsToFetch.length === 0) {
        return;
      }
  
      const fetchPromises = departmentsToFetch.map(async (department) => {
        const scheduleData = await fetchSchedule(department);
        console.log(`Fetched scheduleData for ${department}:`, scheduleData);
        return { department, scheduleData };
      });
  
      const results = await Promise.all(fetchPromises);
  
      setDepartmentData((prevData) => {
        const newData = { ...prevData };
        results.forEach(({ department, scheduleData }) => {
          console.log(`Setting departmentData[${department}] with data of length ${scheduleData.length}`);
          newData[department] = scheduleData;
        });
        console.log('Updated departmentData:', newData);
        return newData;
      });
    };
  
    fetchDepartments();
  }, [courseSelections]);
  
  

  useEffect(() => {
    updateSchedule();
  }, [courseSelections, departmentData]);

  const handleAddCourseSelection = () => {
    const updatedSelections = [...courseSelections, { department: "", course: "", crn: "" }];
    setCourseSelections(updatedSelections);
    window.localStorage.setItem("courses", JSON.stringify(updatedSelections));
  };

  const updateSchedule = () => {
    const newSchedule = courseSelections
      .map((selection, index) => {
        const { department, crn } = selection;
        if (department && crn && departmentData[department]) {
          const courseDetails = departmentData[department].find((c) => c.crn === crn);
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

  const handleDepartmentChange = (index: number, value: string) => {
    const updatedSelections = [...courseSelections];
    updatedSelections[index] = { department: value, course: "", crn: "" };
    setCourseSelections(updatedSelections);

    window.localStorage.setItem("courses", JSON.stringify(updatedSelections));
  };

  const handleCourseChange = (index: number, value: string) => {
    const updatedSelections = [...courseSelections];
    updatedSelections[index].course = value;
    updatedSelections[index].crn = "";
    setCourseSelections(updatedSelections);
    window.localStorage.setItem("courses", JSON.stringify(updatedSelections));
  };

  const handleCRNChange = (index: number, value: string) => {
    const updatedSelections = [...courseSelections];
    updatedSelections[index].crn = value;
    setCourseSelections(updatedSelections);
    window.localStorage.setItem("courses", JSON.stringify(updatedSelections));
  };


  const parseTimeRange = (timeRange: string) => {
    const course_day = (timeRange.match(/\//g) || []).length;

    if (course_day === 2) {
      const [first_start, first_end, second_start, second_end] = timeRange
        .replace(/\//g, " ")
        .split(" ");
      return [
        { baslangicSaati: first_start, bitisSaati: first_end },
        { baslangicSaati: second_start, bitisSaati: second_end },
      ];
    } else {
      const [baslangicSaati, bitisSaati] = timeRange.split("/");
      return [{ baslangicSaati, bitisSaati }];
    }
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
    
    // Update the course selections
    setCourseSelections(updatedSelections);
    
    // Update the schedule by filtering out the removed course
    setSchedule(schedule.filter((course) => course.crn !== courseToRemove.crn));
    
    // Save the updated selections to localStorage
    window.localStorage.setItem('courses', JSON.stringify(updatedSelections));
  };
  

  const downloadScheduleAsJPEG = () => {
    if (scheduleRef.current) {
      toJpeg(scheduleRef.current, {
        quality: 0.95,
        backgroundColor: "white",
        width: scheduleRef.current.offsetWidth,
        height: scheduleRef.current.offsetHeight,
      })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "ders_programi.jpeg";
          link.click();
        })
        .catch((error) => {
          console.error("Error generating JPEG:", error);
        });
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white rounded-lg shadow-md mt-3 mb-2">
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
              {Object.keys(departmentCodes).map((dept) => (
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
            disabled={!selection.department || !departmentData[selection.department]?.length}
          >
            <option value="">Ders Seçin</option>
            {selection.department &&
              Array.isArray(departmentData[selection.department]) &&
              Array.from(
                new Set(
                  departmentData[selection.department].map((course) => course.dersKodu)
                )
              ).map((dersKodu) => {
                const course = departmentData[selection.department].find(
                  (c) => c.dersKodu === dersKodu
                );
                return (
                  <option key={dersKodu} value={dersKodu}>
                    {dersKodu} : {course?.dersAdi}
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
              disabled={!selection.course || !departmentData[selection.department]}
            >
              <option value="">CRN Seçin</option>
              {selection.department &&
                selection.course &&
                Array.isArray(departmentData[selection.department]) &&
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
      <button
        onClick={downloadScheduleAsJPEG}
        className="w-full mt-4 p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Download Schedule as JPEG
      </button>

      <div className="mt-4">
        <div className="flex justify-between mb-4">
          <button className="py-2 px-5 bg-blue-600 text-white rounded-lg">
            Alternatif Program Öner
          </button>
          <WhatsAppButton></WhatsAppButton>
          <button className="py-2 px-5 bg-blue-600 text-white rounded-lg" disabled>
            <a href={`javascript: let crns=[${courseSelections.map((item)=>{
              return(item.crn)
            })}]; let inputs = document.querySelectorAll("input[type=number]");
            for (let i = 0; i < crns.length; i++) 
            {inputs[i].value = crns[i];inputs[i].dispatchEvent(new Event('input'));}
             let form = document.querySelector('form');form.dispatchEvent(new Event('submit'));
              new Promise((resolve) => setTimeout(resolve, 100)).then(() => { let button = document.querySelector('.card-footer button.btn-success');
               button.dispatchEvent(new Event('click'));})`}>CRN DOLDUR</a>
          </button>
          <button className="py-2 px-5 bg-blue-600 text-white rounded-lg">
            Boş CRN Öner
          </button>
        </div>

        <div ref={scheduleRef}>
        <div className="flex items-center justify-center text-center">
          <div className="font-bold flex-grow w-1/6 border-b-2">Saat</div>
          <div className="font-bold flex-grow w-1/6 border-b-2 ml-2">Pazartesi</div>
          <div className="font-bold flex-grow w-1/6 border-b-2 ml-2">Salı</div>
          <div className="font-bold flex-grow w-1/6 border-b-2 ml-2">Çarşamba</div>
          <div className="font-bold flex-grow w-1/6 border-b-2 ml-2">Perşembe</div>
          <div className="font-bold flex-grow w-1/6 border-b-2 ml-2">Cuma</div>
        </div>
        <div className="flex">
          <div className="grid grid-flow-row auto-rows-[1fr] w-1/6"
            style={{ gridTemplateRows: 'repeat(24, minmax(2rem, 2rem))' }}
          >
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
                </React.Fragment>
              );
            })}
          </div>
          



          {Array.from({ length: 5 }).map((_, day) => (
            <div
              key={day}
              className="grid grid-flow-row auto-rows-[1fr] w-1/6 relative ml-2"
              style={{ gridTemplateRows: 'repeat(24, minmax(2rem, 2rem))' }} // 24 saatlik bir gün için 30 dakikalık aralıklar
            >
              {schedule
                .flatMap((course) => {
                  const timeRanges = parseTimeRange(course.baslangicSaati);
                  return timeRanges.map((timeRange, index) => {
                    const courseDay = index === 0 ? course.gunAdiTR.split(' ')[0] : course.gunAdiTR.split(' ')[1];
                    const courseStartHour = parseInt(timeRange.baslangicSaati.split(":")[0]);
                    const courseStartMinutes = parseInt(timeRange.baslangicSaati.split(":")[1]);
                    const courseStartIndex = (courseStartHour - 8) * 2 + (courseStartMinutes >= 30 ? 1 : 0);

                    return {
                      ...course,
                      ...timeRange,
                      courseStartIndex,
                      courseDay,
                    };
                  });
                })
                .filter((course) => {
                  return course.courseDay === ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma"][day];
                })
                .map((course) => {
                  const rowSpan = calculateRowSpan(course.baslangicSaati, course.bitisSaati);

                  return (
                    <div
                      key={course.crn}
                      className="relative"
                      style={{
                        gridRow: `${course.courseStartIndex + 1} / span ${rowSpan}`,
                      }}
                    >
                      <div
                        className={`${course.color} rounded-lg text-white p-2 text-xs absolute inset-0`}
                        style={{
                          height: `${rowSpan * 2}rem`,
                        }}
                      >
                        {course.dersKodu} <br />
                        {course.dersAdi} <br />
                        {course.adSoyad} <br />
                        {course.baslangicSaati} - {course.bitisSaati || "?"}
                      </div>
                    </div>
                  );
                })}
            </div>
          ))}
          

        </div>
        </div>
      </div>
    </div>
  );
}
