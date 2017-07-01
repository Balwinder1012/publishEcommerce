var rightMostPanel = document.getElementById('rightMostPanel');
var leftMostPanel = document.getElementById('leftMostPanel');
var manageProducts = document.getElementById('manageProducts');
var addAccounts = document.getElementById('addAccounts');
var deleteAccounts = document.getElementById('deleteAccounts'); 
var addForm = document.getElementById('addForm');
var AdminList = [];
var currentUser=sessionStorage.currentUser;

AdminList = getAdminList();

if(getAdminId()==-1){
	
	alert('Please Login First');
	window.location = "LoginPage.html";
	
	
}

// This if function is used to set the flag offline if currentUser is undefined and still flag is set true
if(currentUser==undefined){
	var index = getAdminId();
	if(index!=-1){
		AdminList[index].flag="offline";
	}
	updateLocalStorage();
	window.location = "LoginPage.html"
	
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
insertBreak(rightMostPanel);
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
	
		window.location = "LoginPage.html";
	
}

function updateLocalStorage(){
	
	localStorage.AdminList = JSON.stringify(AdminList);

	
}

manageProducts.addEventListener("click",function(event){
	window.Location = "~/ManageProducts.html";
	
	
	
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
