var rightMostPanel = document.getElementById('rightMostPanel');
var leftMostPanel = document.getElementById('leftMostPanel');
var manageProducts = document.getElementById('manageProducts');
var addAccounts = document.getElementById('addAccounts');
var deleteAccounts = document.getElementById('deleteAccounts'); 
var addForm = document.getElementById('addForm');
var seeOrders = document.getElementById('seeOrders');

var showMasterOrders = document.getElementById('showMasterOrders');
var showDetailOrders = document.getElementById('showDetailOrders');

var AdminList = [];
var currentUser=sessionStorage.currentUser;

AdminList = getAdminList();

if(getAdminId()==-1){
	
	alert('Please Login First');
	window.location = "../index.html";
	
	
}


////////////////////////////////////////////////////////////


var UserList = [];
function getUserList(){
        if(!localStorage.UserList){
            localStorage.UserList = JSON.stringify([]);
        }
        return JSON.parse(localStorage.UserList);
}

UserList = getUserList();
///////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////For order data


var masterOrders = [];
var detailOrders = [];


masterOrders = getMasterOrderData();


	
if(masterOrders.length)
	idForMaster = masterOrders[masterOrders.length-1].id + 1;

	
	function getMasterOrderData(){
        if(!localStorage.masterOrders){
            localStorage.masterOrders = JSON.stringify([]);
        }
        return JSON.parse(localStorage.masterOrders);
	}
	




function updateStorageForMasterOrders(){
	
	localStorage.masterOrders = JSON.stringify(masterOrders);
	
	
	
}

detailOrders = getDetailOrderData();

	
function getDetailOrderData(){

	if(!localStorage.detailOrders){
            localStorage.detailOrders = JSON.stringify([]);
	}
    
    return JSON.parse(localStorage.detailOrders);
}


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
	var index = getAdminId();
	if(index!=-1){
		AdminList[index].flag="offline";
	}
	updateLocalStorage();
	window.location = "../index.html"
	
}

function getAdminList(){
        if(!localStorage.AdminList){
            localStorage.AdminList = JSON.stringify([]);
        }
        return JSON.parse(localStorage.AdminList);
}

function getAdminId(){

	for(var i=0;i<AdminList.length;i++)
		if(AdminList[i].flag=="online")
			return i;
	
	return -1;	
	
	
}
rightMostPanel.innerHTML="Welcome " +currentUser;
insertBreak(2,rightMostPanel);
var logOut = document.createElement('input');

logOut.type="button";
logOut.value="Log Out";
rightMostPanel.appendChild(logOut);



logOut.addEventListener("click",function(event){
		
		//To delete the current session
		sessionStorage.clear();
		setAdminAccountInactive();
		
		
	
	
	
});

function setAdminAccountInactive(){
		
		AdminList[getAdminId()].flag="offline";
		
		updateLocalStorage();
	
		window.location = "../index.html";
	
}

function updateLocalStorage(){
	
	localStorage.AdminList = JSON.stringify(AdminList);

	
}

manageProducts.addEventListener("click",function(event){
	window.location = "ManageProducts.html";
	
	
	
});

