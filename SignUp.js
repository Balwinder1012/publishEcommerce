var UserList =  [];
var signUp = document.getElementById('signUp');
var cancel = document.getElementById('cancel');
var userid = 1;

function getUserList(){

        if(!localStorage.UserList){
            localStorage.UserList = JSON.stringify([]);
        }
        return JSON.parse(localStorage.UserList);
}

function updateLocalStorage(){
	
	localStorage.UserList = JSON.stringify(UserList);
	
	
}

UserList = getUserList();

if(UserList.length){
	
	userid = parseInt(UserList[UserList.length-1].id) + 1;
	
	
}
cancel.addEventListener("click",function(event){
	
	window.location="index.html";
	
});
signUp.addEventListener("click",function(event){
	
		var name = document.getElementById('name').value;
		var email = document.getElementById('email').value;
		var address = document.getElementById('address').value;
		var name = document.getElementById('name').value;
		var pwd = document.getElementById('pwd').value;
		var repwd = document.getElementById('repwd').value;
		
		
		
		
		if(pwd!=repwd){
			alert("Please enter same password in both fields");
			document.getElementById('pwd').value = "";
			document.getElementById('repwd').value="";
		}
		else if(!name || !email || !pwd)
			alert("Please enter all the fields");
		
		else{
			addTheNewUserToArray(name,email,pwd,address);
			window.location= "index.html";
		}
		
	
	
});

function addTheNewUserToArray(name,email,pwd,address){
	
		var userObj = new Object();
		userObj.id = userid;
		userObj.name = name;
		userObj.email = email;
		userObj.pwd = pwd;
		userObj.address = address;
		userObj.flag = "offline";
		userObj.active = "yes";
		UserList.push(userObj);
		updateLocalStorage();
		
		userid++;
		alert(name+"'s account is created");
	
}


