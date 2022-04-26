import React, { useState, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import { BsPlusCircle } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { FaShareSquare } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { FaFileAlt } from "react-icons/fa";
import './UserHome.css'
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserHome = () => {
    const [resumeInfo, setResumeInfo] = useState([]);
    const [temp, setTemp] = useState(0);

    const userId = 1;
    useEffect(() => {
        let result = async () => {
            try {
                const result2 = await axios.get(`http://localhost:8080/resume/user/${userId}`).then(res => {
                    const response = res.data;
                    setResumeInfo(response);
                    console.log(resumeInfo);
                })
            }
            catch (err) {
                console.log(err);
            }
        }
        result();
    }, [temp]);

    const cloneResume = (id) => {
        console.log("clonging resume of id" +  id);
        axios.get(`http://localhost:8080/resume/clone/${id}`).then(res => {
            const response = res.data;
            setTemp(response);
        })
    }

    const shareResume = (id) => {
        console.log("Sharing resume of id" + id);
        axios.put(`http://localhost:8080/resume/share/${id}`).then(res => {
            console.log("updated result", res.data);
            setTemp(id);
        });
    }

    const editResume = (id) => {
        console.log("editing resume of id" + id);
        // console.log(resumeInfo)
    }

    let resumeMapper = resumeInfo.map((data, index) => {
        return (
            <div className='system'>
                <div className='card'>
                    <div className='cardUppr'>
                        <img src='logo.jfif' id="Image" />
                        <h6 className='userName'>{data.name}</h6>
                        <h6 className='userDes'>{data.role.toString()}</h6>
                        <p>{data.about_me}</p>
                    </div>
                    <div className='cardLower'>
                        <h5>{(data.status) ? data.status : "Null"}</h5>
                        <h4>Project Manager</h4>
                        <h6>PSI Resume Project Manager Virendra Singh</h6>
                    </div>

                    <div class="dpdown">
                        <button class="dropbtn"><BsThreeDots /></button>
                        <div class="dropdown-content">
                            <span onClick={() => editResume(data.resumeId)}><MdEdit /> Edit </span>
                            <span onClick={() => cloneResume(data.resumeId)}><FaFileAlt /> Clone</span>
                            <span onClick={() => shareResume(data.resumeId)}><FaShareSquare /> Share</span>
                            <Link to={`/editforms/editMyDetails/${data.resumeId}`}>Edit</Link>
                        </div>
                </div>

            </div>
            </div>
            
        )
    })


    return (
        <div className='UserHome'>
            <div className='homeHeader'>
                <div className='homeNav'>
                    <img src='logo.jfif' id="Image" />
                    <span>
                        <h4>Resumes</h4>
                        <h4>Management System</h4>
                    </span>
                    <input className="search" type="text" value="" placeholder="Search" />
                    <span className='searchIcon'><i><FaSearch /></i></span>
                </div>

                <div className='homeMenu'>
                    <img src="userIcon.png" id="imageId" /><span className='endMenu'>
                        <h6>Virendra Sharma</h6>
                        <Link to="/" >
                            <button className='sign-out'>Sign-out</button>
                        </Link>
                    </span>
                </div>

            </div>
            <div className='homeSection'>
                <div className='try'>
                <Link className='section' to="/forms/myDetails">
                    <div className='newResume'>
                        <i><BsPlusCircle /></i>
                        <h5>Create New</h5>
                    </div>
                </Link>
                </div>
                
                <h3>My Resumes</h3> 
                <div className='section1'>
                    {/* <h4>My Resumes</h4> */}
                

                    {resumeMapper}

                </div>

            </div>
        </div>
    );
}

export default UserHome;