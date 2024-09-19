"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

// Define the Course interface to match the API data structure
interface Course {
  crn: string;
  dersKodu: string;
  dersAdi: string;
  ogretimYontemi: string;
  adSoyad: string;
  binaKodu: string;
  gunAdiTR: string;
  baslangicSaati: string;
  kontenjan: number;
  ogrenciSayisi: number;
  sinifProgram: string;
  onSart: string;
  sinifOnsart: string;
}

// Department options for the dropdown
const departmentOptions = [
  { label: 'AKM', value: 'AKM' },
  { label: 'ALM', value: 'ALM' },
  { label: 'ARB', value: 'ARB' },
  { label: 'ARC', value: 'ARC' },
  { label: 'ATA', value: 'ATA' },
  { label: 'BBF', value: 'BBF' },
  { label: 'BEB', value: 'BEB' },
  { label: 'BED', value: 'BED' },
  { label: 'BEN', value: 'BEN' },
  { label: 'BIL', value: 'BIL' },
  { label: 'BIO', value: 'BIO' },
  { label: 'BLG', value: 'BLG' },
  { label: 'BLS', value: 'BLS' },
  { label: 'BUS', value: 'BUS' },
  { label: 'CAB', value: 'CAB' },
  { label: 'CEN', value: 'CEN' },
  { label: 'CEV', value: 'CEV' },
  { label: 'CHA', value: 'CHA' },
  { label: 'CHE', value: 'CHE' },
  { label: 'CHZ', value: 'CHZ' },
  { label: 'CIE', value: 'CIE' },
  { label: 'CIN', value: 'CIN' },
  { label: 'CMP', value: 'CMP' },
  { label: 'COM', value: 'COM' },
  { label: 'CVH', value: 'CVH' },
  { label: 'DAN', value: 'DAN' },
  { label: 'DEN', value: 'DEN' },
  { label: 'DFH', value: 'DFH' },
  { label: 'DGH', value: 'DGH' },
  { label: 'DNK', value: 'DNK' },
  { label: 'DUI', value: 'DUI' },
  { label: 'EAS', value: 'EAS' },
  { label: 'ECN', value: 'ECN' },
  { label: 'ECO', value: 'ECO' },
  { label: 'EEE', value: 'EEE' },
  { label: 'EEF', value: 'EEF' },
  { label: 'EFN', value: 'EFN' },
  { label: 'EHA', value: 'EHA' },
  { label: 'EHB', value: 'EHB' },
  { label: 'EHN', value: 'EHN' },
  { label: 'EKO', value: 'EKO' },
  { label: 'ELE', value: 'ELE' },
  { label: 'ELH', value: 'ELH' },
  { label: 'ELK', value: 'ELK' },
  { label: 'ELT', value: 'ELT' },
  { label: 'END', value: 'END' },
  { label: 'ENE', value: 'ENE' },
  { label: 'ENG', value: 'ENG' },
  { label: 'ENR', value: 'ENR' },
  { label: 'ENT', value: 'ENT' },
  { label: 'ESL', value: 'ESL' },
  { label: 'EM', value: 'EM' },
  { label: 'ETK', value: 'ETK' },
  { label: 'EUT', value: 'EUT' },
  { label: 'FIZ', value: 'FIZ' },
  { label: 'FRA', value: 'FRA' },
  { label: 'FZK', value: 'FZK' },
  { label: 'GED', value: 'GED' },
  { label: 'GEM', value: 'GEM' },
  { label: 'GEO', value: 'GEO' },
  { label: 'GID', value: 'GID' },
  { label: 'GLY', value: 'GLY' },
  { label: 'GMI', value: 'GMI' },
  { label: 'GMK', value: 'GMK' },
  { label: 'GMZ', value: 'GMZ' },
  { label: 'GSB', value: 'GSB' },
  { label: 'GSN', value: 'GSN' },
  { label: 'GUV', value: 'GUV' },
  { label: 'GVT', value: 'GVT' },
  { label: 'GVZ', value: 'GVZ' },
  { label: 'HSS', value: 'HSS' },
  { label: 'HUK', value: 'HUK' },
  { label: 'IAD', value: 'IAD' },
  { label: 'ICM', value: 'ICM' },
  { label: 'ILT', value: 'ILT' },
  { label: 'IML', value: 'IML' },
  { label: 'IND', value: 'IND' },
  { label: 'ING', value: 'ING' },
  { label: 'INS', value: 'INS' },
  { label: 'ISE', value: 'ISE' },
  { label: 'ISH', value: 'ISH' },
  { label: 'ISL', value: 'ISL' },
  { label: 'ISP', value: 'ISP' },
  { label: 'ITA', value: 'ITA' },
  { label: 'ITB', value: 'ITB' },
  { label: 'JDF', value: 'JDF' },
  { label: 'JEF', value: 'JEF' },
  { label: 'JEO', value: 'JEO' },
  { label: 'JPN', value: 'JPN' },
  { label: 'KIM', value: 'KIM' },
  { label: 'KMM', value: 'KMM' },
  { label: 'KMP', value: 'KMP' },
  { label: 'KON', value: 'KON' },
  { label: 'LAT', value: 'LAT' },
  { label: 'MAD', value: 'MAD' },
  { label: 'MAK', value: 'MAK' },
  { label: 'MAL', value: 'MAL' },
  { label: 'MAR', value: 'MAR' },
  { label: 'MAT', value: 'MAT' },
  { label: 'MCH', value: 'MCH' },
  { label: 'MDN', value: 'MDN' },
  { label: 'MEK', value: 'MEK' },
  { label: 'MEN', value: 'MEN' },
  { label: 'MET', value: 'MET' },
  { label: 'MIM', value: 'MIM' },
  { label: 'MKN', value: 'MKN' },
  { label: 'MMD', value: 'MMD' },
  { label: 'MOD', value: 'MOD' },
  { label: 'MRE', value: 'MRE' },
  { label: 'MRT', value: 'MRT' },
  { label: 'MST', value: 'MST' },
  { label: 'MTH', value: 'MTH' },
  { label: 'MTK', value: 'MTK' },
  { label: 'MTM', value: 'MTM' },
  { label: 'MTO', value: 'MTO' },
  { label: 'MTR', value: 'MTR' },
  { label: 'MUH', value: 'MUH' },
  { label: 'MUK', value: 'MUK' },
  { label: 'MUT', value: 'MUT' },
  { label: 'MUZ', value: 'MUZ' },
  { label: 'MYZ', value: 'MYZ' },
  { label: 'NAE', value: 'NAE' },
  { label: 'NTH', value: 'NTH' },
  { label: 'ODS', value: 'ODS' },
  { label: 'PAZ', value: 'PAZ' },
  { label: 'PEM', value: 'PEM' },
  { label: 'PET', value: 'PET' },
  { label: 'PHE', value: 'PHE' },
  { label: 'PHY', value: 'PHY' },
  { label: 'PREP', value: 'PREP' },
  { label: 'RES', value: 'RES' },
  { label: 'ROS', value: 'ROS' },
  { label: 'RUS', value: 'RUS' },
  { label: 'SBP', value: 'SBP' },
  { label: 'SEC', value: 'SEC' },
  { label: 'SED', value: 'SED' },
  { label: 'SEN', value: 'SEN' },
  { label: 'SES', value: 'SES' },
  { label: 'SGI', value: 'SGI' },
  { label: 'SNT', value: 'SNT' },
  { label: 'SPA', value: 'SPA' },
  { label: 'STA', value: 'STA' },
  { label: 'STI', value: 'STI' },
  { label: 'TDW', value: 'TDW' },
  { label: 'TEB', value: 'TEB' },
  { label: 'TEK', value: 'TEK' },
  { label: 'TEL', value: 'TEL' },
  { label: 'TER', value: 'TER' },
  { label: 'TES', value: 'TES' },
  { label: 'THO', value: 'THO' },
  { label: 'TRN', value: 'TRN' },
  { label: 'TRS', value: 'TRS' },
  { label: 'TRZ', value: 'TRZ' },
  { label: 'TUR', value: 'TUR' },
  { label: 'UCK', value: 'UCK' },
  { label: 'ULP', value: 'ULP' },
  { label: 'UZB', value: 'UZB' },
  { label: 'VBA', value: 'VBA' },
  { label: 'X100', value: 'X100' },
  { label: 'YTO', value: 'YTO' },
  { label: 'YZV', value: 'YZV' },
];

