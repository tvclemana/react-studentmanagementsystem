import React, { useState } from "react";
import "./app.css";

const studentsData = [
  {
    lastName: "Cerbo",
    firstName: "Deandrei",
    course: "DS",
    birthdate: "2006/07/28",
  },
  {
    lastName: "Aman",
    firstName: "Glenn",
    course: "DS",
    birthdate: "2001/01/01",
  },
  {
    lastName: "Roman",
    firstName: "Mark",
    course: "IS",
    birthdate: "1995/02/02",
  },
  {
    lastName: "Aspa",
    firstName: "Kurt",
    course: "CS",
    birthdate: "2002/05/04",
  },
  {
    lastName: "Ancheta",
    firstName: "Nolan",
    course: "IT",
    birthdate: "1999/06/17",
  },
  {
    lastName: "Lemana",
    firstName: "Tristan",
    course: "CS",
    birthdate: "2003/04/07",
  },
];

function calculateAge(birthdate) {
  const birthDate = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
}

const StudentTable = () => {
  const [filteredData, setFilteredData] = useState(studentsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

  const handleFilter = () => {
    const trimmedSearchTerm = searchTerm.trim().toLowerCase();

    const filtered = studentsData.filter((student) => {
      const matchesSearchTerm =
        student.lastName.toLowerCase().includes(trimmedSearchTerm) ||
        student.firstName.toLowerCase().includes(trimmedSearchTerm) ||
        student.course.toLowerCase() === trimmedSearchTerm ||
        calculateAge(student.birthdate).toString().includes(trimmedSearchTerm);

      const matchesDateRange =
        (!minDate || new Date(student.birthdate) >= new Date(minDate)) &&
        (!maxDate || new Date(student.birthdate) <= new Date(maxDate));

      return matchesSearchTerm && matchesDateRange;
    });
    setFilteredData(filtered);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setMinDate("");
    setMaxDate("");
    setFilteredData(studentsData);
  };

  return (
    <div className="container">
      <h1>Student Management System</h1>

      <div className="card">
        <div className="filter-section">
          <input
            type="text"
            placeholder="Search by Last Name, First Name, Course, or Age"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleFilter();
              }
            }}
          />

          <div>
            <label>Min Date:</label>
            <input
              type="date"
              value={minDate}
              onChange={(e) => {
                setMinDate(e.target.value);
              }}
            />
          </div>
          <div>
            <label>Max Date:</label>
            <input
              type="date"
              value={maxDate}
              onChange={(e) => {
                setMaxDate(e.target.value);
              }}
            />
          </div>
          <button onClick={handleFilter}>Filter</button>
          <button onClick={resetFilters} style={{ marginLeft: "10px" }}>
            Refresh
          </button>
        </div>
      </div>

      <table className="student-table">
        <thead>
          <tr>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Course</th>
            <th>Birthdate</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((student, index) => (
            <tr key={index}>
              <td>{student.lastName}</td>
              <td>{student.firstName}</td>
              <td>{student.course}</td>
              <td>{student.birthdate}</td>
              <td>{calculateAge(student.birthdate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
