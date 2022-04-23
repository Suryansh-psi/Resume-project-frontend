import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";


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
        console.log("Deleting Role with Id", id);
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
                    <button onClick={() => deleteSkill(data.skillId)}>Delete</button>
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
        <div>
            <h2>Skill Master</h2>
            {/* table to show Skills */}
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

            {/* Form to add skill */}

            <form onSubmit={handleSubmit((data) => customFunction(data))}>
                <label>
                    Enter Category
                    <input type="text" {...register("category")} placeholder="Enter Category" name="category" />
                </label>

                <label>
                    Enter Skill
                    <input type="text" {...register("skill")} placeholder="Enter Skill" name="skill" />
                </label>
                <input type="submit" value="Add Skill" />
            </form>
        </div>
    );
};

export default SkillMaster;