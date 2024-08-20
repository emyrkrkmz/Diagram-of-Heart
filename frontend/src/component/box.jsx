import React ,{useState} from 'react';
import myData from '../ehb_lectures.course_spy.json';
import preData from "../ehb_lectures.elective_spy.json"




function Box(props) {
   return (
      props.lesson.code !== "ELECTIVE" ?
         <div className='box' id={`box${props.lesson.code}`} key={`box${props.lesson.code}`}>
            <p>{props.lesson.name}</p>
         </div> :
         
            <ElecBox lesson={props.lesson} data={props.data}/>
         
   )
}

function Semester(props) {
   return (
      <div className='semesters' key={`semester${props.index}`}>
         {myData.map((lesson, index) =>
            (lesson.semester === props.index + 1) ? (
               <Box lesson={lesson} data={props.data}/>
            ) : null
         )}
      </div>
   )
}


function ElecBox(prompt) {
   const [less,setLesson] = useState(prompt.lesson);
   const changeLesson =(value)=>{
      setLesson(value);
      prompt.data.map((lesson,index)=>{
         if(less.name===lesson.name){
            prompt.data[index]=value;
         }
         
      })
   }
   
   return (
      <>
         <div className="box elecBox dropdown" id={`box${less.code}`} name={`${less.code}`}>
            <p id={`${less.name}`}>{less.name}</p>
            <ul className='selecticive_lesson' key={prompt.lesson.name}>
               {preData.map((lesson) => (
                  lesson.name === prompt.lesson.name ? lesson.course_list.map((preq) => (
                     <li key={preq.code} name={preq.name} id={`drop${preq.code}`} onClick={()=>changeLesson(preq)}>
                        {preq.name}
                     </li>
                  )) : null
               ))}
            </ul>
         </div>
      </>
   );
}
export default Semester;