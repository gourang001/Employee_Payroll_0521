// document.querySelector("#employeeForm").addEventListener("submit", async function (e) {
//   e.preventDefault(); 

//   // Collect form values
//   const name = document.getElementById("name").value.trim();
//   const profileImage = document.querySelector('input[name="profile-image"]:checked')?.value || "";
//   const gender = document.querySelector('input[name="profile-gender"]:checked')?.value || "";
//   const departments = Array.from(document.querySelectorAll('input[name="department"]:checked')).map((checkbox) => checkbox.value);
//   const salary = document.getElementById("salary").value || "";
//   const startDateParts = {
//       day: document.getElementById("day").value || "",
//       month: document.getElementById("month").value || "",
//       year: document.getElementById("year").value || "",
//   };
//   const startDate = `${startDateParts.day} ${startDateParts.month} ${startDateParts.year}`.trim();
//   const notes = document.getElementById("notes").value.trim();

//   // Validate required fields
//   if (!name || !profileImage || !gender || departments.length === 0 || !salary || !startDateParts.day || !startDateParts.month || !startDateParts.year) {
//       alert("Please fill in all required fields.");
//       return;
//   }

//   // Create the employee object
//   const employee = { name, profileImage, gender, departments, salary, startDate, notes };

//   // POST the data to the API
//   try {
//       const response = await fetch("http://localhost:3000/EmpList", {
//           method: "POST",
//           headers: {
//               "Content-Type": "application/json",
//           },
//           body: JSON.stringify(employee),
//       });

//       if (!response.ok) {
//           throw new Error("Failed to add employee");
//       }

//       alert("Employee data added successfully!");
//       e.target.reset(); // Reset the form after successful submission
//   } catch (error) {
//       console.error("Error:", error);
//       alert("Error adding employee data.");
//   }
// });

document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const empId = urlParams.get("id");
  
    if (empId) {
      try {
        const response = await fetch(`http://localhost:3000/EmpList/${empId}`);
        if (!response.ok) throw new Error("Failed to fetch employee data");
        
        const employee = await response.json();
  
        // Pre-fill form fields
        document.getElementById("name").value = employee.name;
        document.querySelector(`input[name="profile-image"][value="${employee.profileImage}"]`).checked = true;
        document.querySelector(`input[name="profile-gender"][value="${employee.gender}"]`).checked = true;
  
        // Select multiple departments
        document.querySelectorAll('input[name="department"]').forEach((checkbox) => {
          checkbox.checked = employee.departments.includes(checkbox.value);
        });
  
        document.getElementById("salary").value = employee.salary;
  
        // Split start date and set values
        const [day, month, year] = employee.startDate.split(" ");
        document.getElementById("day").value = day;
        document.getElementById("month").value = month;
        document.getElementById("year").value = year;
  
        document.getElementById("notes").value = employee.notes;
      } catch (error) {
        console.error("Error loading employee data:", error);
      }
    }
  });
  
  // Handle Form Submission (Update if Editing, Add if New)
  document.querySelector("#employeeForm").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const urlParams = new URLSearchParams(window.location.search);
    const empId = urlParams.get("id");
  
    // Collect form values
    const name = document.getElementById("name").value.trim();
    const profileImage = document.querySelector('input[name="profile-image"]:checked')?.value || "";
    const gender = document.querySelector('input[name="profile-gender"]:checked')?.value || "";
    const departments = Array.from(document.querySelectorAll('input[name="department"]:checked')).map((checkbox) => checkbox.value);
    const salary = document.getElementById("salary").value || "";
    const startDate = `${document.getElementById("day").value} ${document.getElementById("month").value} ${document.getElementById("year").value}`;
    const notes = document.getElementById("notes").value.trim();
  
    if (!name || !profileImage || !gender || departments.length === 0 || !salary || !startDate) {
      alert("Please fill in all required fields.");
      return;
    }
  
    const employee = { name, profileImage, gender, departments, salary, startDate, notes };
  
    try {
      let response;
      if (empId) {
        // Update Employee
        response = await fetch(`http://localhost:3000/EmpList/${empId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(employee),
        });
      } else {
        // Add New Employee
        response = await fetch("http://localhost:3000/EmpList", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(employee),
        });
      }
  
      if (!response.ok) throw new Error("Failed to save employee data");
  
      alert(empId ? "Employee updated successfully!" : "Employee added successfully!");
      window.location.href = "/Pages/dashboard.html"; // Redirect back to dashboard
    } catch (error) {
      console.error("Error:", error);
      alert("Error saving employee data.");
    }
  });
  