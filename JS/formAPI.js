document.addEventListener("DOMContentLoaded", async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const empId = urlParams.get("id");

  if (empId) {
      try {
          const response = await fetch(`http://localhost:3000/EmpList/${empId}`);
          if (!response.ok) throw new Error("Failed to fetch employee data");

          const employee = await response.json();

          // Store previous employee details in localStorage before displaying
          if (!localStorage.getItem(`previousEmp_${empId}`)) {
              localStorage.setItem(`previousEmp_${empId}`, JSON.stringify(employee));
          }

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
      } 
      catch (error) {
          console.error("Error loading employee data:", error);
      }
  }
});

// Handle Form Submission 
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

  const newEmployeeData = { name, profileImage, gender, departments, salary, startDate, notes };

  try {
      let response;
      if (empId) {
          // Update Employee in Database
          response = await fetch(`http://localhost:3000/EmpList/${empId}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(newEmployeeData),
          });
      } 
      else {
          // Add New Employee
          response = await fetch("http://localhost:3000/EmpList", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(newEmployeeData),
          });
      }

      if (!response.ok) throw new Error("Failed to save employee data");

      alert(empId ? "Employee updated successfully!" : "Employee added successfully!");
      window.location.href = "/Pages/dashboard.html"; // Redirect back to dashboard
  } 
  catch (error) {
      console.error("Error:", error);
      alert("Error saving employee data.");
  }
});