addAccounts.addEventListener("click",function(event){
	
	addForm.innerHTML="";
	makeTheForm();
	//addAccounts.releaseEvents();
	
});
function setID(node,id){
	node.setAttribute("id",id+"")
	
}
function makeTheForm(){
	
	
	var h4 = document.createElement('h4');
	h4.innerHTML = "Fill the details";
	addForm.appendChild(h4);
	
	var table = document.createElement('table');
	
	var r1 = document.createElement('tr');
	
	var c1 = document.createElement('td');
	c1.innerHTML = "Name: ";
	r1.appendChild(c1);
	
	var c2 = document.createElement('td');
	var c21 = document.createElement('input');
	c21.type = "text";
	c21.placeholder = "Enter Name";
	setID(c21,"name");
	c2.appendChild(c21);
	r1.appendChild(c2);
	table.appendChild(r1);
	////////////////////////////////////////////
	
	var r2 = document.createElement('tr');
	
	var c3 = document.createElement('td');
	c3.innerHTML = "Email: ";
	r2.appendChild(c3);
	
	var c4 = document.createElement('td');
	var c41 = document.createElement('input');
	c41.type = "text";
	c41.placeholder = "Enter Email";
	setID(c41,"email");
	c4.appendChild(c41);
	r2.appendChild(c4);
	table.appendChild(r2);
	/////////////////////////////////////////////
	
	var r3 =document.createElement('tr');
	var c5 = document.createElement('td');
	c5.innerHTML = "Password: ";
	r3.appendChild(c5);
	
	var c6 = document.createElement('td');
	var c61 = document.createElement('input');
	c61.type = "password";
	c61.placeholder = "Enter Password";
	setID(c61,"pwd");
	c6.appendChild(c61);
	r3.appendChild(c6);
	table.appendChild(r3);
	////////////////////////////////////
	
	var r4 =document.createElement('tr');
	var c7 = document.createElement('td');
	c7.innerHTML = "Re-Password: ";
	r4.appendChild(c7);
	
	var c8 = document.createElement('td');
	var c81 = document.createElement('input');
	c81.type = "password";
	c81.placeholder = "Enter Password Again";
	setID(c81,"repwd");
	c8.appendChild(c81);
	r4.appendChild(c8);
	table.appendChild(r4);
	/////////////////////////////////////////////////
	
	var r5 = document.createElement('tr');
	var c51 = document.createElement('td');
	r5.appendChild(c51);
	
	var c52 = document.createElement('td');
	c52.setAttribute("style","float:right");
	
	var cancel = document.createElement('input');
	
	cancel.type = "button";
	cancel.value="Cancel";
	setID(cancel,"cancel");
	c52.appendChild(cancel);
	
	cancel.addEventListener("click",function(event){
		addForm.removeAttribute("style");
		addForm.innerHTML="";
	});
	
	
	
	
	var sub = document.createElement('input');
	
	sub.type = "button";
	sub.value="Submit";
	setID(sub,"submit");
	c52.appendChild(sub);
	
	sub.addEventListener("click",function(event){
		var name = document.getElementById('name').value;
		var email = document.getElementById('email').value;
		var pwd = document.getElementById('pwd').value;
		var repwd = document.getElementById('repwd').value;
		
		if(pwd!=repwd)
			alert("Please enter same password in both fields");
			
		
		else if(!name || !email || !pwd)
			alert("Please enter all the fields");
		
		else
			addTheNewAdminToArray(name,email,pwd);
		
	});

	
	r5.appendChild(c52);
	
	table.appendChild(r5);
	
	addForm.appendChild(table);
	addForm.setAttribute("style","border:1px solid black");
}



function addTheNewAdminToArray(name,email,pwd){
	
	var id = getTheIdForNewAdmin();
	var adminObj = new Object();
	
	adminObj.id = id;
	adminObj.name = name;
	adminObj.email = email;
	adminObj.pwd  = pwd;
	adminObj.flag = "offline";
	adminObj.active = "yes";
	AdminList.push(adminObj);
	updateLocalStorage();
	
	alert(name + "'s account is created successfully");	
	//Deleting the form
	addForm.innerHTML="";
	
}
function getTheIdForNewAdmin(){
	
	return AdminList[AdminList.length-1].id + 1;
	
	
}
function insertBreak(n,node){
	for(var i=0;i<n;i++)
		node.appendChild(document.createElement('br'));
}
function hideTheElement(node){
	node.setAttribute("style","visibility:hidden");
}
function showTheElement(node){
	node.setAttribute("style","visibility:visible");
	
}


deleteAccounts.addEventListener("click",function(event){
	
	showForDelete();
});


