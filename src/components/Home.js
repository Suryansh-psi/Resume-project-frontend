// import React from 'react';
// import { Link } from 'react-router-dom';


// const Home = () => {
//     return (
//         <div>
//             This is home Component
//             <Link to="/userHome">User Home Page</Link>
//             <Link to="/managerHpme">Manager Home Page</Link>
//         </div>
//     );
// }

// export default Home;

import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'

const Home = () => {
    return (

        <div className='login' style={{ backgroundImage: "url(/bg1.jpg)",backgroundRepeat:"no-repeat",backgroundSize:"cover" }}>
            <h1>Resume Management System</h1>
            <h2 className='groupName'>(Group 4)</h2>
            <div className='user'>
                <h2>Login As User</h2>
                <img src='userIcon.png' id="Image"/>
                <Link  to="/userHome">
                <button>Login</button>
                </Link>
               
            </div>
            <div className='manager'>
                <h2>Login As Manager</h2>
                <img src='userIcon.png' id="Image"/>
                

                <Link  to="/managerHome">
                <button>Login</button>
                </Link>
            </div>
        </div>
        
            

    );
}

export default Home;