// //////////////////////////////////////////////////////////////////
//                          Background                             //
// //////////////////////////////////////////////////////////////////


function createRandomBackground() {
  var randomCount = 0;
  setInterval(() => {
    randomCount += 1;
    // document.body.style.background = `url(https://source.unsplash.com/random/${1000+(randomCount%5)}x600)`;
    document.body.style.background = `url(../img/image${randomCount%5}.jpeg)`;
    document.body.style.background = `url(img/image5.jpeg)`;
    document.body.style.backgroundSize = 'cover';
  }, 6000);
}

createRandomBackground();

// //////////////////////////////////////////////////////////////////
//                          Todo list                              //
// //////////////////////////////////////////////////////////////////

var itemArray = [{
  key: "key15439037465860",
  text: "Today task",
  done: false,
  createdDate: "2018-12-04",
  priority: 3
}, {
  key: "key15439037465868",
  text: "Elequent JS",
  done: false,
  createdDate: "2018-11-30",
  priority: 3
}]

var expiredArray = [{
  key: "key15439037465861",
  text: "Yesterday Task",
  done: true,
  createdDate: "2018-12-03",
  priority: 3
}, {
  key: "key15439037465862",
  text: "2nd Dec Task",
  done: false,
  createdDate: "2018-12-02",
  priority: 3
}, {
  key: "key15439037465863",
  text: "Yesterday Task 2",
  done: true,
  createdDate: "2018-12-03",
  priority: 3
}, {
  key: "key15439037465864",
  text: "2nd Dec Task 2",
  done: true,
  createdDate: "2018-12-02",
  priority: 3
}, {
  key: "key15439037465865",
  text: "Yesterday Task 3",
  done: true,
  createdDate: "2018-12-03",
  priority: 3
}, {
  key: "key15439037465866",
  text: "2nd Dec Task 3",
  done: false,
  createdDate: "2018-12-02",
  priority: 3
}, {
  key: "key15439037465867",
  text: "Yesterday Task 4",
  done: false,
  createdDate: "2018-12-03",
  priority: 3
}, {
  key: "key15439037465868",
  text: "2nd Dec Task 4",
  done: true,
  createdDate: "2018-12-02",
  priority: 3
}, {
  key: "key15439037465868",
  text: "Hello World!",
  done: true,
  createdDate: "2018-12-01",
  priority: 3
}, {
  key: "key15439037465868",
  text: "JS is Good",
  done: false,
  createdDate: "2018-12-01",
  priority: 3
}];

// var itemArray = JSON.parse(localStorage.getItem("itemArray")) || [];
var filterValue = "all"; // Global variable to hold the filter value


// Initial update of display and list 
// displayItemsFunction();
// updateExpiry();
// console.log(itemArray,"after updateExpiry")
displayItemsFunction();


function editOrRemove(e) {
  if (e.target.classList.contains("circle-check")) {
    checkItemFunction(e.target);
  }
  if (e.target.classList.contains("fa-times")) {
    removeItemFunction(e.target);
  }
  if (e.target.parentNode.classList.contains("priority")) {
    prioritySelect(e.target);
  }
}


function displayItemsFunction() {
  document.querySelector(".item-list").innerHTML = "";

  for (item of itemArray) {
    var htmlContent = `
        <div id="${item.key}" draggable="true" class="item ${item["done"]==true? "strike-out":""}">
          <div class="circle-check"></div>
          <div  class="item-text">${item.text}</div>
          <div class="priority">
            <i class="fas fa-times-circle"></i>
            <div class="priority-child ${item.priority==1? "present":""} p1" data-id=1>P1</div>
            <div class="priority-child ${item.priority==2? "present":""} p2" data-id=2 >P2</div>
            <div class="priority-child ${item.priority==3? "present":""}  p3" data-id=3>P3</div>
            <div class="priority-child ${item.priority==4? "present":""} p4" data-id=4>P4</div>
            <div class="priority-child ${item.priority==5? "present":""} p5" data-id=5>P5</div>
          </div>
          <i class="fas fa-times"></i>
        </div>`;
    switch (filterValue) {
      case "all":
        document.querySelector(".item-list").insertAdjacentHTML('afterbegin', htmlContent)
        break;
      case "active":
        if (item["done"] == false) {
          document.querySelector(".item-list").insertAdjacentHTML('afterbegin', htmlContent)
        }
        break;
      case "completed":
        if (item["done"] == true) {
          document.querySelector(".item-list").insertAdjacentHTML('afterbegin', htmlContent)
        }
        break;
    }
  }

  updateCount();
  hideClearAndColordown();
  console.table(itemArray)

  document.getElementById("item-input").disabled = false;
  document.querySelector(".item-list").addEventListener('click', editOrRemove)
  document.getElementById("item-submit").addEventListener('click', addItemFunction);
  document.querySelector(".filter-btns").addEventListener('click', filterUpdate);
  document.querySelector("#clear-completed").addEventListener('click', clearCompleted);
  document.querySelector("#check-all").addEventListener('click', checkAllItems);
  document.querySelector(".bottom-section").style.display = "grid";
}


