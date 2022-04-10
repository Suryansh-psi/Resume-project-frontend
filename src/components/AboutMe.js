import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BsPlusCircle } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import './AboutMe.css'
function AboutMe() {
  const [term, setTerm] = useOutletContext();
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");

  const customFunction = (d) => {
    // sessionStorage.setItem("aboutme", JSON.stringify(d))
    // const data = JSON.parse(sessionStorage.getItem('aboutme'))
    // console.log(sessionStorage.key(0))
    // console.log(data)
    const element = document.querySelectorAll('.aboutmepoints');
    const aboutList = [];
    
    element.forEach((ele) => {
      aboutList.push(ele.value);
    });
    // console.log(aboutList)
    const resume_id = sessionStorage.getItem('resume_id');
    // console.log(resume_id);

    console.log(d);
    axios.put(`http://localhost:8080/resume/about/${resume_id}`, {
      about_me: d.about,
      about_me_points: aboutList
    })
      .then(res => {
        // console.log(res);
        // console.log(res.data);
      })
      setTerm(2);


      sessionStorage.setItem("aboutMe", d.about);
      sessionStorage.setItem("aboutMePoints", aboutList);
  }

  const addBulletPoint = () => {
    const inp = document.createElement("input");
    inp.setAttribute('type', 'text');
    inp.setAttribute('name', 'points[]');
    inp.setAttribute('placeholder', 'Write in bulleted list');
    inp.setAttribute('class', 'aboutmepoints');
    inp.setAttribute('object', '{...register(points)}');
    document.querySelector(".bulletPoints").appendChild(inp);
  }

  


	return (
    <form onSubmit={handleSubmit((data) => customFunction(data))}>
      <div className="buttons"> 
        <button className="button2">Cancel</button>     
        <input type="submit" name="aboutme" value="Save" />
        
        <button className="button1"><FaArrowRight /></button>
      </div>
      <div className="aboutSection">
        <label className="label">About Me</label>
        <textarea className="textarea" {...register('about')} name="about" placeholder="Write something about yourself" id="about" cols="30" rows="10"></textarea> 
        <div className="bulletPoints">
          <input {...register('points')} className="aboutmepoints" type="text" name="points[]" placeholder="Write in bulleted list" />
          <i onClick={addBulletPoint}><BsPlusCircle/></i>
      </div>
      </div>
      
    </form>
  );
}

export default AboutMe