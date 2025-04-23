import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: '',
    email: '',
    rollNumber: '',
    department: '',
    dob: ''
  });

  useEffect(() => {
    axios.get(`https://student-management-backend-dlg0.onrender.com/students/${id}`)
      .then((res) => setStudent(res.data))
      .catch((err) => toast.error("Error fetching student"));
  }, [id]);

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
await axios.put(`https://student-management-backend-dlg0.onrender.com/students/${id}`, student);

      toast.success("Student updated!");
      navigate('/students');
    } catch (err) {
      console.error(err);
      toast.error("Update failed.");
    }
  };

  return (
    <div>
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={student.name} onChange={handleChange} required />
        <input name="email" value={student.email} onChange={handleChange} required />
        <input name="rollNumber" value={student.rollNumber} onChange={handleChange} required />
        <input name="department" value={student.department} onChange={handleChange} required />
        <input
          name="dob"
          value={student.dob}
          onChange={handleChange}
          placeholder="Date of Birth (dd-mm-yyyy)"
        pattern={"\\d{2}-\\d{2}-\\d{4}"}

          title="Enter DOB in dd-mm-yyyy format"
          required
        />
        <br />
        <button type="submit">Update Student</button>
      </form>
    </div>
  );
};

export default EditStudent;