function displayExpired() {
  document.querySelector(".item-list").innerHTML = "";
  for (var dateNum of Last7Days()) {
    if (expiredArray.every((item) => item.createdDate != dateNum)) continue;

    var completionRate = ((expiredArray.reduce((acc, cur) => {
        if (cur.createdDate == dateNum && cur.done) {
          acc = acc + 1
        }
        return acc;
      }, 0)) /
      (expiredArray.reduce((acc, cur) => {
        if (cur.createdDate == dateNum) {
          acc = acc + 1
        }
        return acc;
      }, 0))) * 100;

    console.log(completionRate)
    var htmlContent = `<div class="expire-date-header" ><div class="expire-date">${dateNum}</div><div class="completion-rate">Completion:${completionRate}%</div></div>`;
    for (item of expiredArray) {
      if (item.createdDate == dateNum) {
        htmlContent += `<div id="${item.key}" class="item ${item["done"]==true? "strike-out":""}">
                              <div class="circle-check"></div>
                              <div  class="item-text">${item.text}</div>
                              
                          </div>`;

      }
    }
    document.querySelector(".item-list").insertAdjacentHTML('afterbegin', htmlContent);
    htmlContent = "";
  }

  document.getElementById("item-input").disabled = true;
  document.querySelector(".item-list").removeEventListener('click', editOrRemove);
  document.getElementById("item-submit").removeEventListener('click', addItemFunction);
  document.querySelector(".filter-btns").removeEventListener('click', filterUpdate)
  document.querySelector("#clear-completed").removeEventListener('click', clearCompleted)
  document.querySelector("#check-all").removeEventListener('click', checkAllItems)
  document.querySelector(".bottom-section").style.display = "none";

}



function addItemFunction() {
  var currentItem = document.getElementById("item-input").value;
  var timeKey = "key" + getTimeKey();
  var createdDate = new Date;
  var currentItemObj = {
    key: timeKey,
    text: currentItem,
    done: false,
    createdDate: (createdDate),
    priority: 3
  };

  if (document.getElementById("item-input").value == "") {
    return;
  }
  itemArray.push(currentItemObj);
  document.getElementById("item-input").value = "";
  localStorage.itemArray = JSON.stringify(itemArray);
  displayItemsFunction();
}

function removeItemFunction(element) {
  var key = element.parentNode.id;
  itemArray = itemArray.filter((item) => item["key"] != key);
  localStorage.itemArray = JSON.stringify(itemArray);
  displayItemsFunction();
}

function checkItemFunction(element) {
  var currentItem = element.parentNode;

  for (item of itemArray) {
    if (item["key"] == currentItem.getAttribute("id") && item["done"] == true) {
      item.done = false;
    } else if (item["key"] == currentItem.getAttribute("id")) {
      item.done = true;
    }
  }

  localStorage.itemArray = JSON.stringify(itemArray)
  displayItemsFunction();
}


function filterUpdate(e) {
  document.querySelector("#" + filterValue + "-btn").classList.toggle("current-btn") // removing current element current-btn class
  filterValue = e.target.id.split("-")[0];
  document.querySelector("#" + filterValue + "-btn").classList.toggle("current-btn")
  displayItemsFunction();
}


function updateCount() {
  var countLeft = itemArray.reduce((acc, ele) => {
    if (ele.done == false) {
      acc += 1
    };
    return acc
  }, 0)
  document.querySelector("#left-count").innerHTML = `${countLeft} items left`
}


function clearCompleted() {
  itemArray = itemArray.filter(item => item["done"] == false);

  localStorage.itemArray = JSON.stringify(itemArray);
  displayItemsFunction();

}


function checkAllItems() {
  var allDoneFlag = itemArray.every(item => item.done == true)

  if (allDoneFlag == true) {
    for (item of itemArray) {
      item.done = false;
    }
    document.querySelector("#check-all").classList.remove("active-down")
  } else {
    for (item of itemArray) {
      item.done = true;
    }
    document.querySelector("#check-all").classList.add("active-down")
  }

  localStorage.itemArray = JSON.stringify(itemArray)
  displayItemsFunction();
}


function hideClearAndColordown() {
  if (itemArray.every(item => item.done == true)) {
    document.querySelector("#check-all").classList.add("active-down")
  } else {
    document.querySelector("#check-all").classList.remove("active-down")
  }
  if (itemArray.every(item => item.done == false)) {
    document.querySelector("#clear-completed").style.opacity = "0";
  } else {
    document.querySelector("#clear-completed").style.opacity = "1";
  }
}


