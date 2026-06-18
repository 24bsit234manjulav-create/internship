import React, { useState } from "react";

export default function App() {
  const students = [
    { id: 1, name: "Agalya", batch: "Batch A" },
    { id: 2, name: "Rahul", batch: "Batch A" },
    { id: 3, name: "Priya", batch: "Batch B" },
    { id: 4, name: "Karthik", batch: "Batch B" },
    { id: 5, name: "Meena", batch: "Batch C" }
  ];

  const [selectedBatch, setSelectedBatch] = useState("All");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [attendance, setAttendance] = useState({});

  const batches = ["All", ...new Set(students.map((s) => s.batch))];

  const markAttendance = (studentId, status) => {
    const key = `${studentId}-${selectedDate}`;

    setAttendance((prev) => ({
      ...prev,
      [key]: status
    }));
  };

  const getStatus = (studentId) => {
    const key = `${studentId}-${selectedDate}`;
    return attendance[key] || "";
  };

  const calculatePercentage = (studentId) => {
    const records = Object.entries(attendance).filter(([key]) =>
      key.startsWith(`${studentId}-`)
    );

    if (records.length === 0) return 0;

    const presentCount = records.filter(
      ([, value]) => value === "Present"
    ).length;

    return Math.round((presentCount / records.length) * 100);
  };

  const filteredStudents =
    selectedBatch === "All"
      ? students
      : students.filter((s) => s.batch === selectedBatch);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Trainer Session Attendance Dashboard</h1>

      <div style={styles.filterContainer}>
        <div>
          <label style={styles.label}>Select Batch</label>
          <select
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            style={styles.input}
          >
            {batches.map((batch) => (
              <option key={batch}>{batch}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={styles.label}>Select Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={styles.input}
          />
        </div>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Student</th>
            <th style={styles.th}>Batch</th>
            <th style={styles.th}>Attendance</th>
            <th style={styles.th}>Percentage</th>
          </tr>
        </thead>

        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id}>
              <td style={styles.td}>{student.name}</td>
              <td style={styles.td}>{student.batch}</td>

              <td style={styles.td}>
                <button
                  style={{
                    ...styles.button,
                    backgroundColor:
                      getStatus(student.id) === "Present"
                        ? "#28a745"
                        : "#d1d5db"
                  }}
                  onClick={() => markAttendance(student.id, "Present")}
                >
                  Present
                </button>

                <button
                  style={{
                    ...styles.button,
                    backgroundColor:
                      getStatus(student.id) === "Absent"
                        ? "#dc3545"
                        : "#d1d5db"
                  }}
                  onClick={() => markAttendance(student.id, "Absent")}
                >
                  Absent
                </button>
              </td>

              <td style={styles.td}>
                {calculatePercentage(student.id)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f6f9",
    minHeight: "100vh",
    padding: "30px"
  },

  heading: {
    textAlign: "center",
    marginBottom: "30px"
  },

  filterContainer: {
    display: "flex",
    gap: "20px",
    marginBottom: "25px",
    flexWrap: "wrap"
  },

  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "bold"
  },

  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff"
  },

  th: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "12px",
    border: "1px solid #ddd"
  },

  td: {
    padding: "12px",
    border: "1px solid #ddd",
    textAlign: "center"
  },

  button: {
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    margin: "0 5px",
    borderRadius: "5px",
    cursor: "pointer"
  }
};