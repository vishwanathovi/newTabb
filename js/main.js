// //////////////////////////////////////////////////////////////////
//                          Background                             //
// //////////////////////////////////////////////////////////////////


function createRandomBackground(){
	var randomCount = 0;
	setInterval(()=>{
		randomCount+=1;
		// document.body.style.background = `url(https://source.unsplash.com/random/${1000+(randomCount%5)}x600)`;
		document.body.style.background = `url(../img/image${randomCount%5}.jpeg)`;
		document.body.style.background = `url(../img/image5.jpeg)`;
		document.body.style.backgroundSize = 'cover';
	},6000)
}

createRandomBackground();

// //////////////////////////////////////////////////////////////////
//                          Todo list                              //
// //////////////////////////////////////////////////////////////////

// var itemArray = [{key:"key1",text:"Read 1984",done:false},{key:"key2",text:"Buy fruits",done:false},{key:"key3",text:"Call Kiran",done:true}];

var itemArray = JSON.parse(localStorage.getItem("itemArray")) || [];

var filterValue = "all"; // Global variable to hold the filter value

displayItemsFunction();

document.querySelector(".item-list").addEventListener('click',allFunctionSelector)

function allFunctionSelector(e){

	// Edit function 

	if (e.target.classList.contains("circle-check")){checkItemFunction(e.target)}

	// Delete function

if (e.target.classList.contains("fa-times")){removeItemFunction(e.target)}

}


function displayItemsFunction(){
	document.querySelector(".item-list").innerHTML = "";
	for (item of itemArray){
		if (filterValue=="all"){document.querySelector(".item-list").insertAdjacentHTML('afterbegin', `<div id="${item.key}" class="item"><div class="circle-check"></div><div  class="item-text">${item.text}</div><i class="fas fa-times"></i></div>` )}
		if (filterValue=="active"){ 
				if(item["done"]==false){document.querySelector(".item-list").insertAdjacentHTML('afterbegin', `<div id="${item.key}" class="item"><div class="circle-check"></div><div  class="item-text">${item.text}</div><i class="fas fa-times"></i></div>` )}
		}
		if (filterValue=="completed"){ 
			if(item["done"]==true){document.querySelector(".item-list").insertAdjacentHTML('afterbegin', `<div id="${item.key}" class="item"><div class="circle-check"></div><div  class="item-text">${item.text}</div><i class="fas fa-times"></i></div>` )}
		}
}

	for (item of itemArray){
		if (item["done"]==true){document.querySelector(`#${item["key"]}`).classList.add("strike-out")}
	}

	updateCount();

	hideClearAndColordown();

	console.table(itemArray)
}

document.getElementById("item-submit").addEventListener('click',addItemFunction); // Adding item add listener


function addItemFunction(){

	if (document.getElementById("item-input").value==""){return;}

	var currentItem = document.getElementById("item-input").value;
	document.getElementById("item-input").value = "";
	var timeKey = "key" + getTimeKey()
	var currentItemObj = { key:timeKey, text:currentItem,done:false }
	itemArray.push(currentItemObj)
	displayItemsFunction();
	localStorage.itemArray = JSON.stringify(itemArray)
}

// Remove items function

function removeItemFunction(element){
	// alert("Good Click!")

	var currentItem = element.parentNode;
	var itemList = element.parentNode.parentNode;

	var key = currentItem.getAttribute("id")

	itemArray = itemArray.filter((item) => item["key"]!=key);

	displayItemsFunction();

	localStorage.itemArray = JSON.stringify(itemArray)

}

// Strike out items function


function checkItemFunction(element){
	// alert("Good Click!")

	var currentItem = element.parentNode;

	for (item of itemArray){
		if (item["key"]==currentItem.getAttribute("id") && item["done"]==true ){item.done = false;}
		else if (item["key"]==currentItem.getAttribute("id")){item.done = true; }
		// console.log(item["key"])
	}

	displayItemsFunction();

	// currentItem.classList.toggle("strike-out")
	localStorage.itemArray = JSON.stringify(itemArray)

}


// Function to assign the filter value

document.querySelector(".filter-btns").addEventListener('click',filterUpdate)

function filterUpdate(e){

	// Remove current-btn class from old btn

	document.querySelector("#"+filterValue+"-btn").classList.toggle("current-btn")

	// Get the filter value

	filterValue = e.target.id.split("-")[0];

	// Add current-btn class to the new btn
	
	document.querySelector("#"+filterValue+"-btn").classList.toggle("current-btn")

	displayItemsFunction();
}

function updateCount(){
	var countLeft = itemArray.reduce( (acc,ele)=>{ if (ele.done==false){acc+=1}; return acc } ,0 )
	// console.log(countLeft)	

	document.querySelector("#left-count").innerHTML = `${countLeft} items left`

}

document.querySelector("#clear-completed").addEventListener('click',clearCompleted)

function clearCompleted(){
	itemArray = itemArray.filter(item=>item["done"]==false);

	displayItemsFunction();
		localStorage.itemArray = JSON.stringify(itemArray)

}

document.querySelector("#check-all").addEventListener('click',checkAllItems)

function checkAllItems(){

	var allDoneFlag = itemArray.every(item=>item.done==true)

	if (allDoneFlag==true){

		for (item of itemArray){
			item.done = false;
		}

		document.querySelector("#check-all").classList.remove("active-down")

	} else {

		for (item of itemArray){
			item.done = true;
		}

		document.querySelector("#check-all").classList.add("active-down")
	}


	displayItemsFunction();
		localStorage.itemArray = JSON.stringify(itemArray)

}


function  hideClearAndColordown(){
	if (itemArray.every(item=>item.done==true)){
		document.querySelector("#check-all").classList.add("active-down")
	} else {
		document.querySelector("#check-all").classList.remove("active-down")
	}
	if (itemArray.every(item=>item.done==false)){
		document.querySelector("#clear-completed").style.opacity = "0";
	} else {
		document.querySelector("#clear-completed").style.opacity = "1";
	}

}


function getTimeKey(){
	var date = new Date;
	return date.getTime();
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

		let randomQuote = quoteRandom() ;
		quote.innerHTML =  randomQuote.quote;
		author.innerHTML =  `- ${randomQuote.author}`;
}

//time interval for random quotes
setInterval(function () {
		display_quotes();
	},10000);

// function to display time and date

function dateTime () {
    let dateObj = new Date;
    time.innerHTML = `${correntTimeFormat(dateObj.getHours())}:${correntTimeFormat(dateObj.getMinutes())}:${correntTimeFormat(dateObj.getSeconds())}`;
    date.innerHTML = ` ${dateObj.getDate()}rd ${monthNames[dateObj.getMonth()]}, ${dateObj.getFullYear()}`;
}

//time interval for time
setInterval(function() { 
	dateTime();
}, 1000);


function correntTimeFormat(i) {
  i < 10? i ="0" + i: i;
  return i;	  
}


