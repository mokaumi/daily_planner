const planner = document.getElementById("planner");
const hours = [...Array(9)].map((_, i) => i + 9); // 9AM to 5PM

function getCurrentHour() {
  return new Date().getHours();
}

function saveTask(hour, task) {
  localStorage.setItem(`hour-${hour}`, task);
}

function loadTask(hour) {
  return localStorage.getItem(`hour-${hour}`) || "";
}

function createPlanner() {
  const currentHour = getCurrentHour();

  hours.forEach(hour => {
    const row = document.createElement("div");
    row.className = "time-block";

    const hourLabel = document.createElement("div");
    hourLabel.className = "hour";
    hourLabel.textContent = `${hour}:00`;

    const textarea = document.createElement("textarea");
    textarea.value = loadTask(hour);

    if (hour < currentHour) textarea.classList.add("past");
    else if (hour === currentHour) textarea.classList.add("present");
    else textarea.classList.add("future");

    const button = document.createElement("button");
    button.className = "saveBtn";
    button.textContent = "💾";
    button.onclick = () => saveTask(hour, textarea.value);

    row.append(hourLabel, textarea, button);
    planner.appendChild(row);
  });
}

createPlanner();
