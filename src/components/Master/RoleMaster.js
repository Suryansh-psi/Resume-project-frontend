import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";


const RoleMaster = () => {
    const [roleInfo, setRoleInfo] = useState([]);
    const { register, handleSubmit, formState: { errors }, reset, trigger } = useForm();
    const [temp, setTemp] = useState(0);

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
    }, [temp]);

    const editRole = (id) => {
        console.log("Editing Role with Id", id);
        // axios.put(`http://localhost:8080/role/${id}`, {
        //     "role_name": d.roleName,
        //     "role_desc": d.roleDesc,
        //     "isVisible": true
        // }).then(res => {
        //     // console.log(res);
        //     // console.log(res.data);
        // })
    }

    const deleteRole = (id) => {
        console.log("Deleting Role with Id", id);
        axios.delete(`http://localhost:8080/role/${id}`).then(res => {
            setTemp(res);
        })
    }

    const roleMapper = roleInfo.map((data, index) => {
        return (
            <tr key={index}>
                <td>{data.role_name}</td>
                <td>{data.role_desc}</td>
                <td>
                    {/* <button onClick={() => editRole(data.role_id)}>Edit</button> */}
                    <button onClick={() => deleteRole(data.role_id)}>Delete</button>
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
        <div>
            <h2>Role Master</h2>
            

            {/* table to show roles */}
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

            {/* form to add role */}
            <form onSubmit={handleSubmit((data) => customFunction(data))}>
                <label>
                    Enter Role
                    <input type="text" {...register("roleName")} placeholder="Enter Role" name="roleName" />
                </label>

                <label>
                    Enter Role Desc
                    <textarea className={`textarea ${errors.about && "invalid"}`}
                        {...register('roleDesc', {
                            required: "*required",
                            maxLength: {
                                value: 150,
                                message: "*limit exceed"
                            }
                        })}
                        onKeyUp={() => {
                            trigger("roleDesc");
                        }}
                        name="roleDesc" placeholder="Write something about role description (max 150 words)" cols="30" rows="10"></textarea>
                </label>
                <input type="submit" value="Add Role" />
            </form>
        </div>
    );
};

export default RoleMaster;