import React from 'react';
import myData from '../ehb_lectures.course_spy.json';
import Semester from './box';
import MySvg from './my_svg';

const App = () => {
  // const sample_lesson = {
  //   code: "Tur 1",
  //   onsart: [],
  //   tur: "itb"
  // };

  return (
    <div className="App">
    {[...Array(8)].map((_, i) => (
      <Semester data={myData} index={i}/>
      ))}
      
      <MySvg data={myData}/>

    </div>
  );
};

export default App;
