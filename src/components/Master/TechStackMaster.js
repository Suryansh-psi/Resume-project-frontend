import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import MasterSidebar from './MasterSidebar';
import swal from 'sweetalert';


const TechStackMaster = () => {
    const [techStackInfo, setTechStackInfo] = useState([]);
    const { register, handleSubmit, formState: { errors }, reset, trigger } = useForm();
    const [temp, setTemp] = useState(0);
    const [term, setTerm] = useState();

    useEffect(() => {
        let result = async () => {
            try {
                const result2 = await axios.get(`http://localhost:8080/techstack`).then(res => {
                    const response = res.data;
                    setTechStackInfo(response);
                    console.log(techStackInfo);
                })
            }
            catch (err) {
                console.log(err);
            }
        }
        result();
    }, [temp, term]);

    const editTechStack = (id, name, desc) => {
        swal("Edit Project Name : ", {
            content: {
                element: "input",
                attributes: {
                    placeholder: "Type your Project name",
                    type: "text",
                    value: name
                },
            }
        }).then((value) => {
            console.log("this value is from swal", typeof(value));
            if (value === null || value === "" || value === undefined) {
                // swal("Project Name can't be empty, name is been revered to privios state");
                // return;
                value = name;
            }
            swal("Edit Project Description : ", {
                content: {
                    element: "input",
                    attributes: {
                        placeholder: "Type your password",
                        type: "text",
                        value: desc
                    },
                }
            }).then((value2) => {
                if (value2 === null || value2 === "" || value2 === undefined) {
                    // swal("Project Description can't be empty");
                    // return;
                    value2 = desc
                }
                axios.put(`http://localhost:8080/techstack/${id}`, {
                    "techStackName": value,
                    "techStackDesc": value2,
                    "isVisible": true
                }).then((res) => {
                    swal(`TechStack Details has been updated`);
                    let date = new Date();
                    setTerm(date.toLocaleString());
                })
                
            })
        });
    }

    const deleteTechStack = (id) => {
        console.log("Deleting techStack with Id", id);
        axios.delete(`http://localhost:8080/techstack/${id}`).then(res => {
            setTemp(res);
        })
    }

    const techStackMapper = techStackInfo.map((data, index) => {
        return (
            <tr key={index}>
                <td>{data.techStackName}</td>
                <td>{data.techStackDesc}</td>
                <td>
                    {/* <button onClick={() => editRole(data.role_id)}>Edit</button> */}
                    <button className='delBtn' onClick={() => deleteTechStack(data.techStackId)}>Delete</button>
                    <button className='editBtn' onClick={() => editTechStack(data.techStackId, data.techStackName, data.techStackDesc)}>Edit</button>
                </td>
            </tr>
        )
    })

    const customFunction = (d) => {
        console.log(d);
        axios.post('http://localhost:8080/techstack', {
            "techStackName": d.techStackName,
            "techStackDesc": d.techStackDesc,
            "isVisible": true
        }).then(res => {
            if (res) {
                setTemp(res);
            }
        })
        reset();
    }

    return (
        <>
        <MasterSidebar />
        <div className='roleMaster'>

            <h2>TechStack Master</h2>

            <form onSubmit={handleSubmit((data) => customFunction(data))}>
                <div className='roleMasterName'>
                    <label>
                        TechStack Name
                        <input type="text" {...register("techStackName")} placeholder="Enter Technology Stack" name="techStackName" />
                    </label>
                </div>
                
                <div>
                    <label className='roleMasterDesc'>
                       TechStack Description
                    </label>
                    <textarea className={`textarea1 ${errors.techStackDesc && "invalid"}`}
                        {...register('techStackDesc', {
                            required: "*required",
                            maxLength: {
                                value: 500,
                                message: "*limit exceed"
                            }
                        })}
                        onKeyUp={() => {
                            trigger("techStackDesc");
                        }}
                        name="techStackDesc" placeholder="Write something about technolgy stack (max 150 words)" cols="41" rows="8">

                    </textarea>
                    
                </div>
                
                <input className="addRole" type="submit" value="Add TechStack" />
            </form>
            

            {/* table to show roles */}
            <div className='masterTable'>
                <table border="2" className="">
                    <thead>
                        <tr>
                            <th>TechStack Name<i></i></th>
                            <th>TechStack Desc<i></i></th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {techStackMapper}
                    </tbody>
                </table>

            </div>
            
        </div>
        </>
    );
};
export default TechStackMaster;