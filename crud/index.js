function toggleDropdown() {
  const dropdown = document.getElementById("dropdown-options");
  dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
}
const name = document.getElementById("name");
const address = document.getElementById("address");
const gender = document.getElementById("gender");
const age = document.getElementById("age");
const tableBody = document.querySelector("#userTable tbody");
let formDataArray = JSON.parse(localStorage.getItem("formData")) || [];

function validation() {
  const interests = Array.from(
    document.querySelectorAll('input[name="interest"]:checked')
  );
  if (name.value.trim() === "") {
    return "please add name";
  } else if (address.value.trim() === "") {
    return "please add address";
  } else if (gender.value.trim() === "") {
    return "Please select gender";
  } else if (age.value <= 0 || age.value > 80 || age.value.trim() === "") {
    return "age should be in between 1 and 80";
  } else if (interests.length === 0) {
    return "please select at least one field of interest";
  }
  return null;
}

function saveToLocalStorage() {
  localStorage.setItem("formData", JSON.stringify(formDataArray));
}
saveToLocalStorage();
renderTable();
function renderTable() {
  tableBody.innerHTML = "";
  formDataArray.forEach((data, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${data.name}</td>
        <td>${data.address}</td>
        <td>${data.gender}</td>
        <td>${data.age}</td>
        <td>${data.interests.join("")}</td>
        <td>
        <button onclick='editData(${index})'>Edit</button>
        <button onclick='deleteData(${index})'>Delete</button>
        </td>
        ;`;
    tableBody.appendChild(row);
  });
}
let editIndex = -1;
function handleFormSubmit(e) {
  e.preventDefault();
  let errorMessage = validation();
  if (errorMessage) {
    alert(errorMessage);
    return;
  }
  let formData = {
    name: name.value.trim(),
    address: address.value.trim(),
    gender: gender.value,
    age: age.value,
    interests: Array.from(
      document.querySelectorAll('input[name="interest"]:checked')
    ).map((el) => el.value),
  };
  if (editIndex === -1) {
    formDataArray.push(formData);
  } else {
    formDataArray[editIndex] = formData;
    editIndex = -1;
    document.getElementById("submitBtn").innerText = "submit";
  }
  saveToLocalStorage();
  renderTable();
  name.value = "";
  address.value = "";
  gender.value = "";
  age.value = "";
  document
    .querySelectorAll('input[name="interest"]:checked')
    .forEach((el) => (el.checked = false));
}

function deleteData(index) {
  alert("Are you sure you want to delete?");
  formDataArray.splice(index, 1);
  saveToLocalStorage();
  renderTable();
}

function editData(index) {
  const data = formDataArray[index];
  name.value = data.name;
  address.value = data.address;
  age.value = data.age;

  document.getElementById("gender").value = data.gender;

  document.querySelectorAll('input[name="interest"]').forEach((input) => {
    input.checked = data.interests.includes(input.value);
  });

  editIndex = index;
  document.getElementById("submitBtn").innerText = "Update";
}

document
  .getElementById("submitBtn")
  .addEventListener("click", handleFormSubmit);
