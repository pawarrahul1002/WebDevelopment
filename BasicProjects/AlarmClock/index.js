// These lines use document.querySelector to select various HTML elements by their IDs and store them in variables. These variables will be used to manipulate the elements and access their values.
const currentTime = document.querySelector("#current-time");
const setHours = document.querySelector("#hours");
const setMinutes = document.querySelector("#minutes");
const setSeconds = document.querySelector("#seconds");
const setAmPm = document.querySelector("#am-pm");
const setAlarmButton = document.querySelector("#submitButton");
const alarmContainer = document.querySelector("#alarms-container");

// This line adds an event listener to the DOMContentLoaded event. When the DOM (Document Object Model) is fully loaded and parsed, the code inside the event listener will run.
window.addEventListener("DOMContentLoaded", (event) => {
  
  dropDownMenu(1, 12, setHours);
 
  dropDownMenu(0, 59, setMinutes);

  dropDownMenu(0, 59, setSeconds);

  setInterval(getCurrentTime, 1000);
  fetchAlarm();
});
 
// Event Listener added to Set Alarm Button
setAlarmButton.addEventListener("click", getInput);

// This function generates dropdown options for selecting hours, minutes, and seconds. It takes a start value, an end value, and an element (HTML select element) as arguments, and populates the select element with options within the specified range.
function dropDownMenu(start, end, element) {
  for (let i = start; i <= end; i++) {
    const dropDown = document.createElement("option");
    dropDown.value = i < 10 ? "0" + i : i;
    dropDown.innerHTML = i < 10 ? "0" + i : i;
    element.appendChild(dropDown);
  }
}

// This function retrieves the current time using the JavaScript Date object and formats it to a user-friendly string. It updates the currentTime HTML element with the current time and returns the formatted time.
function getCurrentTime() {
  let time = new Date();
  time = time.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });
  currentTime.innerHTML = time;

  return time;
}

// This function is called when the "Set Alarm" button is clicked. It extracts the user-selected values for hours, minutes, seconds, and AM/PM, and then calls the setAlarm function with the provided time.
function getInput(e) {
  e.preventDefault();
  const hourValue = setHours.value;
  const minuteValue = setMinutes.value;
  const secondValue = setSeconds.value;
  const amPmValue = setAmPm.value;

  const alarmTime = convertToTime(
    hourValue,
    minuteValue,
    secondValue,
    amPmValue
  );
  setAlarm(alarmTime);
}

// This function takes the selected hour, minute, second, and AM/PM values and constructs a time string in 12-hour format. It's used for formatting the alarm time.
function convertToTime(hour, minute, second, amPm) {
  return `${parseInt(hour)}:${minute}:${second} ${amPm}`;
}

// This function sets an interval to repeatedly check if the current time matches the specified alarm time. If a match is found, it triggers an alert indicating that the alarm is ringing. The fetching parameter is used to determine whether the alarm is being set from local storage.
function setAlarm(time, fetching = false) {
  const alarm = setInterval(() => {
    if (time === getCurrentTime()) {
      alert("Alarm Ringing");
    }
    console.log("running");
  }, 500);

  addAlaramToDom(time, alarm);
  if (!fetching) {
    saveAlarm(time);
  }
}

// This function creates a DOM element to display an alarm, including its time and a "Delete" button. It also adds an event listener to the "Delete" button to remove the alarm when clicked.
function addAlaramToDom(time, intervalId) {
  const alarm = document.createElement("div");
  alarm.classList.add("alarm", "mb", "d-flex");
  alarm.innerHTML = `
              <div class="time">${time}</div>
              <button class="btn delete-alarm" data-id=${intervalId}>Delete</button>
              `;
  const deleteButton = alarm.querySelector(".delete-alarm");
  deleteButton.addEventListener("click", (e) => deleteAlarm(e, time, intervalId));

  alarmContainer.prepend(alarm);
}

// This function checks whether alarms are saved in the local storage. It retrieves saved alarms from the localStorage and returns them as an array.
function checkAlarams() {
  let alarms = [];
  const isPresent = localStorage.getItem("alarms");
  if (isPresent) alarms = JSON.parse(isPresent);

  return alarms;
}

// This function saves an alarm time to the local storage. It first checks for existing alarms, adds the new alarm, and updates the local storage with the updated list of alarms.
function saveAlarm(time) {
  const alarms = checkAlarams();

  alarms.push(time);
  localStorage.setItem("alarms", JSON.stringify(alarms));
}

// This function retrieves alarms from local storage and sets them by calling the setAlarm function for each saved alarm.
function fetchAlarm() {
  const alarms = checkAlarams();

  alarms.forEach((time) => {
    setAlarm(time, true);
  });
}

// This function is called when a "Delete" button associated with an alarm is clicked. It clears the interval associated with the alarm and removes the alarm from the DOM.
function deleteAlarm(event, time, intervalId) {
  const self = event.target;

  clearInterval(intervalId);

  const alarm = self.parentElement;
  console.log(time);

  deleteAlarmFromLocal(time);
  alarm.remove();
}

// This function removes an alarm time from local storage by searching for the alarm time in the saved alarms and then updating the local storage with the modified list.
function deleteAlarmFromLocal(time) {
  const alarms = checkAlarams();

  const index = alarms.indexOf(time);
  alarms.splice(index, 1);
  localStorage.setItem("alarms", JSON.stringify(alarms));
}