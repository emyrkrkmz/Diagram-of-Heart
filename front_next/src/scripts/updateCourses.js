const axios = require('axios');
const fs = require('fs');
const path = require('path');

//dersBransKoduId
const departmentCodes = {
	AKM: 42,
	ALM: 227,
	ARB: 305,
	ARC: 302,
	ATA: 43,
	BBF: 310,
	BEB: 200,
	BED: 149,
	BEN: 165,
	BIL: 38,
	BIO: 30,
	BLG: 3,
	BLS: 180,
	BUS: 155,
	CAB: 127,
	CEN: 304,
	CEV: 7,
	CHA: 169,
	CHE: 137,
	CHZ: 81,
	CIE: 142,
	CIN: 245,
	CMP: 146,
	COM: 208,
	CVH: 168,
	DAN: 243,
	DEN: 10,
	DFH: 163,
	DGH: 181,
	DNK: 44,
	DUI: 32,
	EAS: 141,
	ECN: 232,
	ECO: 154,
	EEE: 289,
	EEF: 294,
	EFN: 297,
	EHA: 182,
	EHB: 196,
	EHN: 241,
	EKO: 39,
	ELE: 59,
	ELH: 2,
	ELK: 1,
	ELT: 178,
	END: 15,
	ENE: 183,
	ENG: 179,
	ENR: 207,
	ENT: 225,
	ESL: 140,
	EM: 163,
	ETK: 110,
	EUT: 22,
	FIZ: 28,
	FRA: 226,
	FZK: 175,
	GED: 138,
	GEM: 11,
	GEO: 74,
	GID: 4,
	GLY: 162,
	GMI: 46,
	GMK: 176,
	GMZ: 109,
	GSB: 53,
	GSN: 173,
	GUV: 31,
	GVT: 177,
	GVZ: 111,
	HSS: 256,
	HUK: 41,
	IAD: 301,
	ICM: 63,
	ILT: 253,
	IML: 112,
	IND: 300,
	ING: 33,
	INS: 8,
	ISE: 153,
	ISH: 231,
	ISL: 14,
	ISP: 228,
	ITA: 255,
	ITB: 50,
	JDF: 9,
	JEF: 19,
	JEO: 18,
	JPN: 202,
	KIM: 27,
	KMM: 6,
	KMP: 125,
	KON: 58,
	LAT: 156,
	MAD: 16,
	MAK: 12,
	MAL: 48,
	MAR: 148,
	MAT: 26,
	MCH: 160,
	MDN: 293,
	MEK: 48,
	MEN: 258,
	MET: 5,
	MIM: 20,
	MKN: 184,
	MMD: 290,
	MOD: 150,
	MRE: 157,
	MRT: 158,
	MST: 257,
	MTH: 143,
	MTK: 174,
	MTM: 260,
	MTO: 23,
	MTR: 199,
	MUH: 29,
	MUK: 40,
	MUT: 126,
	MUZ: 128,
	MYZ: 309,
	NAE: 259,
	NTH: 263,
	ODS: 161,
	PAZ: 151,
	PEM: 64,
	PET: 17,
	PHE: 262,
	PHY: 147,
	PREP: 203,
	RES: 36,
	ROS: 307,
	RUS: 237,
	SBP: 21,
	SEC: 308,
	SED: 288,
	SEN: 171,
	SES: 124,
	SGI: 291,
	SNT: 193,
	SPA: 172,
	STA: 37,
	STI: 159,
	TDW: 261,
	TEB: 121,
	TEK: 13,
	TEL: 57,
	TER: 49,
	TES: 269,
	THO: 129,
	TRN: 65,
	TRS: 215,
	TRZ: 170,
	TUR: 34,
	UCK: 25,
	ULP: 195,
	UZB: 24,
	VBA: 306,
	X100: 198,
	YTO: 213,
	YZV: 221
};

const endpoint = "https://obs.itu.edu.tr/public/DersProgram/DersProgramSearch/";
const commonParams = {
  ProgramSeviyeTipiAnahtari: "LS",
  __RequestVerificationToken: "CfDJ8Dd6cj-fJbpOiyzKlObx1AhvXPKAK_9ThGzBAhakWX-M0x2P5OaDIjSeGndpRDYgFtoeAqmvKce9KReR7hUfhqdg4NXvQmfeAgEggC3f0SFFA65qIwkqmcmXla-EM1qhGVPvvXCQohX2zfQT9ttDpvs",
};

async function fetchSchedule(department) {
	try {
	  const response = await axios.post(endpoint, {
		...commonParams,
		dersBransKoduId: departmentCodes[department], 
	  }, {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		}
	  });
  
	  if (response.status === 200) {
		console.log(`Data fetched for ${department}`);
		return response.data;
	  } else {
		console.error(`Failed to fetch data for ${department}: Status ${response.status}`);
		return null;
	  }
	} catch (error) {
	  if (error.response) {
		console.error(`Error fetching data for ${department}:`, error.response.data);
	  } else {
		console.error(`Error fetching data for ${department}:`, error.message);
	  }
	  return null;
	}
  }
  
// Function to save data to a JSON file
function saveToFile(department, data) {
  const filePath = path.join(__dirname, `../../data/schedule_data/${department.toLowerCase()}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`Updated ${filePath}`);
}

// Main function to fetch and update all JSON files
async function updateAllJsons() {
  for (const department in departmentCodes) {
    console.log(`Updating data for ${department}...`);
    const scheduleData = await fetchSchedule(department);
    
    if (scheduleData) {
      saveToFile(department, scheduleData);
    } else {
      console.error(`Skipping ${department} due to fetch failure.`);
    }
  }

  console.log("All JSON files updated!");
}

// Run the update script
updateAllJsons();
