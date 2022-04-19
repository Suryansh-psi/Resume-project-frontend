import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { BsPlusCircle } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { RiCheckboxCircleLine } from "react-icons/ri";
import { useOutletContext } from "react-router-dom";
// import Example from './Example'
import Select from 'react-multiple-select-dropdown-lite'
import 'react-multiple-select-dropdown-lite/dist/index.css'

import axios from 'axios';
import './WorkExp.css'
const WorkExp = () => {
  const [term, setTerm] = useOutletContext();
  const { register, handleSubmit } = useForm();
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState([]);
  // const [data, setData] = useState("");

  const customFunction = (d) => {
    // console.log(role);
    const techList = [];
    const projRespList = [];

    let tech = document.querySelectorAll('.seventh');
    let projRes = document.querySelectorAll('.eight');

    

    tech.forEach((ele) => {
      techList.push(ele.value);
    })

    projRes.forEach((ele) => {
      projRespList.push(ele.value);
    })


    // d.startDate = d.startDate.toString();
    // d.endDate =  d.endDate.toString();
    const resume_id = sessionStorage.getItem('resume_id');
    axios.post(`http://localhost:8080/workexp`, [
      {
        clientDesc: d.client_desc,
        country: d.country,
        projectName: d.project,
        role: role,
        startDate: d.stardate,
        endDate: d.enddate,
        bussinessSol: d.business_sol,
        techStack: ['techList'],
        resumeId: resume_id,
        projectResp: projRespList
      }
    ]).then(res => {
      console.log(res);
      console.log(res.data);
      sessionStorage.setItem("workexp_id", res.data);
    })
    setTerm(4);


    sessionStorage.setItem("clientDesc", d.client_desc);
    sessionStorage.setItem("country", d.country);
    sessionStorage.setItem("projectName", d.project);
    sessionStorage.setItem("role2", role);
    sessionStorage.setItem("startDate", d.stardate);
    sessionStorage.setItem("endDate",  d.enddate);
    sessionStorage.setItem("bussinessSol", d.business_sol);
    sessionStorage.setItem("techStack", ['techList']);
    sessionStorage.setItem("projectResp", projRespList);
  }

  useEffect(() => {
    let result = async () => {
      try {
        const result2 = await axios.get(`http://localhost:8080/role`).then(res => {
          const response = res.data;
          let roleList = response.map((role) => {
            return role.role_name;
          })
          setRoles(roleList);
        })
      }
      catch (err) {
        console.log(err);
      }
    }
    result();
  }, []);

  const options = roles.map((opt) => {
    let obj = {
      label: opt, value: opt
    };
    return obj;
  })


  const handleRole = (val) => {
    val = val.split(',');
    setRole(val);
  }

  const createField = (name, placeholder, classN, rName, MainClass) => {
    const inp = document.createElement("input");
    const span = document.createElement("span");
    span.setAttribute('class', 'cross');
    span.innerHTML = "&#9747;"
    inp.setAttribute('type', 'text');
    inp.setAttribute('name', name);
    inp.setAttribute('placeholder', placeholder);
    inp.setAttribute('class', classN);
    inp.setAttribute('object', `{...register(${rName})}`);
    document.querySelector(MainClass).appendChild(inp);
    // document.querySelector(MainClass).appendChild(span);
  }

  const createProjRes = () => {
    const inp = document.createElement("input");
    inp.setAttribute('type', 'text');
    inp.setAttribute('name', 'responsibility[]');
    inp.setAttribute('placeholder', 'Write Responsibilities');
    inp.setAttribute('class', 'eight');
    inp.setAttribute('object', `{...register(responsibility)}`);
    document.querySelector('.projRes-main-div').appendChild(inp);
  }

  const createWorkExp = () => {
    const workexp = document.querySelector(".workexpfields");
    const workexpBlock = document.querySelector('.workexpsection');
    const newblock = workexp.cloneNode(true);
    // newInput.value = "";
    // console.log(input);
    // console.log(newInput);
    workexpBlock.append(newblock);
  }


  return (
    <form onSubmit={handleSubmit((data) => customFunction(data))}>
      <div className="buttons">
        <button className="button2">Cancel</button>
        <input type="submit" name="aboutme" value="Save" />
        <button className="button1"><i><FaArrowRight /></i></button>
      </div>
      <h6 className="WorkExpHeader"><div>Work & </div>Experience</h6>

      <div className="workexpsection"> 
        <div className='workexpfields'>
          <label className="WorkExplabel">
            Client Description
            <input className="first" {...register('client_desc')} type="text" name="client_desc[]" />
          </label>

          <label className="WorkExplabel">
            Country
            <input className="second"{...register('country')} type="text" name="country[]" />
          </label>

          <label className="WorkExplabel">
            Project Name
            <input className="third"{...register('project')} type="text" name="project[]" />
          </label>

          <label className="WorkExplabel">
            Role
            <div className='role-input-div'>
            <Select
                options={options}
                onChange={handleRole}
              /> 
            </div>
            {/* <i className="role" onClick={() => createField('role[]', 'Mention Role', 'fourth', 'role', '.role-input-div')}><BsPlusCircle /></i> */}
          </label>

          <label className="WorkExplabel">
            Duration
            <input className="fifth"{...register("stardate")} type="date" name="stardate[]" />
            <span className="duration"><input className="fifth"{...register("enddate")} type="date" name="enddate[]" /></span>
            <span className="checkBox"><RiCheckboxCircleLine /></span> till date
          </label>

          <label className="WorkExplabel">
            Business Solution
            <textarea className="sixth"{...register('business_sol')} name="business_sol" placeholder="Write Your Solution" id="about" cols="54" rows="4"></textarea>
          </label>

          <label className="WorkExplabel">
            TechnologyStack
            <div className='techstack-input-div'>
              {/* <input className="seventh"{...register('technology')} type="text" name="technology[]" placeholder="Mention Tech" />
               <span className="cross">&#9747;</span> 
            
            <i className="tech" onClick={() => createField('technology[]', 'Mention Tech', 'seventh', 'technology', '.techstack-input-div')}><BsPlusCircle /></i> */}
              {/* <div className="role-fields"> */}
              <Select
                options={options}
                onChange={handleRole}
              />
            {/* </div> */}
            </div>
          </label>

          <label className="WorkExplabel">
            Project Responsibilities
            <div className='projRes-main-div'>
              <input className="eight" {...register('responsibility')} type="text" name="responsibility[]" placeholder="Write Responsibilities" />
            </div>
            <i onClick={createProjRes} className="Responsibility"><BsPlusCircle /></i>
          </label>
        </div>
      </div>

      <div className="footer">
        <span onClick={createWorkExp} className="plus"><FaPlus /></span><input className="element" {...register('workExp')} type="text" name="workExp[]" placeholder='Add work experience' value="Add work experience" />
        {/* <i className='plus'><FaPlus /> Add Work Exp</i> */}
      </div>

    </form>
  );
}


export default WorkExp