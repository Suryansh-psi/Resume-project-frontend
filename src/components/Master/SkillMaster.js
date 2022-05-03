import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import './SkillMaster.css'
import MasterSidebar from './MasterSidebar';
import swal from 'sweetalert';


const SkillMaster = () => {
    const [skillInfo, setSkillInfo] = useState([]);
    const { register, handleSubmit, formState: { errors }, reset, trigger } = useForm();
    const [temp, setTemp] = useState(0);
    const [term, setTerm] = useState();

    useEffect(() => {
        let result = async () => {
            try {
                const result2 = await axios.get(`http://localhost:8080/skills`).then(res => {
                    const response = res.data;
                    setSkillInfo(response);
                })
            }
            catch (err) {
                console.log(err);
            }
        }
        result();
    }, [temp, term]);

    const deleteSkill = (id) => {
        console.log("Deleting Skill with Id", id);
        axios.delete(`http://localhost:8080/skills/${id}`).then(res => {
            setTemp(res);
        })
    }

    const editSkill = (id, category, skill) => {
        swal("Edit Category : ", {
            content: {
                element: "input",
                attributes: {
                    placeholder: "Type your Project name",
                    type: "text",
                    value: category
                },
            }
        }).then((value) => {
            // console.log("this value is from swal", value);
            if (value === null || value === "" || value === undefined) {
                // swal("Project Name can't be empty, name is been revered to privios state");
                // return;
                value = category;
            }
            swal("Edit skill : ", {
                content: {
                    element: "input",
                    attributes: {
                        placeholder: "Type your password",
                        type: "text",
                        value: skill
                    },
                }
            }).then((value2) => {
                if (value2 === null || value2 === "" || value2 === undefined) {
                    // swal("Project Description can't be empty");
                    // return;
                    value2 = skill
                }
                axios.put(`http://localhost:8080/skills/${id}`, {
                    "category": value,
                    "skill": value2,
                    "isVisible": true
                }).then((res) => {
                    swal(`Skill Details has been updated`);
                    let date = new Date();
                    setTerm(date.toLocaleString());
                })
                
            })
        });
    }


    const skillMapper = skillInfo.map((data, index) => {
        return (
            <tr key={index}>
                <td>{data.category}</td>
                <td>{data.skill}</td>
                <td>
                    <button className='editBtn2' 
                    // onClick={() => editRole(data.role_id)}
                    >Edit</button>
                    <button className='delBtn'  onClick={() => deleteSkill(data.skillId)}>Delete</button>
                    <button className='editBtn' onClick={() => editSkill(data.skillId, data.category, data.skill)}>Edit</button>
                </td>
            </tr>
        )
    })

    const customFunction = (d) => {
        axios.post('http://localhost:8080/skills', {
            "skill" : d.skill,
            "category" : d.category,
            "isVisible" : true
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
        <div className='skillMaster'>
            
            <h2>Skill Master</h2>
           

            {/* Form to add skill */}

            <form onSubmit={handleSubmit((data) => customFunction(data))}>
                <div className='skillMasterName'>
                    <label>
                        Category
                        <input type="text" {...register("category")} placeholder="Enter Category" name="category" />
                    </label>
                </div>
                <div className='enterSkill'>
                    <label>
                        Skill
                        <input type="text" {...register("skill")} placeholder="Enter Skill" name="skill" />
                    </label>
                </div>
                
                <input className='addSkill'  type="submit" value="Add Skill" />
            </form>

             {/* table to show Skills */}
             <div className='skillMasterTable'>
                <table border="2" className="">
                    <thead>
                        <tr>
                            <th>Skill Category<i></i></th>
                            <th>Skill Name<i></i></th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {skillMapper}
                    </tbody>
                </table>
             </div>
             
        </div>
        </>
    );
};

export default SkillMaster;