import { useState } from "react";
import { useForm } from "react-hook-form";


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
        <input {...register("name")} placeholder="Your name" name="name" id="name" />
        <select name="role" id="role" {...register("role")} multiple>
          <option value="">Select...</option>
          <option value="business analyst">Business Analyst</option>
          <option value="developer">Developer</option>
          <option value="designer">Designer</option>
          <option value="qa">QA</option>
        </select>
        <input {...register("experience")} placeholder="Total Experience" name="experience" id="experience" />
        
        <input type="submit" name="mydetails" value="Save" />
      </form>
    </>
  );
}

export default MyDetails