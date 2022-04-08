import React,{useState} from 'react'

import { useForm } from "react-hook-form";
import { BsPlusCircle } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { RiCheckboxCircleLine } from "react-icons/ri";
import './WorkExp.css'
function WorkExp() {

  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");

  const customFunction = (d) => {
    sessionStorage.setItem("workExp", JSON.stringify(d))
    const data = JSON.parse(sessionStorage.getItem('workExp'))
    console.log(sessionStorage.key(0))
    console.log(data)
  }


	return (
    <form onSubmit={handleSubmit((data) => customFunction(data))}>
      <div className="buttons"> 
        <button className="button2">Cancel</button>     
        <input type="submit" name="aboutme" value="Save" />        
        <button className="button1"><FaArrowRight /></button>
      </div>
      <h6 className="WorkExpHeader"><div>Work & </div>Experience</h6>

      <div className="aboutSection">
        <label className="WorkExplabel">
           Client Description
           <input className="first" {...register('client_desc')} type="text" name="client_desc[]"  />
        </label>

        <label className="WorkExplabel">
           Country
           <input className="second"{...register('country')} type="text" name="country[]"  />
        </label>

        <label className="WorkExplabel">
           Project Name
           <input className="third"{...register('project')} type="text" name="project[]"  />
        </label>

        <label className="WorkExplabel">
           Role
           <input className="fourth"{...register('role')} type="text" name="role[]" placeholder="Developer" /><span className="cross">&#9747;</span>
            <i><BsPlusCircle/></i>
        </label>

        <label className="WorkExplabel">
           Duration
           <input className="fifth"{...register('created_at')} type="date" name="created_at[]" />
           <span className="duration"><input className="fifth"{...register('update_at')} type="date" name="update_at[]" /></span>
           <span className="checkBox"><RiCheckboxCircleLine/></span> till date
        </label>

        <label className="WorkExplabel">
           Business Solution
           <textarea className="sixth"{...register('business_sol')} name="business_sol" placeholder="Write Your Solution" id="about" cols="54" rows="4"></textarea> 
        </label>

        <label className="WorkExplabel">
           Technology Stack
           <input className="seventh"{...register('technology')} type="text" name="technology[]" placeholder="Python" /><span className="cross">&#9747;</span>
            <i><BsPlusCircle/></i>
        </label>

        <label className="WorkExplabel">
           Project Responsibilities
           <input className="eight" {...register('responsibility')} type="text" name="responsibility[]" placeholder="Write Responsibilities" />
          <span className="Responsibility"><BsPlusCircle/></span>
        </label>

        <div className="footer">
          <span className="plus"><FaPlus /></span><input className="element" {...register('workExp')} type="text" name="workExp[]" placeholder="Add work experience" />

        </div>


      </div>
      
    </form>
  );
}


export default WorkExp