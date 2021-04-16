var eventArray = [{
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 240000,
        date: "06/01/2017",
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 250000,
        date: "06/01/2018",
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 257000,
        date: "06/01/2019",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 130000,
        date: "06/01/2017",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 140000,
        date: "06/01/2018",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 150000,
        date: "06/01/2019",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 40000,
        date: "06/01/2017",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 45000,
        date: "06/01/2018",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 50000,
        date: "06/01/2019",
    },
];

//default dislpay is all events
var filteredEvents = eventArray;

function buildDropDown() {
    var eventDD = document.getElementById("eventDropDown");

    let distinctEvents = [...new Set(eventArray.map((event) => event.city))];

    let linkHTMLEnd = '<div class="dropdown-divider"></div><a class="dropdown-item" onclick="getEvents(this)" data-string="All" >All</a>';
    let resultsHTML = "";

    for (let i = 0; i < distinctEvents.length; i++) {
        resultsHTML += `<a class="dropdown-item" onclick="getEvents(this)" data-string="${distinctEvents[i]}">${distinctEvents[i]}</a>`;


    }

    resultsHTML += linkHTMLEnd;
    eventDD.innerHTML = resultsHTML;
    displayData();
    displayStats();
}

function displayStats() {
    let total = 0;
    let average = 0;
    let most = 0;
    let least = -1;
    let currentAttendance = 0;

    for (let i = 0; i < filteredEvents.length; i++) {
        currentAttendance = filteredEvents[i].attendance;
        total += currentAttendance;

        if (most < currentAttendance) {
            most = currentAttendance;
        }
        if (least > currentAttendance || least < 0) {
            least = currentAttendance;
        }
    }
    average = total / filteredEvents.length
    document.getElementById("total").innerHTML = total.toLocaleString();
    document.getElementById("most").innerHTML = most.toLocaleString();
    document.getElementById("least").innerHTML = least.toLocaleString();
    document.getElementById("average").innerHTML = average.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

}

// function getEvents() {
//     let eventBook = JSON.parse(localStorage.getItem("eventArray")) || [];

//     if (eventBook.length == 0) {
//         eventBook = eventArray;
//         localStorage.setItem("eventArray", JSON.stringify(eventBook));
//     }
//     return eventBook;
// }

function getEvents(element) {
    let city = element.getAttribute("data-string");
    let curEvents = JSON.parse(localStorage.getItem("eventsArray")) || eventArray;
    filteredEvents = curEvents;
    document.getElementById("statsHeader").innerHTML = `Stats for ${city} Events`;
    if (city != `All`) {
        filteredEvents = curEvents.filter(function (event) {
            if (event.city == city) {
                return event;
            }
        });
    }
    displayStats();
}

function saveEventData() {
    //grabs the events out of local storage
    let eventBook = JSON.parse(localStorage.getItem("eventsArray")) || eventArray;
    let isEmpty = false;

    let obj = {};
    if (document.getElementById("newEventName").value != "") {
        obj["event"] = document.getElementById("newEventName").value;
    }
    if (document.getElementById("newEventCity").value != "") {
        obj["city"] = document.getElementById("newEventCity").value;
    }
    if (document.getElementById("newEventState").value != "") {
        obj["state"] = document.getElementById("newEventState").value;
    }
    if (document.getElementById("newEventAttendance").value != "") {
        obj["attendance"] = parseInt(document.getElementById("newEventAttendance").value, 10);
    }
    let eventDate = document.getElementById("newEventDate").value;
    let eventDate2 = `${eventDate} 00:00`;
    if (eventDate != "") {
        obj["date"] = new Date(eventDate2).toLocaleDateString();
    } else {
        isEmpty = true;
    }

    if (isEmpty == false) {
        eventBook.push(obj);

        localStorage.setItem("eventsArray", JSON.stringify(eventBook));

        //Access the values from the form by ID and add an object to the array.
        displayData();
    } else {
        swal({
            title: "Hold On",
            text: "One of the fields is empty.",
            icon: "warning",
            button: "close",
        })
    }
}

function displayData() {
    const template = document.getElementById("eventData-Template");
    const eventBody = document.getElementById("eventBody");
    //clear table first
    eventBody.innerHTML = "";
    //grab the events from local storage
    let curEvents = JSON.parse(localStorage.getItem("eventsArray")) || [];

    if (curEvents.length == 0) {
        curEvents = eventArray;
        localStorage.setItem("eventsArray", JSON.stringify(curEvents));
    }
    for (var i = 0; i < curEvents.length; i++) {
        const eventRow = document.importNode(template.content, true);

        eventRow.getElementById("event").textContent = curEvents[i].event;
        eventRow.getElementById("city").textContent = curEvents[i].city;
        eventRow.getElementById("state").textContent = curEvents[i].state;
        eventRow.getElementById("attendance").textContent = curEvents[i].attendance;
        eventRow.getElementById("eventDate").textContent = new Date(
            curEvents[i].date
        ).toLocaleDateString();

        eventBody.appendChild(eventRow);
    }
}