// Mapping of department codes to their respective IDs required by the API
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
  "MEK": 47,
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
  "YZV": 221,
};

// Function to fetch course data for a department from the proxy API
async function fetchCourses(department: string) {
  try {
    const response = await axios.get('/api/proxy', {
      params: {
        ProgramSeviyeTipiAnahtari: "LS",
        __RequestVerificationToken: "YourTokenHere", // Replace with the actual token
        dersBransKoduId: departmentCodes[department],
      },
    });

    if (response.status === 200) {
      console.log(`Response data for department ${department}:`, response.data);

      let dersProgramList = response.data.dersProgramList || [];

      // If dersProgramList is not an array, convert it to an array
      if (!Array.isArray(dersProgramList)) {
        dersProgramList = Object.values(dersProgramList);
        console.log(`Converted dersProgramList to array for ${department}:`, dersProgramList);
      }

      return dersProgramList;
    } else {
      console.error(`Failed to fetch data for ${department}: Status ${response.status}`);
      return [];
    }
  } catch (error) {
    console.error(`Error fetching data for ${department}:`, error);
    return [];
  }
}

export default function CourseTable() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('EHB'); // Default department
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Handler for department selection change
  const handleDepartmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const department = event.target.value;
    setSelectedDepartment(department);
  };

  // Fetch courses whenever the selected department changes
  useEffect(() => {
    const fetchAndSetCourses = async () => {
      if (selectedDepartment) {
        setLoading(true);
        setError(null);
        try {
          const fetchedCourses = await fetchCourses(selectedDepartment);
          setCourses(fetchedCourses);
        } catch (err) {
          setError('Failed to fetch courses');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAndSetCourses();
  }, [selectedDepartment]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-4 text-black text-center">Course List</h1>

      {/* Link to the Create Schedule page */}
      <div className="flex justify-center mt-6 mb-8">
        <Link href="/schedule">
          <button
            type="button"
            className="py-2.5 px-5 text-m font-medium text-white focus:outline-none bg-blue-600 rounded-full hover:bg-blue-700 focus:z-10 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 dark:bg-blue-800 dark:hover:bg-blue-900"
          >
            Create Schedule
          </button>
        </Link>
      </div>

      {/* Department selection dropdown */}
      <div className="mb-4 flex justify-center">
        <label className="block text-gray-900 font-bold mt-2 text-center text-xl mr-4">Select Department:</label>
        <select
          value={selectedDepartment}
          onChange={handleDepartmentChange}
          className="p-2 border rounded-lg w-48"
        >
          {departmentOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Loading and error messages */}
      {loading && (
        <div className="flex justify-center">
          <p>Loading courses...</p>
        </div>
      )}

      {error && (
        <div className="flex justify-center">
          <p>{error}</p>
        </div>
      )}

      {/* Courses table */}
      {!loading && !error && courses.length > 0 && (
        <div className="flex justify-center w-auto">
          <table className="bg-white border border-gray-200">
            <thead className="bg-blue-800 text-white">
              <tr>
                <th className="py-2 px-4 border">CRN</th>
                <th className="py-2 px-4 border">Ders Kodu</th>
                <th className="py-2 px-4 border">Ders Adı</th>
                <th className="py-2 px-4 border">Öğretim Yöntemi</th>
                <th className="py-2 px-4 border">Öğretim Üyesi</th>
                <th className="py-2 px-4 border">Bina</th>
                <th className="py-2 px-4 border">Gün</th>
                <th className="py-2 px-4 border">Saat</th>
                <th className="py-2 px-4 border">Kontenjan</th>
                <th className="py-2 px-4 border">Yazılan</th>
                <th className="py-2 px-4 border">Dersi Alabilen Programlar</th>
                <th className="py-2 px-4 border">Ders Önşartları</th>
                <th className="py-2 px-4 border">Sınıf Önşartı</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{course.crn}</td>
                  <td className="py-2 px-4 border">{course.dersKodu}</td>
                  <td className="py-2 px-4 border">{course.dersAdi}</td>
                  <td className="py-2 px-4 border">{course.ogretimYontemi}</td>
                  <td className="py-2 px-4 border">{course.adSoyad}</td>
                  <td className="py-2 px-4 border">{course.binaKodu}</td>
                  <td className="py-2 px-4 border">{course.gunAdiTR}</td>
                  <td className="py-2 px-4 border">{course.baslangicSaati}</td>
                  <td className="py-2 px-4 border">{course.kontenjan}</td>
                  <td className="py-2 px-4 border">{course.ogrenciSayisi}</td>
                  <td className="py-2 px-4 border">{course.sinifProgram}</td>
                  <td className="py-2 px-4 border">{course.onSart}</td>
                  <td className="py-2 px-4 border">{course.sinifOnsart}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Message when no courses are available */}
      {!loading && !error && courses.length === 0 && (
        <div className="flex justify-center">
          <p>No courses available for this department.</p>
        </div>
      )}
    </div>
  );
}
