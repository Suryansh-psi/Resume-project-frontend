import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";
import { GrFormClose } from "react-icons/gr";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import './EditMyDetails.css'
import Select from 'react-multiple-select-dropdown-lite'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import { useScrollTrigger } from "@mui/material";
import { ErrorSharp } from "@mui/icons-material";
import { useParams } from "react-router-dom";



const EditMyDetails = (props) => {
  const [term, setTerm] = useOutletContext();
  const { register, handleSubmit, formState: { errors }, reset, trigger } = useForm();
  const [imagePath, setImagePath] = useState('C:/Users/suryansh.gahlot/Desktop/V2/Resume-project-frontend/public/userIcon.png');
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState([]);
  const [temp, setTemp] = useState(0);
  const [resumeInfo, setResumeInfo] = useState({});
  const [userId, setUserId] = useState(1);
  const params = useParams();
  
  useEffect(() => {
    let result = async () => {
      try {
        const result2 = await axios.get(`http://localhost:8080/resume/alldetails/${params.id}`).then(res => {
          const response = res.data;
          setResumeInfo(response);
          console.log("hello", response);
          sessionStorage.setItem("editIdUser", params.id);
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


  const options = roles.map((opt) => {
    return <option title={opt.role_desc} value={opt.role_name}>{opt.role_name}</option>
  })

  let imageHandler = async (e) => {
    const file = e.target.files[0];
    let base64 = await convertBase64(file);
    console.log("Hellloooo")
    setImagePath(base64);
    let temp = imagePath.split(',')[1];
    setResumeInfo({ ...resumeInfo, image: temp })
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

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
    
  //   try {
  //     axios.put(`http://localhost:8080/resume/${params.id}`, resumeInfo)
  //       .then(res => {
  //         if (res) {
  //           console.log(res.data);
  //           let date = new Date();
  //           setTerm(date.toLocaleString())
  //         }
  //       })

  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  const customFunction = (d) => {
    const elementRole = document.querySelectorAll('.element-role');
    const imageURl = imagePath.split(',')[1];
    // console.log(d);
    axios.put(`http://localhost:8080/resume/${params.id}`, {
      name: d.name,
      role: [...resumeInfo.role, ...d.role],
      total_exp: d.experience,
      image: resumeInfo.image,
      userId: 1
    })
      .then(res => {
        if(res) {
          let date = new Date();
          setTerm(date.toLocaleString());
          console.log(res.data);
        }
      })
    setTerm(1);


    setResumeInfo({ ...resumeInfo, "role": [...resumeInfo.role, ...d.role] });
    reset();
  }

  const handleChange = name => event => {
    setResumeInfo({ ...resumeInfo, [name]: event.target.value })
  }

  const deleteRoleItem = (key) => {
    setResumeInfo({
      ...resumeInfo, "role": resumeInfo.role.filter((ele, i) => {
        return i !== key;
      })
    })
  }

  const resumeRoleMapping = () => {
    let result = [];
    result = resumeInfo.role.map((data, index) => {
      return (
        <>
          <input type="text" value={data} placeholder="role" />
          <span onClick={() => deleteRoleItem(index)} className="cross"><GrFormClose/></span>
        </>
      )
    })
    return result;
  }

  return (
    <>
      <form onSubmit={handleSubmit((data) => customFunction(data))}>
      {/* <form onSubmit={handleFormSubmit}> */}

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
              // className="form-control"
              className={`form-control 
              ${errors.name && "invalid"}
              `}
              {...register("name")}
              onKeyUp={() => {
                trigger("name");
              }}
              placeholder="Your name" name="name" id="name"
              value={resumeInfo.name}
              onChange={handleChange("name")}
            />
            {/* {errors.name && (
              <small className="text-danger">{errors.name.message}</small>
            )} */}
          </div>

          <div className="form1">
            <label className="roleEdit">
              Role
            </label>
            <div className="boxRole">
              {/* <input type="text" placeholder="role" /><span className="cross"><GrFormClose/></span> */}
              <ul>
              {(resumeInfo.role) ? resumeRoleMapping() : null}
              </ul>
            </div>
            <div className="role-fields">
              <select
                className={`Proles ${errors.role && "invalid"}`} 
                name="role" id="role" 
                {...register("role")}
                onKeyUp={() => {
                  trigger("role");
                }} 
                multiple >
                <option className="option1" value="">Select...</option>
                {options}
              </select>
              {/* {errors.role && (
                <small className="text-danger">{errors.role.message}</small> { required: "*required" }
              )} */}
            </div>
          </div>

          <div className="form-group1">
            <label className="exp">
              Total Exp
            </label>
            <input value={resumeInfo.total_exp}
              // className="form-control1"
              className={`form-control1 ${errors.experience && "invalid"}`}
              {...register("experience", {
                pattern: {
                  value: /^[0-9]*$/,
                  message: "*invalid value"

                }
              })}
              onKeyUp={() => {
                trigger("experience");
              }}
              placeholder="Total Experience" name="experience" id="experience"
              onChange={handleChange("total_exp")}
            />
            <span>  years</span>
            {/* {errors.experience && (
              <small className="text-danger">{errors.experience.message}</small>
            )} */}

          </div>
        </div>
      </form>
    </>
  );
}

export default EditMyDetails;

