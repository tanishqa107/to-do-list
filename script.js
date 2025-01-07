// Select Elements
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

// Add Task Function
function addTask() {
    const taskValue = taskInput.value.trim();
    if (taskValue === "") {
        alert("Please enter a task!");
        return;
    }

    // Create List Item
    const li = document.createElement("li");
    li.innerHTML = `
        <span>${taskValue}</span>
        <button class="edit-btn" onclick="editTask(this)">Edit</button>
        <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
    `;

    // Append the Task to the List
    taskList.appendChild(li);

    // Clear the Input Field
    taskInput.value = "";
}


// Delete Task Function
function deleteTask(button) {
    const li = button.parentElement;
    taskList.removeChild(li);
}

// Edit Task Function
function editTask(button) {
    const li = button.parentElement;

    // Check if already editing
    if (li.classList.contains("editing")) {
        // Save the edited value
        const input = li.querySelector("input");
        const newValue = input.value.trim();

        if (newValue === "") {
            alert("Task cannot be empty!");
            return;
        }

        li.innerHTML = `
            <span>${newValue}</span>
            <button class="edit-btn" onclick="editTask(this)">Edit</button>
            <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
        `;
        li.classList.remove("editing");
    } else {
        // Enter editing mode
        const taskValue = li.querySelector("span").innerText;
        li.innerHTML = `
            <input type="text" value="${taskValue}">
            <button class="save-btn" onclick="editTask(this)">Save</button>
            <button class="cancel-btn" onclick="cancelEdit(this)">Cancel</button>
        `;
        li.classList.add("editing");
    }
}

// Cancel Edit Function
function cancelEdit(button) {
    const li = button.parentElement;
    const originalValue = li.querySelector("input").defaultValue;

    li.innerHTML = `
        <span>${originalValue}</span>
        <button class="edit-btn" onclick="editTask(this)">Edit</button>
        <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
    `;
    li.classList.remove("editing");
}

// Add Task on Button Click
addTaskBtn.addEventListener("click", addTask);

// Add Task on Enter Key
taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});
