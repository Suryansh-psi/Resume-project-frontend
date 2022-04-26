import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import './SkillMaster.css'
import MasterSidebar from './MasterSidebar';


const SkillMaster = () => {
    const [skillInfo, setSkillInfo] = useState([]);
    const { register, handleSubmit, formState: { errors }, reset, trigger } = useForm();
    const [temp, setTemp] = useState(0);

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
    }, [temp]);

    const deleteSkill = (id) => {
        console.log("Deleting Skill with Id", id);
        axios.delete(`http://localhost:8080/skills/${id}`).then(res => {
            setTemp(res);
        })
    }


    const skillMapper = skillInfo.map((data, index) => {
        return (
            <tr key={index}>
                <td>{data.category}</td>
                <td>{data.skill}</td>
                <td>
                    {/* <button onClick={() => editRole(data.role_id)}>Edit</button> */}
                    <button className='delBtn'  onClick={() => deleteSkill(data.skillId)}>Delete</button>
                
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