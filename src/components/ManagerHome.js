import React from 'react';
import { FaSearch } from "react-icons/fa";
import {FcApproval} from "react-icons/fc";
import { VscPreview  } from "react-icons/vsc";
import { FaCommentDots} from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import './ManagerHome.css'


const ManagerHome = () => {
    return (
        <div className='UserHome'>
            <div className='homeHeader'>
                <div className='homeNav'>
                <img src='logo.jfif' id="Image"/>
                    <span>
                        
                        <h3>Resumes</h3>
                        <h3>Management System</h3>
                        </span>
                        <input className="search" type="text" value="" placeholder="Search" />
                    <span className='searchIcon'><i><FaSearch /></i></span>
                </div>
                
                <div className='homeMenu'>
                   <img src="userIcon.png" id="imageId" /><span className='endMenu'> 
                   <h5>Virendra Sharma</h5>
                   <button className='sign-out'>Sign-out</button></span>
                </div>

            </div>
            <div className='homeSection'>
                
                <div className='section1'>
                    <h4>Employees Resume</h4>
                    <div className='card'>
                        <div className='cardUppr'>
                            <img src='logo.jfif' id="Image"/>
                            <h5>Name</h5>
                            <h6>Designation</h6>
                            <p>Some text.....</p>
                        </div>
                        <div className='cardLower'>
                            <h5>Draft</h5>
                            <h4>Project Manager</h4>
                            <h6>PSI Resume Project Manager Virendra Singh</h6>
                        </div>
                        
                        <div class="dropdown">
                        <button class="dropbtn">...</button>
                        <div class="dropdown-content">
                            <a href="#"><VscPreview /> Preview </a>
                            <a href="#"><FcApproval /> Approved</a>
                            <a href="#"><FaCommentDots /> Comment</a>
                        </div>
                        </div>
                        
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ManagerHome;