function updateExpireFlag(e) {
  document.querySelector(".selected").classList.remove("selected");
  e.target.classList.add("selected");
  (e.target.id == "today-list") ? displayItemsFunction(): displayExpired();
}


function updateExpiry() {
  let tempDate = new Date;
  var tempArray = [];
  for (item of itemArray) {
    if (item.createdDate != getFullDate(tempDate)) {
      expiredArray.concat(itemArray.filter((ele) => {
        return ele.createdDate != getFullDate(tempDate)
      })[0])
      console.log(itemArray.filter((ele) => {
        return ele.createdDate != getFullDate(tempDate)
      }))
      tempArray.push(itemArray.filter((ele) => {
        return ele.createdDate == getFullDate(tempDate)
      })[0])
    }
  }
  console.log(tempArray)
  localStorage.itemArray = JSON.stringify(itemArray)

}


function prioritySelect(e) {
  e.parentNode.classList.toggle("active-priority");
  if (!e.parentNode.classList.contains("active-priority")) {
    e.parentNode.querySelector(".present").classList.remove("present")
    e.classList.add("present")
    var itemKey = e.parentNode.parentNode.id;
    for (item of itemArray) {
      if (itemKey == item.key) {
        item.priority = Number(e.dataset.id)
      }
    }
  }
}


function getTimeKey() {
  var date = new Date;
  return date.getTime();
}

function getFullDate(dateObj) {
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();

  return year + "-" + correctTimeFormat(month) + "-" + correctTimeFormat(day);
}


function Last7Days() {
  var result = [];
  for (var i = 1; i <= 7; i++) {
    var d = new Date();
    d.setDate(d.getDate() - i);
    result.push(getFullDate(d))
  }

  return (result.reverse());
}

// Event listeners

document.querySelector(".item-list").addEventListener('click', editOrRemove)
document.getElementById("item-submit").addEventListener('click', addItemFunction);
document.querySelector(".filter-btns").addEventListener('click', filterUpdate)
document.querySelector("#clear-completed").addEventListener('click', clearCompleted)
document.querySelector("#check-all").addEventListener('click', checkAllItems)
document.querySelector(".expire-section").addEventListener('click', updateExpireFlag)


//  Drag and drop feature

var dragElement = 0;

const containers = document.getElementsByClassName('item-list')
for (const container of containers) {
  container.addEventListener("dragover", dragover)
  container.addEventListener("dragenter", dragenter)
  container.addEventListener("drop", drop)
  container.addEventListener("dragstart", dragstart)
}

function dragover(e) {
  e.preventDefault()
}

function dragenter(e) {
  e.preventDefault()
}

function drop(e) {
  // this.append(box)
  var tempValue = e.target.parentNode;
  if (e.stopPropagation) {
    e.stopPropagation(); // Stops some browsers from redirecting.
  }

  if (!e.target.parentNode.classList.contains('item')) {
    return;
  }

  e.target.parentNode = e.dataTransfer.getData('text/html', );
  dragElement.innerHTML = tempValue.innerHTML;
}

function dragstart(e) {
  dragElement = e.target;
  // e.target.style.opacity = '0.5';
  e.dataTransfer.setData('text/html', e.target.innerHTML);
}









// //////////////////////////////////////////////////////////////////
//                      date and random quote                      //
// //////////////////////////////////////////////////////////////////

let quote = document.getElementById('quotes');
let author = document.getElementById('author');
let time = document.getElementById('time');
let date = document.getElementById('date');

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


display_quotes();
dateTime();

// random quotes
// function to display random quote
function display_quotes() {
  let randomQuote = quoteRandom();
  quote.innerHTML = randomQuote.quote;
  author.innerHTML = `- ${randomQuote.author}`;
}

//time interval for random quotes
setInterval(function() {
  display_quotes();
}, 10000);

// function to display time and date

function dateTime() {
  let dateObj = new Date;
  time.innerHTML = `${correctTimeFormat(dateObj.getHours())}:${correctTimeFormat(dateObj.getMinutes())}:${correctTimeFormat(dateObj.getSeconds())}`;
  date.innerHTML = ` ${dateObj.getDate()}rd ${monthNames[dateObj.getMonth()]}, ${dateObj.getFullYear()}`;
}

//time interval for time
setInterval(function() {
  dateTime();
}, 1000);


function correctTimeFormat(i) {
  i < 10 ? i = "0" + i : i;
  return i;
}


// var ourChromeExtension = (function() {

//   // fn renderExtension

//   var initializeExtension = function() {
//     console.log('we are goin to render our extension now')
//     // renderExtension();
//   }

//   var startGame = function() {
//     console.log('start the game')
//   }

//   return {
//     init: initializeExtension,
//     startGame: startGame
//   }
// })();