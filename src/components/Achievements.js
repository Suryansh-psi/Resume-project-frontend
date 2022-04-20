import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";
import { BsPlusCircle } from "react-icons/bs";
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
          <i className="Ach"><BsPlusCircle /></i>
        </label>
        <label className="achievement-name">
          Name of Certification
        </label>
          <input className="certification" {...register('desc')} name="desc" placeholder="Name of Certification" id="desc"/> 
          <i className="Ach"><BsPlusCircle /></i>

    </div>
        
        
      </form>
    </>
  );
}


export default Achievements