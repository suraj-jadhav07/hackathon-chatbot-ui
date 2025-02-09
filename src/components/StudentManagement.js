import React, { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import "../styles/StudentManagement.css";
import axios from "axios";

const StudentManagement = () => {
  const [students, setStudents] = useState([
    { id: 1, firstName: "John", lastName: "Doe", email: "john@example.com" },
    { id: 2, firstName: "Jane", lastName: "Smith", email: "jane@example.com" }
  ]);
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "" });


  useEffect(() => {
    getAllStudents();
  },[]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addStudent = () => {
    setLoading(true);

    const validationErrors = validateStudentForm(formData);
    const url = "";

    if (validationErrors && Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      setLoading(false);
    } else {
      axios
      .post(url, {})
      .then((response) => {

      })
      .catch((error) => {
        console.error("Add student failed:", error.response?.data || error.message);        
        setLoading(false);
      });
    }

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const onCancelAddStudents = () => {
    setShowForm(false);
    setFormData({ firstName: "", lastName: "", email: "" });
    setErrors({});
  }

  const validateStudentForm = (formData) => {
    const errors = {};
    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    return errors;

  }

  const deleteStudent = (id) => {
    axios
    .delete()
    .then((response) => {

    })
    .catch((error) => {

    })
    setStudents(students.filter(student => student.id !== id));
  };

  const getAllStudents = () => {
    axios
    .get()
    .then((response) => {

    })
    .catch((error) => {

    })
  }

  return (
    <div className="student-management">
      <div className="student-management-header">
        <h1>Students</h1>
        <p>Manage your student roster</p>
        <button className="add-student-btn" onClick={() => setShowForm(!showForm)}>
          <FaPlus /> Add Student
        </button>
      </div>

      {showForm && (
        <div className="student-form">
          <div className="stmg-form-group">
            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
            {errors && errors.firstName && <span className="stmg-error-form">{errors.firstName}</span>}
          </div>
          <div className="stmg-form-group">
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
            {errors && errors.lastName && <span className="stmg-error-form">{errors.lastName}</span>}
          </div>
          <div className="stmg-form-group">
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            {errors && errors.email && <span className="stmg-error-form">{errors.email}</span>}
          </div>
          <div className="stmg-button-group">
            <button 
              className="student-management-save-btn" 
              onClick={addStudent} 
              disabled={loading}
              >{loading ? <span className="loader"></span>:"Add Student"}
              </button>
            <button className="student-management-cancel-btn" onClick={onCancelAddStudents} disabled={loading}>Cancel</button>
          </div>
        </div>
      )}

      <table className="student-management-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.email}</td>
              <td className="student-management-actions">
                {/* <button className="student-management-edit-btn"><FaEdit /></button> */}
                <button className="student-management-delete-btn" onClick={() => deleteStudent(student.id)}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentManagement;
