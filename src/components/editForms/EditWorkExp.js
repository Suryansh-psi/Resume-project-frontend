import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { BsPlusCircle } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { RiCheckboxCircleLine } from "react-icons/ri";
import { useOutletContext } from "react-router-dom";
// import Example from './Example'
import { GrFormClose } from "react-icons/gr";
import Select from 'react-multiple-select-dropdown-lite'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import axios from 'axios';
import './EditWorkExp.css';


const EditWorkExp = () => {
  const [term, setTerm] = useOutletContext();
  const { register, handleSubmit, formState: { errors }, reset, trigger } = useForm();
  const [roles, setRoles] = useState([]);
  const [techstacks, setTechstacks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [temp, setTemp] = useState(0);
  const [resumeInfo, setResumeInfo] = useState({});
  const id = sessionStorage.getItem("editIdUser");
  const [data, setData] = useState({
    "educationName": "",
    "educationType": "",
    "educationLocation": "",
    "startDate": "",
    "endDate": "",
    "percentage": ""
  });


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

    console.log(d);
    d.startdate = d.startdate.toString();
    d.enddate = d.enddate.toString();
    console.log([resumeInfo.workExps[0].role ,...d.role])
    axios.put(`http://localhost:8080/workexp/${resumeInfo.workExps[0].workExpId}`, {
        clientDesc: d.client_desc,
        country: d.country,
        projectName: d.project,
        role: [...resumeInfo.workExps[0].role ,...d.role],
        startDate: d.startdate,
        endDate: d.enddate,
        bussinessSol: d.business_sol,
        techStack: [...resumeInfo.workExps[0].techStack ,...techList],
        projectResp: [...resumeInfo.workExps[0].projectResp ,...projRespList]
      }).then(res => {
        let date = new Date();
        setTerm(date.toLocaleString());
        console.log(res.data);
        setTerm(4);
        reset();
      sessionStorage.setItem("workexp_id", res.data);
    })
    
  }


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

  useEffect(() => {
    let result = async () => {
      try {
        const result2 = await axios.get(`http://localhost:8080/role`).then(res => {
          const response = res.data;
          setRoles(response);
        })
      }
      catch (err) {
        console.log(err);
      }
    }
    result();
  }, []);

  useEffect(() => {
    let result = async () => {
      try {
        const result2 = await axios.get(`http://localhost:8080/techstack`).then(res => {
          const response = res.data;
          setTechstacks(response);
        })
      }
      catch (err) {
        console.log(err);
      }
    }
    result();
  }, []);

  useEffect(() => {
    let result = async () => {
      try {
        const result2 = await axios.get(`http://localhost:8080/project`).then(res => {
          const response = res.data;
          setProjects(response);
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

  const projOps = projects.map((ops) => {
    return <option title={ops.project_desc} value={ops.project_name}>{ops.project_name}</option>
  })


  // const handleRole = (val) => {
  //   val = val.split(',');
  //   setRole(val);
  // }

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

  const addWorkExp = (e) => {
    e.preventDefault();
    const allowedNodeNames = ['INPUT', 'TEXTAREA', 'SELECT'];
    // const workExpDiv = e.target.previousElementSibling.children[0].cloneNode(true);
    const workExpDiv = document.querySelector('.div-workexp').cloneNode(true);
    Array.from(workExpDiv.children).forEach((current, index) => {
      if (current.nodeName === 'DIV') {
        Array.from(current.children).forEach((current) => {
          if (allowedNodeNames.includes(current.nodeName))
            current.value = '';
        })
      }
    })
    // e.target.previousElementSibling.appendChild(workExpDiv);
    document.querySelector('.main-workexp-div').appendChild(workExpDiv);
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

  const options1 = roles.map((opt) => {
    return <option title={opt.role_desc} value={opt.role_name}>{opt.role_name}</option>
  })

  const techstackOptions = techstacks.map((opt) => {
    return <option title={opt.techStackDesc} value={opt.techStackName}>{opt.techStackName}</option>
  })

  const deleteSelectedRole = (index, work) => {
    // setResumeInfo({
    //   ...resumeInfo, "membership": resumeInfo.membership.filter((ele, i) => {
    //     return i !== index;
    //   })
    // })
    work.role = work.role.filter((ele, i) => {
      return i!==index;
    })
    setResumeInfo({...resumeInfo});
  }

  const showRoles = (work) => {
    let result = [];
    result = work.role.map((data, index) => {
      return <><input type="text" value={data} />
      <span className="projCross" onClick={() => deleteSelectedRole(index, work)}><GrFormClose/></span></>
    });
    return result;
  }

  const deleteSelectedTech = (index, work) => {
    work.techStack = work.techStack.filter((ele, i) => {
      return i!==index;
    })
    setResumeInfo({...resumeInfo});
  }

  const showTechStack = (work) => {
    let result = [];
    result = work.techStack.map((data, index) => {
      return <>
        <input type="text" value={data} /><span className="projCross" onClick={() => deleteSelectedTech(index, work)}> 
          <GrFormClose/></span>
      </>
    })
    return result;
  }

  const deleteSelectProjResp = (index, work) => {
    work.projectResp = work.projectResp.filter((ele, i) => {
      return i!==index;
    })
    setResumeInfo({...resumeInfo});
  }

  const showProjResp = (work) => {
    let result = [];
    result = work.projectResp.map((data, index) => {
      return <>
        <input type="text" value={data} /><span className="projCross" onClick={() => deleteSelectProjResp(index, work)}> 
          <GrFormClose/></span>
      </>
    })
    return result;
  }
  // bussinessSol: "sfasfasdf"
  // clientDesc: "hey whatsapp"
  // country: "india"
  // endDate: "2022-04-14"
  // projectName: "resume builder"
  // projectResp: ['asdfa']
  // resumeId: 6
  // role: (3) ['', 'Developer', 'Manager']
  // startDate: "2022-03-31"
  // techStack: (2) ['Hello', 'java']
  // workExpId: 11
  const workExpFieldsMapping = () => {
    let result = [];
    result = resumeInfo.workExps.map((data, index) => {
      return (
        <>
          <div className="workexpsection">
            <div className='workexpfields'>
              <label className="WorkExplabel">
                Client Description
                <input className={`first ${errors.client_desc && "invalid"}`}
                  {...register('client_desc', { required: "*required" })}
                  // onKeyUp={() => {
                  //   trigger("client_desc");
                  // }}
                  placeholder={data.clientDesc}
                  type="text" name="client_desc[]" />
                {/* {errors.client_desc && (
                  <small className="text-danger">{errors.client_desc.message}</small>
                )} */}
              </label>

              <label className="WorkExplabel">
                Country
                <input placeholder={data.country} className={`second ${errors.country && "invalid"}`}
                  {...register('country', { required: "*required" })}
                  // onKeyUp={() => {
                  //   trigger("country");
                  // }}
                  type="text" name="country[]" />
                {/* {errors.country && (
                  <small className="text-danger">{errors.country.message}</small>
                )} */}
              </label>

              <label className="WorkExplabel">
                Project Name
               
                <div className='project-input-div'>
                {/* <div className="workRole">
                  <input type="text" placeholder="project" /><span className="projCross"><GrFormClose/></span>
                </div> */}
                  <select className={`project1 ${errors.project && "invalid"}`} name="project" id="project" {...register("project", { required: "*required" })}
                    onKeyUp={() => {
                      trigger("project");
                    }} >
                    <option className="option1" value="">Select...</option>

                    {projOps}
                  </select>
                 
                </div>
              </label>

              <label className="WorkExplabel">
                Role
                <div className='role-input-div'>
                  <div className="workRole">
                    {(data.role) ? showRoles(data) : null}
                  </div>
                  <select className={`roles1 ${errors.role && "invalid"}`} name="role" id="role" {...register("role", { required: "*required" })}
                    onKeyUp={() => {
                      trigger("role");
                    }} multiple>
                    <option className="option1" value="">Select...</option>

                    {options1}
                  </select>
                  
                </div>
                {/* <i className="role" onClick={() => createField('role[]', 'Mention Role', 'fourth', 'role', '.role-input-div')}><BsPlusCircle /></i> */}
              </label>

              <div className='time'>
                <label className="WorkExplabel">
                  Duration
                  <input className={`fifth ${errors.stardate && "invalid"}`}
                    {...register("startdate", { required: "*required" })}
                    onKeyUp={() => {
                      trigger("startdate");
                    }}
                    type="date" name="startdate[]" />
                  <span className="duration"><input className="fifth"{...register("enddate")} type="date" name="enddate[]" /></span>
                  <span className="checkBox"><RiCheckboxCircleLine /></span> till date
                  {errors.startdate && (
                    <small className="text-danger">{errors.startdate.message}</small>
                  )}
                </label>

              </div>


              <div className='business'>
                <label className="WorkExplabel">
                  Business Solution
                  <textarea placeholder={data.bussinessSol} className={`sixth ${errors.business_sol && "invalid"}`}
                    {...register('business_sol', {
                      required: "*required",
                      maxLength: {
                        value: 300,
                        message: "Maximum allowed length is 300"
                      }
                    })}
                    onKeyUp={() => {
                      trigger("business_sol");
                    }}
                    name="business_sol"  id="about" cols="54" rows="4"></textarea>
                  {/* {errors.business_sol && (
                    <small className="text-danger">{errors.business_sol.message}</small>
                  )} */}
                </label>

              </div>



              <label className="WorkExplabel">
                TechnologyStack
                <div className='techstack-input-div'>
                <div className="workRole">
                  {(data.techStack) ? showTechStack(data) : null}
                </div>
                  {/* <input className="seventh"{...register('technology')} type="text" name="technology[]" placeholder="Mention Tech" />
                  <span className="cross">&#9747;</span> 

                  <i className="tech" onClick={() => createField('technology[]', 'Mention Tech', 'seventh', 'technology', '.techstack-input-div')}><BsPlusCircle /></i> */}
                  {/* <div className="role-fields"> */}
                  <select className={`roles1 ${errors.tech && "invalid"}`} name="role" id="role" {...register("tech", { required: "*required" })}
                    onKeyUp={() => {
                      trigger("tech");
                    }} multiple>
                    <option className="option1" value="">Select...</option>
                    {techstackOptions}
                  </select>
                  
                  {/* </div> */}
                </div>
              </label>

              <label className="WorkExplabel">
                Project Responsibilities
                  
                {/* <div>
                    <ul>
                      {(data.projectResp) ? showProjResp(data) : null}
                    </ul>
                  </div> */}
                <div className="projRes-main-div" >
                <div className="workRole">
                  <input type="text" placeholder="project" /><span className="projCross"><GrFormClose/></span>
                </div>
                  <input className={`eight ${errors.responsibility && "invalid"}`} {...register('responsibility')}
                    onKeyUp={() => {
                      trigger("responsibility");
                    }}
                    type="text" name="responsibility[]" placeholder="Write Responsibilities" />
                  {/* {errors.responsibility && (
                    <small className="text-danger">{errors.responsibility.message}</small>
                  )} */}
                </div>
                <i onClick={createProjRes} className="Responsibility"><BsPlusCircle /></i>
              </label>
            </div>
            
          </div>
        </>
      )
    });
    return result;
  }

  return (
    <form onSubmit={handleSubmit((data) => customFunction(data))}>
      <div className="buttons">
        <button className="button2" disabled>Cancel</button>
        <input type="submit" name="aboutme" value="Save" />
        <button className="button1" disabled><i><FaArrowRight /></i></button>
      </div>
      <div className='main-workexp-div'>
        <div className='div-workexp'>
          <h6 className="WorkExpHeader"><div>Work & </div>Experience</h6>
          {(resumeInfo.workExps) ? workExpFieldsMapping() : null}
          {/* {workExpFieldsMapping()} */}
        </div >

      </div >
      <div className="footer">
        {/* <span onClick={createWorkExp} className="plus"><FaPlus /></span><input className="element" {...register('workExp')} type="text" name="workExp[]" placeholder='Add work experience' value="Add work experience" /> */}
        <span onClick={addWorkExp} className="plus"><FaPlus /></span><input className="element" {...register('workExp')} type="text" name="workExp[]" placeholder='Add work experience' value="Add work experience" />
        {/* <i className='plus'><FaPlus /> Add Work Exp</i> */}
      </div>

    </form >
  );
}


export default EditWorkExp;