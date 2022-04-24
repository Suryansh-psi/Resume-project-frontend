import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BsPlusCircle } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import './EditAboutMe.css';


const EditAboutMe = () => {
  const [term, setTerm] = useOutletContext();
  const { register, handleSubmit, formState:{errors}, reset, trigger} = useForm();
  const [data, setData] = useState("");
  const [resumeInfo, setResumeInfo] = useState({});
  const [temp, setTemp] = useState(0);


  useEffect(() => {
    const id = 1;
    let result = async () => {
      try {
        const result2 = await axios.get(`http://localhost:8080/resume/alldetails/${id}`).then(res => {
          const response = res.data;
          setResumeInfo(response);
          console.log(response);
        })
      }
      catch (err) {
        console.log(err);
      }
    }
    result();
  }, [temp]);

  const customFunction = (d) => {
    console.log(resumeInfo);
    // const element = document.querySelectorAll('.aboutmepoints');
    // const aboutList = [];
    
    // element.forEach((ele) => {
    //   aboutList.push(ele.value);
    // });
    // const resume_id = sessionStorage.getItem('resume_id');

    // console.log(d);
    // axios.put(`http://localhost:8080/resume/about/${resume_id}`, {
    //   about_me: d.about,
    //   about_me_points: aboutList
    // })
    //   .then(res => {
    //     // console.log(res);
    //     // console.log(res.data);
    //   })
    //   setTerm(2);


    //   sessionStorage.setItem("aboutMe", d.about);
    //   sessionStorage.setItem("aboutMePoints", aboutList);
    //   reset();
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

  const aboutMePointsMapper = () => {
    if(typeof(resumeInfo.about_me_points) !== undefined || typeof(resumeInfo.about_me_points) !== null) {
      let result = resumeInfo.about_me_points.map((data, index) => {
        return <input {...register('points')} 
        className="aboutmepoints" type="text" 
        name="points[]" placeholder="Write in bulleted list" value={data}/>
      })
      return result;
    }
  }

          


	return (
    <form onSubmit={handleSubmit((data) => customFunction(data))}>
      <h2>Edit my details</h2>
      <div className="buttons"> 
        <button className="button2">Cancel</button>     
        <input type="submit" name="aboutme" value="Save" />
        
        <button className="button1"><i><FaArrowRight /></i></button>
      </div>
      <div className="aboutSection">
        <label className="label">About Me</label>
        <textarea value={resumeInfo.about_me} className={`textarea ${errors.about && "invalid"}`} 
        {...register('about',{required: "*required",
        maxLength: {
          value: 500,
          message: "*limit exceed"
        }
        })}
        onKeyUp={() =>{
          trigger("about");
        }}
        name="about" placeholder="Write something about yourself (max 500 words)" id="about" cols="30" rows="10"></textarea> 
        {errors.about && (
          <small className="text-danger">{errors.about.message}</small>

        )}
        <div className="bulletPoints">
          {(resumeInfo.about_me_points) ? aboutMePointsMapper() : null}
          <i onClick={addBulletPoint}><BsPlusCircle/></i>
        </div>
      </div>
      
    </form>
  );
}

export default EditAboutMe;