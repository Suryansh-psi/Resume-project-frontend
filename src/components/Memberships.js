import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import './Memberships.css';
import axios from 'axios';
import { useOutletContext } from "react-router-dom";
import { BsPlusCircle } from "react-icons/bs";


function Memberships() {
  const [term, setTerm] = useOutletContext();
  const { register, handleSubmit, formState:{errors}, reset, trigger} = useForm();
  const [data, setData] = useState("");

  const customFunction = (d) => {
    const membershipInputs = document.querySelectorAll('.membership-input');
    let membershipList = [];
    membershipInputs.forEach((val) => {
      membershipList.push(val.value);
    });
    const resume_id = sessionStorage.getItem('resume_id');
    axios.put(`http://localhost:8080/resume/membership/${resume_id}`, {
      "membership": membershipList
    })
      .then(res => {
        // console.log(res);
        // console.log(res.data);
      })
    setTerm(7);
    sessionStorage.setItem("membership", membershipList);
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
      <div className="membership">
        {/* <label>
          Membership No.
          <input className="membership-name"{...register("name")}  name="name" placeholder="Enter Membership No." id="name" />
        </label>
        <label>
          Membership Type
          <input className="membership-type" {...register('type')} name="type" placeholder="Write type" id="desc" /> 
        </label>
          
        <label>
           Membership Since
         <input className="start"{...register("startdate")} type="date" name="startdate[]" />
        </label>
        <label>
           Expiry/Renewal Date
           <input className="end"{...register("enddate")} type="date" name="enddate[]" />
        </label> */}
        <div className="membership">
          <label className="membership-name">
            Name of Membership
            <input className={`membership-input ${errors.membership && "invalid"}`} 
            {...register('membership',{required: "*required"})} 
            onKeyUp={() =>{
              trigger("membership");
            }} 
            name="membership[]" placeholder="Name of Membership" id="desc" />
            <i className="sideIcon" onClick={() => cloneFields("membership[]", "Name of Membership", "membership-name", "membership", "membership-input")}><BsPlusCircle /></i>
            {errors.membership &&(
              <small className="text-danger">{errors.membership.message}</small>
            )}
          </label>
        </div>

    </div>
    {/* <div className="footer">
        <span className="plus"><FaPlus /></span><input className="element" {...register('addMembership')} type="text" name="addMembership[]" placeholder='Add Membership' value="Add Membership" />
    </div> */}
        
        
      </form>
    </>
  );
}

export default Memberships