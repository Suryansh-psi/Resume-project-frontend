import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";
import { FaUserCircle} from "react-icons/fa";
import { BsPlusCircle } from "react-icons/bs";
import './MyDetails.css'
function MyDetails(props) {
  // console.log(props.formfields)
  const { register, handleSubmit } = useForm();
  // const [data, setData] = useState("");
  

  const customFunction = (d) => {
    sessionStorage.setItem("mydetails", JSON.stringify(d))
    // const data = JSON.parse(sessionStorage.getItem('mydetails'))
    // console.log(sessionStorage.key(0))
    // console.log(data)
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

            <i><BsPlusCircle/></i>
            <select name="role" id="role" {...register("role")} multiple>
              <option value="">Select...</option>
              <option value="business analyst">Business Analyst</option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="qa">QA</option>
            </select>
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

export default MyDetails