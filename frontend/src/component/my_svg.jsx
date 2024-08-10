import React, { useEffect, useState } from 'react';

function MySvg(props) {


   const [coords, setCoords] = useState([]);
   const [desCoords, setDesCoords] = useState([]);

   const calculateCoords = () => {
      const boxes = Array.from(document.getElementsByClassName('box'));
      const newCoords = boxes.map(box => {
         const rect = box.getBoundingClientRect();
         return {
            id: box.id,
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height
         };
      });
      setCoords(newCoords);
   };

   const calculateDesCoords = () => {
      const boxes = Array.from(document.getElementsByClassName('box'));
      const newCoords = boxes.map(box => {
         const rect = box.getBoundingClientRect();
         return {
            id: box.id,
            x: rect.left + rect.width / 2,
            y: rect.top
         };
      });
      setDesCoords(newCoords);
   };

   useEffect(() => {
      calculateCoords();
      calculateDesCoords();
      const handleResize = () => {
         calculateCoords();
         calculateDesCoords();
      };

      window.addEventListener('resize', handleResize);

      return () => {
         window.removeEventListener('resize', handleResize);
      };

   }, []);

   const getCoordById = (id) => {
      return coords.find(coord => coord.id === id);
   };

   const getDesCoordById = (id) => {
      return desCoords.find(coord => coord.id === id);
   };



   return (

      <svg height="100%" width="100%" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
         {props.data.map((lesson) => (
            lesson.prerequisite.map((prereq) => {
               const startCoord = getCoordById(`box${prereq}`);
               const endCoord = getDesCoordById(`box${lesson.code}`);
               if (startCoord && endCoord) {
                  return (
                     <line
                        key={`${prereq}-${lesson.code}`}
                        x1={startCoord.x}
                        y1={startCoord.y}
                        x2={endCoord.x}
                        y2={endCoord.y}
                        style={{ stroke: 'pink', strokeWidth: 2 }}
                     />
                  );
               }
               return null;
            })))}
      </svg>

   )
}

export default MySvg;