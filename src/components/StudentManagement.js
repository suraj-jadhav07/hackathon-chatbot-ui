import React, { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import "../styles/StudentManagement.css";
import axios from "axios";
import { API_CONST } from "../core/constants";

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  // const [students, setStudents] = useState([
  //   { id: 1, first_name: "John", last_name: "Doe", email: "john@example.com" },
  //   { id: 2, first_name: "Jane", last_name: "Smith", email: "jane@example.com" },
  //   { id: 3, first_name: "User1", last_name: "1", email: "user1@example.com" },
  //   { id: 4, first_name: "User2", last_name: "2", email: "user2@example.com" },
  //   { id: 5, first_name: "User3", last_name: "3", email: "user3@example.com" }
  // ]);


  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "" });
  const [isUpdateStudent, setIsUpdateStudent] = useState(false);

  useEffect(() => {
    getAllStudents();
  },[]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addStudent = () => {
    const teacher_id= Number(localStorage.getItem('userId'));
    setLoading(true);

    const validationErrors = validateStudentForm(formData);
    const url = "";

    if (validationErrors && Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      setLoading(false);
    } else {
      axios
      .post(API_CONST.ADD_STUDENT, {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        teacher_id: teacher_id
      })
      .then((response) => {
        console.log("student added successfully:", response.data);
        setFormData({ firstName: "", lastName: "", email: "" });
        getAllStudents();
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
    setIsUpdateStudent(false);
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
    .delete(`${API_CONST.DELETE_STUDENT}/${id}`)
    .then((response) => {
      console.log("get Students list:", response.data);
      getAllStudents();
    })
    .catch(() => {
      setLoading(false);
    })
    // setStudents(students.filter(student => student.id !== id));
  };

  const updateStudent = (formData) => {
    const teacher_id= Number(localStorage.getItem('userId'));
    console.log(teacher_id,"teacherid")
    const validationErrors = validateStudentForm(formData);
    if (validationErrors && Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      setLoading(false);
    } else {
    console.log("formData", formData);
    axios
    .put(`${API_CONST.EDIT_STUDENT}/${formData.id}`, { 
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      teacher_id: teacher_id
    }
    )
    .then((response) => {
      getAllStudents();
      setFormData({ id: "", firstName: "", lastName: "", email: "" });
    })
    .catch(() => {
      setLoading(false);
    })  
  }
  };

  const getAllStudents = () => {
    const teacher_id= Number(localStorage.getItem('userId'));
    axios
    .get(`${API_CONST.GET_STUDENT}?teacher_id=${teacher_id}`)
    .then((response) => {
      console.log("get students:", response.data);
      setStudents(response.data);
    })
    .catch((error) => {
      setLoading(false);
    })
  }

  const handleEdit = (id, student) => {
    console.log("id", id, student);
    setShowForm(true);
    setIsUpdateStudent(true);
    setFormData({ id: student.id, firstName: student.first_name, lastName: student.last_name, email: student.email });
  }

  return (
    <div className="student-management">
      <div className="student-management-header">
        <h1>Students</h1>
        <p>Manage your student roster</p>
        <button className="add-student-btn" onClick={() => setShowForm(!showForm)}
          disabled={isUpdateStudent}>
          <FaPlus /> Add Student
        </button>
      </div>

      {showForm && (
        <div className="student-form">
          <div className="stmg-form-group">
           <input type="text" name="id" value={formData.id} hidden readOnly/>

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
              hidden={isUpdateStudent}
              >{loading ? <span className="loader"></span>:"Add Student"}
              </button>

              <button 
              className="student-management-save-btn" 
              onClick={() => updateStudent(formData)} 
              disabled={loading}
              hidden={!isUpdateStudent}
              >{loading ? <span className="loader"></span>:"Update Student"}
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
              <td>{student.first_name}</td>
              <td>{student.last_name}</td>
              <td>{student.email}</td>
              <td className="student-management-actions">
                <button className="student-management-edit-btn" onClick={() => handleEdit(student.id, student)}><FaEdit /></button>
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
