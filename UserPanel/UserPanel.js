var rightMostPanel = document.getElementById('rightMostPanel');
var menu = document.getElementById('menu');
var seeProducts = document.getElementById('seeProducts');
var seeCart = document.getElementById('seeCart');
var yourOrders = document.getElementById('yourOrders');
var showOrders = document.getElementById('showOrders');
var UserList = [];

var currentUser=sessionStorage.currentUser;
UserList = getUserList();

if(getUserId()==-1){
	
	alert('Please Login First');
	window.location = "../index.html";
	
	
}
///////////////////////////////////////////////////////////////////////////For order data



var detailOrders = [];



var idForDetail = 1;
detailOrders = getDetailOrderData();

	
function getDetailOrderData(){

	if(!localStorage.detailOrders){
            localStorage.detailOrders = JSON.stringify([]);
	}
    
    return JSON.parse(localStorage.detailOrders);
}
	
if(detailOrders.length)
	idForDetail = detailOrders[detailOrders.length-1].id + 1;


function getOrderData(){
	
	if(!localStorage.detailOrders)
		detailOrders = JSON.stringify([]);
	
	return JSON.parse(localStorage.detailOrders);
	
	
}

function updateStorageForDetailOrders(){
	
	localStorage.detailOrders = JSON.stringify(detailOrders);
	
	
	
}


///////////////////////////////////////////////////////////////////////////
// This if function is used to set the flag offline if currentUser is undefined and still flag is set true

if(currentUser==undefined){
	var index = getUserId();
	if(index!=-1){
		UserList[index].flag="offline";
	}
	updateLocalStorage();
	window.location = "../index.html"
	
}
function updateLocalStorage(){
	
	localStorage.UserList = JSON.stringify(UserList);

	
}
function getUserList(){
        if(!localStorage.UserList){
            localStorage.UserList = JSON.stringify([]);
        }
        return JSON.parse(localStorage.UserList);
}

function getUserId(){

	for(var i=0;i<UserList.length;i++)
		if(UserList[i].flag=="online")
			return i;
	
	return -1;	
	
	
}
rightMostPanel.innerHTML="Welcome ".bold() +currentUser.bold();
insertBreak(rightMostPanel);
insertBreak(rightMostPanel);
var logOut = document.createElement('input');

logOut.type="button";
logOut.value="Log Out";
rightMostPanel.appendChild(logOut);



logOut.addEventListener("click",function(event){
		
		//To delete the current session
		sessionStorage.clear();
		setUserAccountInactive();
		
		
	
	
	
});

function setUserAccountInactive(){
		
		UserList[getUserId()].flag="offline";
		
		updateLocalStorage();
	
		window.location = "../index.html";
	
}

function insertBreak(node){
	
	node.appendChild(document.createElement('br'));
	
}



seeProducts.addEventListener("click",function(event){
	
	window.location="BuyTheProducts.html";
	
	
	
});

seeCart.addEventListener("click",function(event){
	
	window.location="payment.html";
	
});


yourOrders.addEventListener("click",function(event){
	
	if(userHasAnyOrder())
		showTheOrders();
	else
		showOrders.innerHTML = "<br/><br/>You have no orders".bold();
});
	
	
	
function userHasAnyOrder(){
	
	for(var i=0;i<detailOrders.length;i++)
		if(detailOrders[i].userId==UserList[getUserId()].id)
			return true;
		
	return false;
	
	
}	
	
	
	
	


function showTheOrders(){
	
	showOrders.innerHTML = "";
	insertBreak(showOrders);
	insertBreak(showOrders);
	insertBreak(showOrders);
	insertBreak(showOrders);
	var table = document.createElement('table');
	table.setAttribute("border","1px");
	showOrders.appendChild(table);
	
	var r1 = document.createElement('tr');
	
	var c1 = document.createElement('th');
	c1.innerHTML = "Name";
	r1.appendChild(c1);
	var c2 = document.createElement('th');
	c2.innerHTML = "Price";
	r1.appendChild(c2);
	var c3 = document.createElement('th');
	c3.innerHTML = "Quantity";
	r1.appendChild(c3);
	var c4 = document.createElement('th');
	c4.innerHTML = "Total Amount";
	r1.appendChild(c4);
	var c5 = document.createElement('th');
	c5.innerHTML = "Status";
	r1.appendChild(c5);
	
	table.appendChild(r1);
	
	for(var i=0;i<detailOrders.length;i++){
	
		if(detailOrders[i].userId==UserList[getUserId()].id){
		var r2 = document.createElement('tr');
	
		var c21 = document.createElement('th');
		c21.innerHTML = detailOrders[i].pname;
		r2.appendChild(c21);
		var c22 = document.createElement('th');
		c22.innerHTML =detailOrders[i].pprice;
		r2.appendChild(c22);
		var c23 = document.createElement('th');
		c23.innerHTML = detailOrders[i].quant;
		r2.appendChild(c23);
		var c24 = document.createElement('th');
		c24.innerHTML = detailOrders[i].tprice;
		r2.appendChild(c24);
		var c25 = document.createElement('th');
		c25.innerHTML = detailOrders[i].status;
		r2.appendChild(c25);
	
		table.appendChild(r2);
		}
	
	}
	
	
	
	
}



