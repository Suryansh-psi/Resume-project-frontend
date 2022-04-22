import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
    return (
        <div>
            This is home Component
            <Link to="/userHome">User Home Page</Link>
            <Link to="/managerHpme">Manager Home Page</Link>
        </div>
    );
}

export default Home;