import React, { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { FcApproval } from "react-icons/fc";
import { VscPreview } from "react-icons/vsc";
import { FaCommentDots } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { FaFileAlt } from "react-icons/fa";
import './ManagerHome.css'
import axios from 'axios';

const ManagerHome = () => {
    const [resumeInfo, setResumeInfo] = useState([]);
    const [temp, setTemp] = useState(0);

    const userId = 1;
    const managerId = 1;
    useEffect(() => {
        let result = async () => {
            try {
                const result2 = await axios.get(`http://localhost:8080/resume/manager/${userId}/${managerId}`).then(res => {
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

    const resumeMapper = resumeInfo.map((data, index) => {
        return (
            <div className='card'>
                <div className='cardUppr'>
                    <img src='logo.jfif' id="Image" />
                    <h6 className='managerName'>{data.name}</h6>
                    <h6 className='managerDes'>{data.role.toString()}</h6>
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
                        <Link to={`\preview\\${data.resumeId}`}><VscPreview /> Preview </Link>
                        <span href="#"><FcApproval /> Approved</span>
                        {/* <a href="#"><FaCommentDots /> Comment</a> */}
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className='ManagerHome'>
            <div className='ManagerHeader'>
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


                        <Link className='sign' to="/" >
                            <button className='sign1'>Sign-out</button>
                        </Link>
                    </span>
                </div>

            </div>
            <div className='ManagerSection'>

                <div className='sectionManager1'>
                    <h4>Employees Resume</h4>
                    <div className='managerButton'>
                        <Link to="/projectMaster">
                            <button className='m1'>Project Master</button>
                        </Link>
                        <Link to="/roleMaster">
                            <button className='m2'>Role Master</button>
                        </Link>
                        <Link to="/techstackMaster">
                            <button className='m3'>Tech-Stack Master</button>
                        </Link>
                        <Link to="/skillMaster">
                            <button className='m4'>Skill Master</button>
                        </Link>

                    </div>
                    <div className='Manager'>
                        {resumeMapper}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ManagerHome;