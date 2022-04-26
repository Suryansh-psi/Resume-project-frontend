import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";
import { BsPlusCircle } from "react-icons/bs";
import './Achievements.css';
import axios from 'axios';
import { useOutletContext } from "react-router-dom";


function Achievements() {
  const [term, setTerm] = useOutletContext();
  const { register, handleSubmit, formState:{errors}, reset, trigger} = useForm();
  const [data, setData] = useState("");

  const customFunction = (d) => {
    // sessionStorage.setItem("achievements", JSON.stringify(d))
    // const data = JSON.parse(sessionStorage.getItem('achievements'))
    // console.log(sessionStorage.key(0))
    // console.log(data)

    const achievementInputs = document.querySelectorAll('.achievement-class-inputs');
    const certificateInputs = document.querySelectorAll('.certification-input');
    let achievementList = [];
    let certificateList = [];
    achievementInputs.forEach((val) => {
      achievementList.push(val.value);
    });

    certificateInputs.forEach((val) => {
      certificateList.push(val.value);
    });
    const resume_id = sessionStorage.getItem('resume_id');
    axios.put(`http://localhost:8080/resume/achievement/${resume_id}`, {
      "achievement": achievementList,
      "certificate": certificateList,
      "training": ["string"]
    })
      .then(res => {
        // console.log(res);
        // console.log(res.data);
      })
    setTerm(6);
    sessionStorage.setItem("achievement", achievementList);
    sessionStorage.setItem("certificate", certificateList);
    reset();
  }


  const cloneFields = (name1, placeholder, classN, regis, inputClass) => {
    const inp = document.createElement("input");
    inp.setAttribute('type', 'text');
    inp.setAttribute('name', name1);
    inp.setAttribute('placeholder', placeholder);
    inp.setAttribute('class', inputClass);
    inp.setAttribute('object', `{...register(${regis})}`);
    document.querySelector(`.${classN}`).appendChild(inp);
  }
  return (
    <>
      <form onSubmit={handleSubmit((data) => customFunction(data))}>
        <div className="buttons">
          <button className="button2">Cancel</button>
          <input className="bt" type="submit" name="aboutme" value="Save" />
          <button className="button1"><i><FaArrowRight /></i></button>
        </div>
        <div className="achievement">
          <label className="achievement-name">
            Name of Achievement
            <input className={`achievement-class-inputs ${errors.achievement && "invalid"}`}
            {...register("achievement", {required: "*required"})} 
            onKeyUp={() =>{
              trigger("achievement");
            }} 
            name="achievement[]" placeholder="Name of Achievement" id="name" />
            <i className="Ach" onClick={() => cloneFields("achievement[]", "Name of Achievement", "achievement-name", "achievement", "achievement-class-inputs")}><BsPlusCircle /></i>
            {errors.achievement &&(
              <small className="text-danger">{errors.achievement.message}</small>
            )}
          </label>
        </div>

        <div className="achievement">
          <label className="certificate-name">
            Name of Certification
            <input className={`certification-input ${errors.certification && "invalid"}`}
            {...register('certification', {required: "*required"})} 
            onKeyUp={() =>{
              trigger("certification");
            }}
             name="certification[]" placeholder="Name of Certification" id="desc" />
            <i className="Ach" onClick={() => cloneFields("certification[]", "Name of Certification", "certificate-name", "certification", "certification-input")}><BsPlusCircle /></i>
            {errors.certification &&(
              <small className="text-danger">{errors.certification.message}</small>
            )}
          </label>
        </div>


      </form>
    </>
  );
}


export default Achievements