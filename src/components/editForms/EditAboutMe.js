import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BsPlusCircle } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";
import { GrFormClose } from "react-icons/gr";
import axios from "axios";
import './EditAboutMe.css';


const EditAboutMe = (props) => {
  const [term, setTerm] = useOutletContext();
  const { register, handleSubmit, formState: { errors }, reset, trigger } = useForm();
  const [data, setData] = useState("");
  const [resumeInfo, setResumeInfo] = useState({});
  const [temp, setTemp] = useState(0);
  const id = sessionStorage.getItem("editIdUser");


  useEffect(() => {
    const id = sessionStorage.getItem("editIdUser");
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

    const element = document.querySelectorAll('.aboutmepoints');
    const aboutList = [];
    element.forEach((ele) => {
      if(ele.value !== "") {
        aboutList.push(ele.value);
      }
    });

    axios.put(`http://localhost:8080/resume/about/${id}`, {
      "about_me": resumeInfo.about_me,
      "about_me_points": [...resumeInfo.about_me_points, ...aboutList]
    }).then(res => {
      let date = new Date();
      setTerm(date.toLocaleString());
      console.log(res.data);
    })
    setResumeInfo({ ...resumeInfo, "about_me_points": [...resumeInfo.about_me_points, ...aboutList] });
    setTerm(2);
    reset();
  }


  const addBulletPoint = () => {
    const inp = document.createElement("input");
    inp.setAttribute('type', 'text');
    inp.setAttribute('name', 'points[]');
    inp.setAttribute('placeholder', 'Write in bulleted list');
    inp.setAttribute('class', 'aboutmepoints');
    // inp.setAttribute('object', '{...register(points)}');
    document.querySelector(".bulletPoints").appendChild(inp);
  }

  const deleteRolePoints = (key) => {
    setResumeInfo({
      ...resumeInfo, "about_me_points": resumeInfo.about_me_points.filter((ele, i) => {
        return i !== key;
      })
    })
  }

  const aboutMePointsMapper = () => {
    // if(typeof(resumeInfo.about_me_points) !== undefined || typeof(resumeInfo.about_me_points) !== null) {
    let result = resumeInfo.about_me_points.map((data, index) => {
      return (
        <>
          <input   className="pts" type="text"
        name="points[]" placeholder="Write in bulleted list" value={data} />
          <span onClick={() => deleteRolePoints(index)} className="cross1"><GrFormClose/></span>
        </>
    )})
    return result;
    // }
  }

  

  const handleChange = name => event => {
    setResumeInfo({ ...resumeInfo, [name]: event.target.value })
  }

  return (
    <form onSubmit={handleSubmit((data) => customFunction(data))}>
    {/* <form onSubmit={handleFormSubmit}> */}
      <div className="buttons">
        <button className="button2">Cancel</button>
        <input type="submit" name="aboutme" value="Save" />
        <button className="button1"><i><FaArrowRight /></i></button>
      </div>
      <div className="aboutSection">
        <label className="label">About Me</label>
        <textarea value={resumeInfo.about_me}
          // className="textarea"
          className={`textarea ${errors.about && "invalid"}`} 
          {...register('about',{required: "*required",
          maxLength: {
            value: 500,
            message: "*limit exceed"
          }
          })}
          onKeyUp={() =>{
            trigger("about");
          }}
          onChange={handleChange("about_me")}
          name="about"
          placeholder="Write something about yourself (max 500 words)"
          id="about" cols="30" rows="10"></textarea>
        {/* {errors.about && (
          <small className="text-danger">{errors.about.message}</small>

        )} */}
        <div>
        {(resumeInfo.about_me_points) ? aboutMePointsMapper() : null}
        </div>

        <div className="bulletPoints">
          
          {/* <span className="cross"><GrFormClose/></span> */}
          
          <i className="bPts"   onClick={addBulletPoint}><BsPlusCircle /></i>
        </div>
      </div>

    </form>
  );
}

export default EditAboutMe;