import React from 'react';
import myData from '../ehb_lectures.course_spy.json';
import Semester from './box';
import MySvg from './my_svg';
let data = myData;
const App = () => {
  // const sample_lesson = {
  //   code: "Tur 1",
  //   onsart: [],
  //   tur: "itb"
  // };

  return (
    <>
    <div className="App">
    {[...Array(8)].map((_, i) => (
      <Semester data={data} index={i}/>
      ))}
    </div>
      <MySvg data={data}/>
    </>
  );
};

export default App;
