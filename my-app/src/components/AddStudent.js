
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



const AddStudent = () => {
  const [student, setStudent] = useState({
    name: '',
    email: '',
    rollNumber: '',
    department: '',
    dob: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate DOB format
    const dobRegex = /^\d{2}-\d{2}-\d{4}$/;
    if (!dobRegex.test(student.dob)) {
      toast.error('Invalid Date of Birth format. Use dd-mm-yyyy.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/students', student);
      toast.success('Student added successfully!');
      navigate('/students');
    } catch (error) {
      console.error(error);
      toast.error('Failed to add student.');
    }
  };

  return (
    <div>
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={student.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={student.email} onChange={handleChange} required />
        <input name="rollNumber" placeholder="Roll Number" value={student.rollNumber} onChange={handleChange} required />
        <input name="department" placeholder="Department" value={student.department} onChange={handleChange} required />
        <input
          name="dob"
          placeholder="Date of Birth (dd-mm-yyyy)"
          value={student.dob}
          onChange={handleChange}
          pattern="\d{2}-\d{2}-\d{4}"
          title="Enter DOB in dd-mm-yyyy format"
          required
        />
        <br />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
