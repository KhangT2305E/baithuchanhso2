var studentArray = [];

var btn = document.getElementById("btn");

btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (confirm("Bạn có chắc chắn muốn thêm học sinh này?")) {
        addStudent(e);
    } else {
        alert("Hủy thêm học sinh");
        e.stopImmediatePropagation();
    }
});

function addStudent(event) {
    event.preventDefault();

    var name = document.getElementById("name").value;
    var dob = document.getElementById("date").value;
    var gender = document.querySelector('input[name="gender"]:checked').value;

    var languageInputs = document.querySelectorAll(
        'input[type="checkbox"]:checked'
    );
    var languages = Array.from(languageInputs).map((input) => input.value);

    var selectedClass = document.getElementById("class").value;

    var newStudent = {
        name,
        dob,
        gender,
        languages,
        selectedClass,
    };

    studentArray.push(newStudent);
    renderTable();
}

function renderTable() {
    var tableBody = document.querySelector("#studentTable tbody");
    tableBody.innerHTML = "";

    studentArray.forEach((student, index) => {
        var newRow = tableBody.insertRow();
        newRow.innerHTML = `
      <td>${student.name}</td>
      <td>${student.dob}</td>
      <td>${student.gender}</td>
      <td>${student.languages.join(", ")}</td>
      <td>${student.selectedClass}</td>
      <td><button class="delete-btn" data-index="${index}">Delete</button></td>
    `;
    });

    var deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach((button) => {
        button.classList.add("custom-button");
        button.style.backgroundColor = "transparent";
        button.style.color = "#fff";
        button.style.padding = "8px 16px";
        button.addEventListener("mouseover", () => {
            button.style.backgroundColor = "red";
        });

        button.addEventListener("mouseout", () => {
            button.style.backgroundColor = "transparent";
        });
        button.addEventListener("click", handleDelete);
    });
}

function handleDelete(event) {
    var index = event.target.dataset.index;
    studentArray.splice(index, 1);
    renderTable();
}
