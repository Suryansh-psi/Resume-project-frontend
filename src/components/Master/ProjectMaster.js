import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import MasterSidebar from './MasterSidebar';


const ProjectMaster = () => {
    const [projectInfo, setProjectInfo] = useState([]);
    const { register, handleSubmit, formState: { errors }, reset, trigger } = useForm();
    const [temp, setTemp] = useState(0);

    useEffect(() => {
        let result = async () => {
            try {
                const result2 = await axios.get(`http://localhost:8080/project`).then(res => {
                    const response = res.data;
                    setProjectInfo(response);
                    console.log(projectInfo);
                })
            }
            catch (err) {
                console.log(err);
            }
        }
        result();
    }, [temp]);

    const editProject = (id) => {
        console.log("Editing Project with Id", id);
        // axios.put(`http://localhost:8080/role/${id}`, {
        //     "role_name": d.roleName,
        //     "role_desc": d.roleDesc,
        //     "isVisible": true
        // }).then(res => {
        //     // console.log(res);
        //     // console.log(res.data);
        // })
    }

    const deleteProject = (id) => {
        console.log("Deleting Project with Id", id);
        axios.delete(`http://localhost:8080/project/${id}`).then(res => {
            setTemp(res);
        })
    }

    const projectMapper = projectInfo.map((data, index) => {
        return (
            <tr key={index}>
                <td>{data.project_name}</td>
                <td>{data.project_desc}</td>
                <td>
                    {/* <button onClick={() => editRole(data.role_id)}>Edit</button> */}
                    <button className='delBtn' onClick={() => deleteProject(data.project_id)}>Delete</button>
                    <button className='editBtn' onClick={() => editProject(data.project_id)}>Edit</button>
                </td>
            </tr>
        )
    })

    const customFunction = (d) => {
        console.log(d);
        axios.post('http://localhost:8080/project', {
            "project_name": d.projectName,
            "project_desc": d.projectDesc,
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
            
            <h2>Project Master</h2>

            <form onSubmit={handleSubmit((data) => customFunction(data))}>
                <div className='roleMasterName'>
                    <label>
                        Project Name
                        <input type="text" {...register("projectName")} placeholder="Enter Project Name" name="projectName" />
                    </label>
                </div>
                
                <div>
                    <label className='roleMasterDesc'>
                        Project Description
                    </label>
                    <textarea className={`textarea1 ${errors.projectDesc && "invalid"}`}
                        {...register('projectDesc', {
                            required: "*required",
                            maxLength: {
                                value: 150,
                                message: "*limit exceed"
                            }
                        })}
                        onKeyUp={() => {
                            trigger("projectDesc");
                        }}
                        name="projectDesc" placeholder="Write something about project (max 150 words)" cols="41" rows="8">

                    </textarea>
                    
                </div>
                
                <input className="addRole" type="submit" value="Add Project" />
            </form>
            

            {/* table to show roles */}
            <div className='masterTable'>
                <table border="2" className="">
                    <thead>
                        <tr>
                            <th>Project Name<i></i></th>
                            <th>Project Desc<i></i></th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {projectMapper}
                    </tbody>
                </table>

            </div>
            
        </div>
        </>
    );
};

export default ProjectMaster;