import React, { useState } from 'react';
import myData from '../ehb_lectures.course_spy.json';
import preData from "../ehb_lectures.elective_spy.json"




function Box(props) {
   return (
      props.lesson.code !== "ELECTIVE" ?
         <div className='box' id={`box${props.lesson.code}`} key={`box${props.lesson.code}`}>
            {props.lesson.name}
         </div> :
         <><div className='box' id={`box${props.lesson.code}`} key={`box${props.lesson.code}`} name={`box${props.lesson.name}`}>
            {props.lesson.name}
            <ElecBox name={props.lesson.name}/>
         </div>
            </>


   )
}

function Semester(props) {
   return (
      <div className='semesters' key={`semester${props.index}`}>
         {myData.map((lesson, index) =>
            (lesson.semester === props.index + 1) ? (
               <Box lesson={lesson} />
            ) : null
         )}
      </div>
   )
}


function ElecBox(prompt) {
   const [show, setShow] = useState(false);

   const dropdown = () => {
      setShow(!show);
   }

   return (
      <div className="elecBox" onClick={dropdown} style={{ cursor: 'pointer' }}>
         tıkla
         {show && (
            <ul className='selecticive_lesson'>
               {preData.map((lesson) => (
                  lesson.name === prompt.name ? lesson.course_list.map((preq) => (
                     <li key={preq.code} name={preq.name} id={`drop${preq.code}`}>
                        {preq.name}
                     </li>
                  )) : null
               ))}
            </ul>
         )}
      </div>
   );
}

export default Semester;