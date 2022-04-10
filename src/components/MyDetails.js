import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { BsPlusCircle } from "react-icons/bs";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import './MyDetails.css'


const MyDetails = (props) => {
  // console.log(props.formfields)
  const [term, setTerm] = useOutletContext();
  const { register, handleSubmit } = useForm();
  // const [role, setRole] = useState([]);


  const customFunction = (d) => {

    // const data = JSON.parse(sessionStorage.getItem('mydetails'))
    // console.log(sessionStorage.key(0))
    // console.log(data)
    // setData({
    //   ...data, name: d.name, image: d.image, total_exp : d.experience, role: d.role
    // })
    const elementRole = document.querySelectorAll('.element-role');
    const roleList = [];
    elementRole.forEach((ele) => {
      roleList.push(ele.value);
    });
    // console.log(elementRole); 
    // console.log(d)
    axios.post('http://localhost:8080/resume', {
      name: d.name,
      role: roleList,
      total_exp: d.experience,
      image: d.image,
      userId: 3
    })
      .then(res => {
        // console.log(res);
        // console.log(res.data);
        sessionStorage.setItem("resume_id", res.data);
      })
    setTerm(1);


    sessionStorage.setItem("name", d.name);
    sessionStorage.setItem("role", roleList);
    sessionStorage.setItem("total_exp", d.experience);
    sessionStorage.setItem("image", d.image);
  }

  const createNewRole = () => {
    const roleFields = document.querySelector(".role-fields");
    const input = document.querySelector('.element-role');
    const newInput = input.cloneNode(true);
    newInput.value = "";
    // console.log(input);
    // console.log(newInput);
    roleFields.append(newInput);
  }



  return (
    <>
      <form onSubmit={handleSubmit((data) => customFunction(data))}>
        <div className="buttons">
          <button className="button2">Cancel</button>
          <input type="submit" name="mydetails" value="Save" />

          <button className="button1"><FaArrowRight /></button>
        </div>
        <i className="profileImage"><FaUserCircle /></i>
        <div className="detailSection">
          <label className="name">
            Name
            <input {...register("name")} placeholder="Your name" name="name" id="name" />
          </label>
          <label className="role">
            Role


            <div className="role-fields">

              <input className="element-role" {...register('role')} type="text" name="role[]" placeholder="Write here" />
            </div>
            <i onClick={createNewRole}><BsPlusCircle /></i>
            {/* <select name="role" id="role" style={{display: "inline-block"}} {...register("role")} multiple>
              <option value="">Select...</option>
              <option value="business analyst">Business Analyst</option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="qa">QA</option>
            </select> */}
          </label>
          <label className="exp">
            Total Exp
            <input {...register("experience")} placeholder="Total Experience" name="experience" id="experience" />
            <span>  years</span>

          </label>
        </div>
      </form>
    </>
  );
}

export default MyDetails;