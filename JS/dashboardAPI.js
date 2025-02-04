// $(document).ready(function () {
//   // Fetch employees from API and populate table
//   function fetchEmployees() {
//     $.ajax({
//       url: "http://localhost:3000/EmpList",
//       method: "GET",
//       dataType: "json",
//       success: function (employees) {
//         const tableBody = $(".emp-dash-table tbody");
//         tableBody.empty(); // Clear previous entries

//         employees.forEach((employee) => {
//           const row = `
//             <tr>
//               <td class="emp-dash-name">
//                 <div class="emp-dash-avatar-container">
//                   <img class="emp-dash-avatar" src="${employee.profileImage}" alt="Avatar">
//                 </div>
//                 <div class="emp-dash-name-text">${employee.name}</div>
//               </td>
//               <td><div class="emp-dash-gender">${employee.gender}</div></td>
//               <td>
//                 <div class="emp-dash-department">
//                   ${employee.departments.map((dept) => `<span class="emp-dash-tag">${dept}</span>`).join("")}
//                 </div>
//               </td>
//               <td><div class="emp-dash-salary">₹ ${employee.salary}</div></td>
//               <td><div class="emp-dash-start-date">${employee.startDate}</div></td>
//               <td>
//                 <div class="emp-dash-actions">
//                   <i class="delete" data-id="${employee.id}">🗑️</i>
//                   <i class="edit">✏️</i>
//                 </div>
//               </td>
//             </tr>
//           `;

//           tableBody.append(row);
//         });
//       },
//       error: function (error) {
//         console.error("Error fetching employees:", error);
//       },
//     });
//   }

//   // Function to delete an employee
//   function deleteEmployee(id) {
//     $.ajax({
//       url: `http://localhost:3000/EmpList/${id}`,
//       method: "DELETE",
//       success: function () {
//         alert("Employee deleted successfully!");
//         fetchEmployees(); // Refresh the table
//       },
//       error: function (error) {
//         console.error("Error deleting employee:", error);
//       },
//     });
//   }

//   // Attach delete event listener using event delegation
//   $(document).on("click", ".delete", function () {
//     const empId = $(this).data("id");
//     deleteEmployee(empId);
//   });

//   // Load employees when the page loads
//   fetchEmployees();
// });



//     const searchInput = document.getElementById('searchInput');
//     const employeeTableBody = document.getElementById('employeeTableBody');

//     searchInput.addEventListener('input', function () {
//         const searchValue = searchInput.value.toLowerCase();
//         const rows = employeeTableBody.querySelectorAll('tr');

//         rows.forEach(row => {
//             const nameCell = row.querySelector('td:first-child');
//             if (nameCell) {
//                 const nameText = nameCell.textContent.toLowerCase();
//                 row.style.display = nameText.includes(searchValue) ? '' : 'none';
//             }
//         });
//     });


// // edit
// $(document).on("click", ".edit", function () {
//   const empId = $(this).data("id");
//   window.location.href = `/Pages/form.html?id=${empId}`; // Redirect with employee ID
// });

// // Load employees on page load
// fetchEmployees();
// });


$(document).ready(function () {
  // Fetch employees from API and populate table
  function fetchEmployees() {
    $.ajax({
      url: "http://localhost:3000/EmpList",
      method: "GET",
      dataType: "json",
      success: function (employees) {
        const tableBody = $(".emp-dash-table tbody");
        tableBody.empty(); // Clear previous entries

        employees.forEach((employee) => {
          const row = `
            <tr>
              <td class="emp-dash-name">
                <div class="emp-dash-avatar-container">
                  <img class="emp-dash-avatar" src="${employee.profileImage}" alt="Avatar">
                </div>
                <div class="emp-dash-name-text">${employee.name}</div>
              </td>
              <td><div class="emp-dash-gender">${employee.gender}</div></td>
              <td>
                <div class="emp-dash-department">
                  ${employee.departments.map((dept) => `<span class="emp-dash-tag">${dept}</span>`).join("")}
                </div>
              </td>
              <td><div class="emp-dash-salary">₹ ${employee.salary}</div></td>
              <td><div class="emp-dash-start-date">${employee.startDate}</div></td>
              <td>
                <div class="emp-dash-actions">
                  <i class="delete" data-id="${employee.id}">🗑️</i>
                  <i class="edit" data-id="${employee.id}">✏️</i> <!-- Added data-id -->
                </div>
              </td>
            </tr>
          `;

          tableBody.append(row);
        });
      },
      error: function (error) {
        console.error("Error fetching employees:", error);
      },
    });
  }

  // Function to delete an employee
  function deleteEmployee(id) {
    $.ajax({
      url: `http://localhost:3000/EmpList/${id}`,
      method: "DELETE",
      success: function () {
        alert("Employee deleted successfully!");
        fetchEmployees(); // Refresh the table
      },
      error: function (error) {
        console.error("Error deleting employee:", error);
      },
    });
  }

  // Attach delete event listener using event delegation
  $(document).on("click", ".delete", function () {
    const empId = $(this).data("id");
    deleteEmployee(empId);
  });

  // Attach edit event listener
  $(document).on("click", ".edit", function () {
    const empId = $(this).data("id"); // Get employee ID
    if (empId) {
      window.location.href = `/Pages/form.html?id=${empId}`; // Redirect with employee ID
    } else {
      console.error("Error: Employee ID not found for editing.");
    }
  });

  // Search functionality
  const searchInput = document.getElementById('searchInput');
  const employeeTableBody = document.getElementById('employeeTableBody');

  searchInput.addEventListener('input', function () {
    const searchValue = searchInput.value.toLowerCase();
    const rows = employeeTableBody.querySelectorAll('tr');

    rows.forEach(row => {
      const nameCell = row.querySelector('td:first-child');
      if (nameCell) {
        const nameText = nameCell.textContent.toLowerCase();
        row.style.display = nameText.includes(searchValue) ? '' : 'none';
      }
    });
  });

  fetchEmployees();
});