function showForDelete(){
	
	addForm.innerHTML = "";
	var h4 = document.createElement('h4');
	h4.innerHTML = "List Of Admin Accounts";
	addForm.appendChild(h4);
	addForm.setAttribute("style","border: 1px solid black");
	var table = document.createElement('table');
	
	for(var i=0;i<AdminList.length;i++){
		
		if(AdminList[i].active=="yes"){
			var r1 = document.createElement('tr');
			var c1 = document.createElement('td');
			c1.innerHTML = "Name: ".bold()+AdminList[i].name;
			r1.appendChild(c1);
			var c2 = document.createElement('td');
			c2.innerHTML = "Email: ".bold()+AdminList[i].email;
			r1.appendChild(c2);
		
		
			var c3 = document.createElement('td');
			var inactive = document.createElement('a');
			setID(inactive,AdminList[i].id+"");
			inactive.href="#";
			inactive.innerHTML="Disable";
			c3.appendChild(inactive);
			r1.appendChild(c3);
			
			inactive.addEventListener("click",function(event){
					alert(event.target.id);
					var index = getIndex(event.target.id);
					alert(index);
					AdminList[index].active = "no";
					updateLocalStorage();
					showForDelete();
				
			});
			
				
				
			table.appendChild(r1);
		
		
		
		
		
		
		
	}
	addForm.appendChild(table);
	
}
}

function getIndex(id){
	
	for(var i=0;i<AdminList.length;i++){
		if(AdminList[i].id==id)
			return i;
		
	}
	return -1;
}




seeOrders.addEventListener("click",function(event){
	
	showMasterOrders.innerHTML="";
	
	var table = document.createElement('table');
	table.setAttribute("border","1px");
	showMasterOrders.appendChild(table);
	
	var r1 = document.createElement('tr');
	var c1 = document.createElement('th');
	c1.innerHTML = "UserId";
	r1.appendChild(c1);
	var c2 = document.createElement('th');
	c2.innerHTML = "UserName";
	r1.appendChild(c2);
	var c3 = document.createElement('th');
	c3.innerHTML = "Total Price";
	r1.appendChild(c3);
	var c4 = document.createElement('th');
	c4.innerHTML = "Total Quantity";
	r1.appendChild(c4);
	var c5 = document.createElement('th');
	c5.innerHTML = "Status";
	r1.appendChild(c5);
	
	table.appendChild(r1);
	
	for(var i=0;i<masterOrders.length;i++){
		
			var r1 = document.createElement('tr');
			var c1 = document.createElement('th');
			c1.innerHTML = masterOrders[i].userId;
			r1.appendChild(c1);
			var c2 = document.createElement('th');
			c2.innerHTML = getUserName(masterOrders[i].userId);
			r1.appendChild(c2);
			var c3 = document.createElement('th');
			c3.innerHTML = masterOrders[i].totalPrice;
			r1.appendChild(c3);
			var c4 = document.createElement('th');
			c4.innerHTML = masterOrders[i].totalQuantity;
			r1.appendChild(c4);
			var c5 = document.createElement('th');
			c5.innerHTML = masterOrders[i].flag;
			r1.appendChild(c5);
			
			
			
			var c6 = document.createElement('th');
			var c61 = document.createElement('input');
			c61.type="button";
			c61.value="See Detail";
			c61.setAttribute("id",i);
			c6.appendChild(c61);
			r1.appendChild(c6);
	
			c61.addEventListener("click",function(event){
		
				showTheDetailOrders(masterOrders[event.target.id].userId);
		
			});
	
	
			table.appendChild(r1);
		
	}
	
	
});
function getUserName(id){
	for(x in UserList)
		if(UserList[x].id==id)
			return UserList[x].name;
		
	return "";
}
function showTheDetailOrders(forUserID){
	
	showDetailOrders.innerHTML = "";
	
	var table = document.createElement('table');
	table.setAttribute("border","1px");
	showDetailOrders.appendChild(table);
	
	var r1 = document.createElement('tr');
	
	var c11 = document.createElement('th');
	c11.innerHTML = "Product ID";
	r1.appendChild(c11);
	
	var c1 = document.createElement('th');
	c1.innerHTML = "Product Name";
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
	
		if(detailOrders[i].userId==forUserID){
		var r2 = document.createElement('tr');
		
		var c211 = document.createElement('th');
		c211.innerHTML = detailOrders[i].pid;
		r2.appendChild(c211);
		
		
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



