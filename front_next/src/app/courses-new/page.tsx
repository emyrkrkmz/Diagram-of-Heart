"use client"
import { useState } from 'react';
import Link from 'next/link';
// Import your JSON data
import eefData from '../../../data/schedule_data/eef.json';
import ehbData from '../../../data/schedule_data/ehb.json';
import endData from '../../../data/schedule_data/end.json';
import konData from '../../../data/schedule_data/kon.json';
import blgData from '../../../data/schedule_data/blg.json';
import ecnData from '../../../data/schedule_data/ecn.json';

interface Course {
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

const departmentOptions = [
  { label: 'EEF', value: 'eef' },
  { label: 'EHB', value: 'ehb' },
  { label: 'END', value: 'end' },
  { label: 'KON', value: 'kon' },
  { label: 'BLG', value: 'blg' },
  { label: 'ECN', value: 'ecn' }
];

const departmentDataMap: Record<string, Course[]> = {
  eef: eefData,
  ehb: ehbData,
  end: endData,
  kon: konData,
  blg: blgData,
  ecn: ecnData
};

export default function CourseTable () {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('ehb'); // Default to 'ehb'
  const [courses, setCourses] = useState<Course[]>(departmentDataMap[selectedDepartment]);

  const handleDepartmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const department = event.target.value;
    setSelectedDepartment(department);
    setCourses(departmentDataMap[department]);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-4 text-black text-center">Course List</h1>
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

      <div className="flex justify-center w-auto">
        <table className="bg-white border border-gray-200">
          <thead className="bg-blue-800 text-white ">
            <tr>
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
    </div>
  );
};

