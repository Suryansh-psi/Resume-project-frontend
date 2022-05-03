import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";
import { BsPlusCircle } from "react-icons/bs";
import './EditAchievements.css';
import axios from 'axios';
import { GrFormClose } from "react-icons/gr";
import { useOutletContext, useParams } from "react-router-dom";


const EditAchievements = (props) => {
  const [term, setTerm] = useOutletContext();
  const { register, handleSubmit, reset } = useForm();
  const [data, setData] = useState("");

  const [temp, setTemp] = useState(0);
  const [resumeInfo, setResumeInfo] = useState({});
  const id = sessionStorage.getItem("editIdUser");
  
  useEffect(() => {
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
    const achievementInputs = document.querySelectorAll('.achievement-class-inputs');
    const certificateInputs = document.querySelectorAll('.certification-input');
    let achievementList = [];
    let certificateList = [];
    achievementInputs.forEach((val) => {
      if (val.value !== "") {
        achievementList.push(val.value);
      }
    });
    certificateInputs.forEach((val) => {
      if (val.value !== "") {
        certificateList.push(val.value);
      }
    });
    axios.put(`http://localhost:8080/resume/achievement/${id}`, {
      "achievement": [...resumeInfo.achievement, ...achievementList],
      "certificate": [...resumeInfo.certificate, ...certificateList]
    })
      .then(res => {
        let date = new Date();
        setTerm(date.toLocaleString());
      })
    setResumeInfo({ ...resumeInfo, "achievement": [...resumeInfo.achievement, ...achievementList], "certificate": [...resumeInfo.certificate, ...certificateList] });
    setTerm(6);
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

  const deletethisbubble = (index) => {
    setResumeInfo({
      ...resumeInfo, "achievement": resumeInfo.achievement.filter((ele, i) => {
        return i !== index;
      })
    })
  }

  const deletethisbubble2 = (index) => {
    setResumeInfo({
      ...resumeInfo, "certificate": resumeInfo.certificate.filter((ele, i) => {
        return i !== index;
      })
    })
  }

  const achievementBulbleMapping = () => {
    let result = [];
    result = resumeInfo.achievement.map((data, index) => {
      return (
        <li>{data} <span className="achClose" onClick={() => deletethisbubble(index)}><GrFormClose/></span></li>
      )
    });
    return result;
  }

  const certificateBubbleMapping = () => {
    let result = [];
    result = resumeInfo.certificate.map((data, index) => {
      return (
        <>
          <li>{data} <span  className="achClose" onClick={() => deletethisbubble2(index)}><GrFormClose/></span></li>
        </>
      )
    });
    return result;
  }



  return (
    <>
      <form onSubmit={handleSubmit((data) => customFunction(data))}>
        <div className="buttons">
          <button className="button2">Cancel</button>
          <input type="submit" name="aboutme" value="Save" />
          <button className="button1"><i><FaArrowRight /></i></button>
        </div>
        <div className="achievementEdit">
          <h6>Achievements</h6>
          <div>
            <ul>
              {(resumeInfo.achievement) ? achievementBulbleMapping() : null}
            </ul>
          </div>
        </div>

        <div className="certificationEdit">
          <h6>Certification</h6>
          <div>
            <ul>
              {(resumeInfo.certificate) ? certificateBubbleMapping() : null}
            </ul>
          </div>
        </div>

        <div className="achievement">
          <label className="achievement-name">
            Name of Achievement
            <input {...register("achievement")} name="achievement[]" placeholder="Name of Achievement" id="name" className="achievement-class-inputs" />
            <i className="Ach" onClick={() => cloneFields("achievement[]", "Name of Achievement", "achievement-name", "achievement", "achievement-class-inputs")}><BsPlusCircle /></i>
          </label>
        </div>

        <div className="achievement">
          <label className="certificate-name">
            Name of Certification
            <input className="certification-input" {...register('certification')} name="certification[]" placeholder="Name of Certification" id="desc" />
            <i className="Ach" onClick={() => cloneFields("certification[]", "Name of Certification", "certificate-name", "certification", "certification-input")}><BsPlusCircle /></i>
          </label>
        </div>


      </form>
    </>
  );
}


export default EditAchievements;