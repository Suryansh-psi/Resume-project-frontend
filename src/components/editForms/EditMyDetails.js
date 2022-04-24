import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import './EditMyDetails.css'
import Select from 'react-multiple-select-dropdown-lite'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import { useScrollTrigger } from "@mui/material";
import { ErrorSharp } from "@mui/icons-material";


const EditMyDetails = (props) => {
  const [term, setTerm] = useOutletContext();
  const { register, handleSubmit, formState: { errors }, reset, trigger } = useForm();
  const [imagePath, setImagePath] = useState('C:/Users/suryansh.gahlot/Desktop/V2/Resume-project-frontend/public/userIcon.png');
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState([]);
  const [temp, setTemp] = useState(0);
  const [resumeInfo, setResumeInfo] = useState({});

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
    console.log("resume state", resumeInfo)
    // const elementRole = document.querySelectorAll('.element-role');
    // const imageURl = imagePath.split(',')[1];
    // // console.log(d);
    // axios.post('http://localhost:8080/resume', {
    //   name: d.name,
    //   role: d.role,
    //   total_exp: d.experience,
    //   image: imageURl,
    //   userId: 1
    // })
    //   .then(res => {
    //     if (res) {
    //       sessionStorage.setItem("resume_id", res.data);
    //       alert("new Resume Created");

    //     }
    //   })
    // setTerm(1);


    // sessionStorage.setItem("name", d.name);
    // sessionStorage.setItem("role", d.role);
    // sessionStorage.setItem("image", imageURl);
    // sessionStorage.setItem("total_exp", d.experience);
    // sessionStorage.setItem("imageBase", imagePath.split(',')[0]);
    // reset();
  }

  useEffect(() => {
    let result = async () => {
      try {
        const result2 = await axios.get(`http://localhost:8080/role`).then(res => {
          const response = res.data;
          // let roleList = response.map((role) => {
          //   return role.role_name;
          // })
          setRoles(response);
        })
      }
      catch (err) {
        console.log(err);
      }
    }
    result();
  }, []);

  const options = roles.map((opt) => {
    return <option title={opt.role_desc} value={opt.role_name}>{opt.role_name}</option>
  })

  // const handleRole = (val) => {
  //   val = val.split(',');
  //   setRole(val);
  // }

  let imageHandler = async (e) => {
    const file = e.target.files[0];
    let base64 = await convertBase64(file);
    setImagePath(base64);
  }

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      }

      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }


  return (
    <>
      <h2>Edit my details</h2>
      <form onSubmit={handleSubmit((data) => customFunction(data))}>

        
        <div className="buttons">
          <button className="button2" disabled>Cancel</button>
          <input type="submit" name="mydetails" value="Save" />
          <button className="button1" disabled><i><FaArrowRight /></i></button>
        </div>

        
        <div>
          <label htmlFor="insert-image">
            <div className="profileImage">
              
              <img src={`data:image/jpeg;base64,${resumeInfo.image}`} id="imageId" className="resumeImage" />
            </div>
            <input type="file" id="insert-image" className="insert-image-input" accept="image/*" onChange={imageHandler} />
          </label>

          
        </div>
        <div className="detailSection">
          <div className="form-group">
            <label className="name">
              Name
            </label>
            <input
              className={`form-control 
              ${errors.name && "invalid"}
              `}
              // {...register("name", { required: "*required" })}
              // onKeyUp={() => {
              //   trigger("name");
              // }}
              placeholder="Your name" name="name" id="name"
              value={resumeInfo.name}
            />
            {/* {errors.name && (
              <small className="text-danger">{errors.name.message}</small>
            )} */}
          </div>

          <div className="form1">
            <label className="role">
              Role
            </label>
            <div className="role-fields">
              <select className={`roles ${errors.role && "invalid"}`} name="role" id="role" 
              // {...register("role", { required: "*required" })}
                // onKeyUp={() => {
                //   trigger("role");
                // }} 
                multiple >
                <option className="option1" value="">Select...</option>
                {options}
              </select>
              {errors.role && (
                <small className="text-danger">{errors.role.message}</small>
              )}
            </div>
          </div>

          <div className="form-group1">
            <label className="exp">
              Total Exp
            </label>
            <input value={resumeInfo.total_exp}
              className={`form-control1 ${errors.experience && "invalid"}`}
              {...register("experience", {
                required: "*required",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "*invalid value"
                  
                }
              })}
              onKeyUp={() => {
                trigger("experience");
              }}
              placeholder="Total Experience" name="experience" id="experience"
            />
            <span>  years</span>
            {errors.experience && (
              <small className="text-danger">{errors.experience.message}</small>
            )}

          </div>
        </div>
      </form>
    </>
  );
}

export default EditMyDetails;

