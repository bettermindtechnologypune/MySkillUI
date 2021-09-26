import React, { FC, ChangeEvent } from 'react'
import { useState } from 'react';

export default function Main(props) {
  let selectStyle = {
    width: "20%",
  }
  const Main: FC = () => {
    const [task1, setTask1] = useState<number>(0);
    const [task2, setTask2] = useState<number>(0);
    const [task3, setTask3] = useState<number>(0);
    const [task4, setTask4] = useState<number>(0);
    const [task5, setTask5] = useState<number>(0);
  }

  const handleOnchange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value == "task1") { 
    setTask1(event.target.value);
  } else if (event.target.value == "task2") { 
  setTask2(event.target.value);
} else if (event.target.value == "task3") { 
setTask3(event.target.value);
} else if (event.target.value == "task4") { 
setTask4(event.target.value);
} else if (event.target.value == "task5") {
  setTask5(event.target.value)
}
    }
return (
  <div>
  <div className="sidebar">
  <a className="active" href="#home">Home</a>
  <a href="#news">News</a>
  <a href="#contact">Contact</a>
  <a href="#about">About</a>
</div>
  <div className=" container my-3 row justify-content-center">
    <h3 className="text-center">Ratings For User</h3>
  
    <div className="mainStyle p-2 m-1 col-4 ">
      <label className="labelOne btn-sm  margin-left text-center" htmlFor=""><h5>Task 1: </h5></label>
      <select className="selectOne" style={selectStyle} onChange={handleOnchange} name="task1">
        <option value="val1">0</option>
        <option value="val2">1</option>
        <option value="val2">2</option>
        <option value="val2">3</option>
        <option value="val2">4</option>
        <option value="val2">5</option>
      </select>
      <br />
      <label className="labelOne btn-sm col-xs-6 margin-left text-center" htmlFor=""><h5>Task 2: </h5></label>
      <select className="selectOne" style={selectStyle} onChange={handleOnchange} name="task2">
        <option value="val1">0</option>
        <option value="val2">1</option>
        <option value="val2">2</option>
        <option value="val2">3</option>
        <option value="val2">4</option>
        <option value="val2">5</option>
      </select>
      <br />
      <label className="labelOne btn-sm col-xs-6 margin-left text-center" htmlFor=""><h5>Task 3: </h5></label>
      <select className="selectOne" style={selectStyle} onChange={handleOnchange} name="task3">
        <option value="val1">0</option>
        <option value="val2">1</option>
        <option value="val2">2</option>
        <option value="val2">3</option>
        <option value="val2">4</option>
        <option value="val2">5</option>
      </select>
       <br />
      <label className="labelOne btn-sm col-xs-6 margin-left text-center" htmlFor=""><h5>Task 4: </h5></label>
      <select className="selectOne" style={selectStyle} onChange={handleOnchange} name="task4">
        <option value="val1">0</option>
        <option value="val2">1</option>
        <option value="val2">2</option>
        <option value="val2">3</option>
        <option value="val2">4</option>
        <option value="val2">5</option>
      </select>
      <br />
      <label className="labelOne btn-sm col-xs-6 margin-left text-center" htmlFor=""><h5>Task 5: </h5></label>
      <select className="selectOne" style={selectStyle} onChange={handleOnchange} name="task5">
        <option value="val1">0</option>
        <option value="val2">1</option>
        <option value="val2">2</option>
        <option value="val2">3</option>
        <option value="val2">4</option>
        <option value="val2">5</option>
      </select>
      <br />
      <button type="button" className=" selectButton btn btn-dark btn-sm my-3 mr-5">Submit</button>
    </div>
  </div>
  </div>
)
}




// {/* <script>
// $(function(){
//     var $select = $(".1-5");
//     for (i=1;i<=5;i++){
//         $select.append($('<option></option>').val(i).html(i))
//     }
// });
// // </script> */