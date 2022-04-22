import React from 'react';
import './Screen.css'


const Screen = () => {
    return (

        <div className='login'>
            <h1>Resume Management System</h1>
            <div className='user'>
                <h2>Login As User</h2>
                <img src='userIcon.png' id="Image"/>
                <button>Login</button>
            </div>
            <div className='manager'>
                <h2>Login As Manager</h2>
                <img src='userIcon.png' id="Image"/>
                <button>Login</button>
            </div>
        </div>
        
            

    );
}

export default Screen;