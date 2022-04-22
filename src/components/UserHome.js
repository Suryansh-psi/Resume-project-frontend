import React from 'react';
import { FaSearch } from "react-icons/fa";
import { BsPlusCircle } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { FaShareSquare } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { FaFileAlt } from "react-icons/fa";
import './UserHome.css'
import { Link } from 'react-router-dom';


const UserHome = () => {
    return (
        <div className='UserHome'>
            <div className='homeHeader'>
                <div className='homeNav'>
                    <img src='logo.jfif' id="Image"/>
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
                   <button className='sign-out'>Sign-out</button></span>
                </div>

            </div>
            <div className='homeSection'>
                <Link className='section' to="/forms/myDetails">
                    <div className='newResume'>
                        <i><BsPlusCircle /></i>
                        <h5>Create New</h5>
                    </div>
                </Link>
                <div className='section1'>
                    <h4>My Resumes</h4>
                    <div className='card'>
                        <div className='cardUppr'>
                            <img src='logo.jfif' id="Image"/>
                            <h6 className='userName'>Name</h6>
                            <h6 className='userDes'>Designation</h6>
                            <p>Some text.....</p>
                        </div>
                        <div className='cardLower'>
                            <h5>Draft</h5>
                            <h4>Project Manager</h4>
                            <h6>PSI Resume Project Manager Virendra Singh</h6>
                        </div>
                        
                        <div class="dpdown">
                        <button class="dropbtn"><BsThreeDots/></button>
                        <div class="dropdown-content">
                            <a href="#"><MdEdit /> Edit </a>
                            <a href="#"><FaFileAlt /> Clone</a>
                            <a href="#"><FaShareSquare /> Share</a>
                        </div>
                        </div>
                        
                    </div>
                </div>

            </div>
        </div>
    );
}

export default UserHome;