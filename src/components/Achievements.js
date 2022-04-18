import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import './Achievements.css'

function Achievements() {

  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");

  const customFunction = (d) => {
    sessionStorage.setItem("achievements", JSON.stringify(d))
    const data = JSON.parse(sessionStorage.getItem('achievements'))
    console.log(sessionStorage.key(0))
    console.log(data)
  }
  return (
    <>
      <form onSubmit={handleSubmit((data) => customFunction(data))}>
      <div className="buttons">
        <button className="button2">Cancel</button>
        <input type="submit" name="aboutme" value="Save" />
        <button className="button1"><i><FaArrowRight /></i></button>
      </div>
      <div className="achievement">
        <label className="achievement-name">
          Name of Achievement
          <input {...register("name")}  name="name" placeholder="Name of Achievement" id="name" />
        </label>
        <label className="achievement-desc">
          Description
        </label>
          <textarea className="desc" {...register('desc')} name="desc" placeholder="Write about achivement briefly" id="desc" cols="36" rows="5"></textarea> 

    </div>
    <div className="footer">
        <span className="plus"><FaPlus /></span><input className="element" {...register('addAchievement')} type="text" name="addAchievement[]" placeholder='Add Achievements' value="Add education details" />
    </div>
        
        
      </form>
    </>
  );
}


export default Achievements