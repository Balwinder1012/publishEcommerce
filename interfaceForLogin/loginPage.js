var wrapper = document.getElementById('wrapper');
var email = document.getElementById('email');
var passWord = document.getElementById('password');
var login = document.getElementById('login');
var signUp = document.getElementById('signUp');

var UserList =  [];
var AdminList = [];

function getUserList(){
        if(!localStorage.UserList){
            localStorage.UserList = JSON.stringify([]);
        }
        return JSON.parse(localStorage.UserList);
}

function getAdminList(){
        if(!localStorage.AdminList){
            localStorage.AdminList = JSON.stringify([]);
        }
        return JSON.parse(localStorage.AdminList);
}

function updateLocalStorage(){
	
	localStorage.AdminList = JSON.stringify(AdminList);
	
	
}

UserList = getUserList();
AdminList = getAdminList();

if(!AdminList.length){
	addFirstAdmin();
}
function addFirstAdmin(){
	var adminObj = new Object();
	adminObj.id = 1;
	adminObj.name = "Balwinder";
	
	adminObj.email = "balwinder1012@gmail.com";
	adminObj.pwd = "Saini";
	adminObj.flag = "offline";
	adminObj.active = "yes";
	
	AdminList.push(adminObj);
	updateLocalStorage();
}


login.addEventListener("click",function(event){

	adminIndex=isAdmin(email.value,passWord.value);
	userIndex=isUser(email.value,passWord.value);
	if(adminIndex>=0){
			if(AdminList[adminIndex].active=="yes"){
				AdminList[adminIndex].flag = "online";
				updateLocalStorage();
				sessionStorage.currentUser=AdminList[adminIndex].name;
				alert("Logined Successfully - Welcome "+AdminList[adminIndex].name);
				
				window.location = "AdminPanel.html";

			}
			else{
				alert("Account is not active now");
				window.location = "LoginPage";
			}
							
	}
	
	else if(userIndex>=0){
		
			if(UserList[userIndex].active=="yes"){
				UserList[userIndex].flag = "online";
				updateLocalStorage();
				sessionStorage.currentUser=UserList[userIndex].name;
				alert("Logined Successfully - Welcome "+UserList[userIndex].name);
				
				window.location = "UserPanel.html";

			}
			else{
				alert("Account is not active now");
				window.location = "LoginPage";
			}
						
		
		
		
		
	}
	else
	
	alert("Wrong Username and password combination");
	

});

signUp.addEventListener("click",function(event){
	
	window.location = "SignUp.html";
	
	
});
function isAdmin(email,pwd){
	
	for(var i=0;i<AdminList.length;i++)
		if(AdminList[i].email===email && AdminList[i].pwd===pwd)
			return i;
	
	return -1;
}

function isUser(email,pwd){
	for(var i=0;i<UserList.length;i++)
		if(UserList[i].email===email && UserList[i].pwd===pwd)
			return i;
	
	return -1;
	
	
}