import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('https://student-management-backend-dlg0.onrender.com/students')
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`https://student-management-backend-dlg0.onrender.com/students/${id}`);
    setStudents(students.filter(s => s._id !== id));
  };

  return (
    <div>
      <h2>Student List</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Roll Number</th>
            <th>Department</th>
            <th>Date of Birth</th> {/* 🆕 DOB Header */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.rollNumber}</td>
              <td>{student.department}</td>
              <td>{student.dob}</td> {/* 🆕 Show DOB */}
              <td>
                <Link to={`/edit/${student._id}`}>Edit</Link> | 
                <button onClick={() => handleDelete(student._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/add"><button>Add New Student</button></Link>
    </div>
  );
};

export default StudentList;
