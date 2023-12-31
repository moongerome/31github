var myTable = document.getElementById("myTable");

function insertUser() {
  myTable.innerHTML = tableHeaders;
  var peopleToDisplay = [];
  for (var person of results) {
    var name = person.name.first + "" + person.name.last;
    var lowerCaseName = name.toLowerCase();
    if (lowerCaseName.includes(searchTerm)) {
      peopleToDisplay.push(person);
    }
  }

  peopleToDisplay = peopleToDisplay.slice(0, numbersToDisplay);
  for (var person of peopleToDisplay) {
    var tableRow = `
    <tr>
    <td>${person.name.first}</td>
    <td>${person.name.last}</td>
    <td>${person.gender}</td>
    <td>${person.location.city}</td>
    <td>${person.location.country}</td>
    <td>${person.phone}</td>
  </tr>
    `;
    myTable.innerHTML += tableRow;
  }
}

getUsers();
function getUsers() {
  fetch("https://randomuser.me/api/?results=100")
    .then((results) => {
      return results.json();
    })
    .then((data) => {
      console.log(data);
      results = data.results;
      insertUser();
    });
}
var tableHeaders = `   <tr>
<th>First name</th>
<th>Last name</th>
<th>Gender</th>
<th>City</th>
<th>Country</th>
<th>Phone number</th>
</tr>`;
var results = null;
var searchBar = document.getElementById("searchBar");
var dropDown = document.getElementById("dropDown");
var numbersToDisplay = 10;
var searchTerm = "";

dropDown.addEventListener("change", function (event) {
  console.log(event.target.value);
  numbersToDisplay = Number(event.target.value);
  insertUser();
});

searchBar.addEventListener("keyup", function (event) {
  searchTerm = event.target.value.toLowerCase();
  console.log(searchTerm);
  insertUser();
});

var tableRows = document.querySelectorAll("#myTable tr");

tableRows.forEach(function (row, index) {
  setTimeout(function () {
    row.classList.add("animate");
  }, index * 100);
});
