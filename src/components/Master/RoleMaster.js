import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import './RoleMaster.css'
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import MasterSidebar from './MasterSidebar';
import swal from 'sweetalert';


const RoleMaster = () => {
    const [roleInfo, setRoleInfo] = useState([]);
    const { register, handleSubmit, formState: { errors }, reset, trigger } = useForm();
    const [temp, setTemp] = useState(0);
    const [term, setTerm] = useState();

    useEffect(() => {
        let result = async () => {
            try {
                const result2 = await axios.get(`http://localhost:8080/role`).then(res => {
                    const response = res.data;
                    setRoleInfo(response);
                    console.log(roleInfo);
                })
            }
            catch (err) {
                console.log(err);
            }
        }
        result();
    }, [temp, term]);

    const editRole = (id,  name , desc) => {
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
            // console.log("this value is from swal", value);
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
                axios.put(`http://localhost:8080/role/${id}`, {
                    "role_name": value,
                    "role_desc": value2,
                    "isVisible": true
                }).then((res) => {
                    swal(`Role Details has been updated`);
                    let date = new Date();
                    setTerm(date.toLocaleString());
                })
                
            })
        });
    }

    const deleteRole = (id) => {
        
        console.log("Deleting Role with Id", id); 
        axios.delete(`http://localhost:8080/role/${id}`).then(res => {
            NotificationManager.error('Role deleted successfully !');
            setTemp(res);
        })
    }

    const roleMapper = roleInfo.map((data, index) => {
        return (
            <tr key={index}>
                <td>{data.role_name}</td>
                <td>{data.role_desc}</td>
                <td>
                    <button className='delBtn' onClick={() => deleteRole(data.role_id)}>Delete</button>
                    <button className='editBtn' onClick={() => editRole(data.role_id, data.role_name, data.role_desc)}>Edit</button>
                    <NotificationContainer/>
                </td>
            </tr>
        )
    })

    const customFunction = (d) => {
        console.log(d);
        axios.post('http://localhost:8080/role', {
            "role_name": d.roleName,
            "role_desc": d.roleDesc,
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
            
            <h2>Role Master</h2>

            <form onSubmit={handleSubmit((data) => customFunction(data))}>
                <div className='roleMasterName'>
                    <label>
                        Role Name
                        <input type="text" {...register("roleName")} placeholder="Enter Role" name="roleName" />
                    </label>
                </div>
                
                <div>
                    <label className='roleMasterDesc'>
                        Role Description
                    </label>
                    <textarea className={`textarea1 ${errors.about && "invalid"}`}
                        {...register('roleDesc', {
                            required: "*required",
                            maxLength: {
                                value: 500,
                                message: "*limit exceed"
                            }
                        })}
                        onKeyUp={() => {
                            trigger("roleDesc");
                        }}
                        name="roleDesc" placeholder="Write something about role description (max 150 words)" cols="41" rows="8">

                    </textarea>
                    
                </div>
                
                <input className="addRole" type="submit" value="Add Role" />
            </form>
            

            {/* table to show roles */}
            <div className='masterTable'>
                <table border="2" className="">
                    <thead>
                        <tr>
                            <th>Role Name<i></i></th>
                            <th>Role Desc<i></i></th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {roleMapper}
                    </tbody>
                </table>

            </div>
            
        </div>
        </>
    );
};

export default RoleMaster;