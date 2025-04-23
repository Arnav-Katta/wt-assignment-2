import React from 'react';
import { Link } from 'react-router-dom';



const Home = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to Student Management System</h1>
      <p>To simplify records.</p>
      <Link to="/students"><button style={{ marginRight: '10px' }}>View Students</button></Link>
      <Link to="/add"><button>Add New Student</button></Link>
    </div>
  );
};

export default Home;
