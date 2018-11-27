// Initializing an empty array for tasks

var itemArray = [{key:"key1",text:"Read 1984",done:false},{key:"key2",text:"Buy fruits",done:false},{key:"key3",text:"Call Kiran",done:true}];


// Global variable to hold the filter value

var filterValue = "all";

// Adding item add listener

document.getElementById("item-submit").addEventListener('click',addItemFunction);

displayItemsFunction();

document.querySelector(".item-list").addEventListener('click',allFunctionSelector)

function allFunctionSelector(e){

	// Edit function 

	if (e.target.classList.contains("circle-check")){checkItemFunction(e.target)}

	// Delete function

if (e.target.classList.contains("fa-times")){removeItemFunction(e.target)}

}


// Displaying the current items in the list

function displayItemsFunction(){

	document.querySelector(".item-list").innerHTML = "";

	// Displaying all the elements

	for (item of itemArray){
		if (filterValue=="all"){document.querySelector(".item-list").insertAdjacentHTML('afterbegin', `<div id="${item.key}" class="item"><div class="circle-check"></div><div  class="item-text">${item.text}</div><i class="fas fa-times"></i></div>` )}
			if (filterValue=="active"){ 
				if(item["done"]==false){document.querySelector(".item-list").insertAdjacentHTML('afterbegin', `<div id="${item.key}" class="item"><div class="circle-check"></div><div  class="item-text">${item.text}</div><i class="fas fa-times"></i></div>` )}
			}
		if (filterValue=="completed"){ 
			if(item["done"]==true){document.querySelector(".item-list").insertAdjacentHTML('afterbegin', `<div id="${item.key}" class="item"><div class="circle-check"></div><div  class="item-text">${item.text}</div><i class="fas fa-times"></i></div>` )}
		}
}

	// Toggling the strikethrough

	for (item of itemArray){
		if (item["done"]==true){document.querySelector(`#${item["key"]}`).classList.add("strike-out")}
	}

	// Updating left item count in the bottom section

	updateCount();

	// Deciding the display of "clear completed" and class of "all done" down arrow

	hideClearAndColordown();

	console.table(itemArray)
}




function addItemFunction(){

	if (document.getElementById("item-input").value==""){return;}

	// Read text from input

	var currentItem = document.getElementById("item-input").value;

	// Clear the input field

	document.getElementById("item-input").value = "";

	// Create the item object

	var timeKey = "key" + getTimeKey()

	var currentItemObj = { key:timeKey, text:currentItem,done:false }

	// Append object to array of tasks

	itemArray.push(currentItemObj)

	// Append item text to the html list

	displayItemsFunction();
	
}

// Remove items function

function removeItemFunction(element){
	// alert("Good Click!")

	var currentItem = element.parentNode;
	var itemList = element.parentNode.parentNode;

	var key = currentItem.getAttribute("id")

	itemArray = itemArray.filter((item) => item["key"]!=key);

	displayItemsFunction();

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


// Update count function

function updateCount(){
	var countLeft = itemArray.reduce( (acc,ele)=>{ if (ele.done==false){acc+=1}; return acc } ,0 )
	// console.log(countLeft)	

	document.querySelector("#left-count").innerHTML = `${countLeft} items left`

}


// Clear completed function

document.querySelector("#clear-completed").addEventListener('click',clearCompleted)

function clearCompleted(){
	itemArray = itemArray.filter(item=>item["done"]==false);

	displayItemsFunction();
}


//  check all items function

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
}


function  hideClearAndColordown(){

	// Show and hide down icon 

	if (itemArray.every(item=>item.done==true)){
		document.querySelector("#check-all").classList.add("active-down")
	} else {
		document.querySelector("#check-all").classList.remove("active-down")
	}

	// Show and hide clear

	if (itemArray.every(item=>item.done==false)){
		document.querySelector("#clear-completed").style.opacity = "0";
	} else {
		document.querySelector("#clear-completed").style.opacity = "1";
	}

}



// key generator using timestamp

function getTimeKey(){
	var date = new Date;
	return date.getTime();
}

