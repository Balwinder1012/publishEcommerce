

var wrapper = document.getElementById('wrapper');
var rightMostPanel = document.getElementById('rightMostPanel');
var products = [];
var cart = [];

cart = getTheCartArray();

function getTheCartArray(){
	
	if(!localStorage.cart){
            localStorage.cart = JSON.stringify([]);
        }
        return JSON.parse(localStorage.cart);
}

////////////////////////////////////////////////////////////////////////////////////////////For User data


var UserList = [];

var currentUser=sessionStorage.currentUser;
UserList = getUserList();

if(getUserId()==-1){
	
	alert('Please Login First');
	window.location = "../LoginPage.html";
	
	
}

// This if function is used to set the flag offline if currentUser is undefined and still flag is set true

if(currentUser==undefined){
	var index = getUserId();
	if(index!=-1){
		UserList[index].flag="offline";
	}
	updateLocalStorage();
	window.location = "../LoginPage.html"
	
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
rightMostPanel.innerHTML=currentUser.bold();
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
	
		window.location = "../LoginPage.html";
	
}

function insertBreak(node){
	
	node.appendChild(document.createElement('br'));
	
}



////////////////////////////////////////////////////////////////////////////////////////////
function getStoredProducts(){
        if(!localStorage.products){
            localStorage.products = JSON.stringify([]);
        }
        return JSON.parse(localStorage.products);
}

function displayArray(ar){
    if(ar.length==0)
        console.log("Array is empty");
    for(var i=0;i<ar.length;i++)
		console.log("name= "+ar[i].name+" id= "+ar[i].id);
}	

products =getStoredProducts();
//alert(products.length);
displayArray(products);

var table = document.createElement('table');
wrapper.appendChild(table);

addToDom2();


if(products.length){
	var buyNow = document.createElement('a');
	buyNow.innerHTML = "Go to my cart";
	buyNow.href = "#";
	wrapper.appendChild(buyNow);
	buyNow.addEventListener("click",function(event){
		
		
			window.location = "Payment.html";
	});
	
	
}

function addToDom2(){
	
	deleteAllDomElementsFirst();
	for(var i=0;i<products.length;i++){
		if(products[i].active=="yes"){
			var r2 = document.createElement('tr');
			r2.setAttribute("id",products[i].id);
	
			var c1 = document.createElement('td');
			c1.innerHTML = "Product Name- ".bold()+products[i].name+"";
			r2.appendChild(c1);
	
			var c2 = document.createElement('td');
			c2.innerHTML = "   Product Price- ".bold()+products[i].price;
			r2.appendChild(c2);
  
			var c4 = document.createElement('td');
			c4.setAttribute("id",products[i].id+"quant");
           // alert("   Quantity- "+(parseInt(products[i].quant);
			c4.innerHTML = "   Quantity- ".bold()+parseInt(products[i].quant);
			r2.appendChild(c4);
			
			
			var userQuant = document.createElement('input');
			userQuant.setAttribute("id",products[i].id+"user");
			userQuant.type = "number";
			userQuant.placeholder = "insert quantity";
			r2.appendChild(userQuant);
			
			
			var addToCart = document.createElement('input');
			addToCart.type = "button";
			addToCart.setAttribute("id","addToCart");
			addToCart.value = "Add to Cart";
			r2.appendChild(addToCart);
	
			table.appendChild(r2);	
    
			addToCart.addEventListener("click",function(event){
				
					var index = getIndex(products,event.target.parentNode.id);
					//alert(products[index].quant);
					var origQuant = products[index].quant;
					
					var insertedQuant = parseInt(document.getElementById(event.target.parentNode.id+"user").value);
				
					
					if(insertedQuant <= 0 || !insertedQuant){
						alert("Please enter quantity greater than or equal to 1");
						document.getElementById(event.target.parentNode.id+"user").value="";
					}
					else if(origQuant==0 || origQuant<insertedQuant){
						alert("Entered quantity exceeds the quantity of products present in inventory");
						document.getElementById(event.target.parentNode.id+"user").value="";
					}
					
					else{
						products[index].quant = origQuant-insertedQuant;
					
						document.getElementById(event.target.parentNode.id+'quant').innerHTML = "   Quantity- ".bold() + parseInt(products[index].quant);
						
						//alert(productIdisUnique(  (products[index].id)  +""+  (UserList[getUserId()].id)  ));
						if(productIdisUnique(  (products[index].id)  +""+  (UserList[getUserId()].id)  )){
			
						addToCartArray(event.target.parentNode.id,insertedQuant);
					
						}
						else
						{	
							var CIndex = getIndex(cart,products[index].id+""+UserList[getUserId()].id);
						
							//alert(index);
							
							cart[CIndex].origQuant = products[index].quant;
							cart[CIndex].userQuant = parseInt(cart[CIndex].userQuant)+  parseInt(insertedQuant);
							cart[CIndex].tprice = cart[CIndex].userQuant * cart[CIndex].pprice;
							alert("Total "+ cart[CIndex].userQuant+" of product "+cart[CIndex].name+" is added to " + cart[CIndex].userName+"'s cart");
						}
						ddd();
						updateLocalMemory();
						
						document.getElementById(event.target.parentNode.id+"user").value  = "";
						
					}
                    
			});
			
		}
	}
	
	
	
	
	

}
function ddd(){
	for(var i=0;i<cart.length;i++)
		console.log("Inserted Quant  "+cart[i].userQuant+ " for id= " + cart[i].id +" orig quant "+cart[i].origQuant);
}
function productIdisUnique(id1){

	for(var i=0;i<cart.length;i++){
	
		if(cart[i].id==id1  && cart[i].userID == UserList[getUserId()].id)
			return false;
	}
	return true;	
	
}
function getIndex(arr,id){
	
	for(var i=0;i<arr.length;i++)
		if(arr[i].id==id)
			return i;
	
	return -1;
}
function deleteAllDomElementsFirst(){
    table.innerHTML="";
}
function addToCartArray(id,iQuant){
	var index = getIndex(products,event.target.parentNode.id);
	var cartObj = new Object();
	//alert(products[index].id+"hi"+UserList[getUserId()].id);
	cartObj.id = products[index].id+""+UserList[getUserId()].id;
	cartObj.pid = products[index].id;
	cartObj.name = products[index].name;
	cartObj.pprice = products[index].price;
	
	cartObj.origQuant = products[index].quant;
	cartObj.userQuant = iQuant;
	cartObj.tprice = cartObj.userQuant * cartObj.pprice;
	cartObj.userID = UserList[getUserId()].id;
	cartObj.userName = UserList[getUserId()].name;
	cart.push(cartObj);
		
	alert(cartObj.userQuant+" of product "+cartObj.name+" is added to " + cartObj.userName+"'s cart");
	document.getElementById(id+'user').value = "";
	
	if(!cart.length)
		console.log("Cart Empty");
	
	
	
}

function updateLocalMemory(){
	localStorage.products = JSON.stringify(products);
	localStorage.cart = JSON.stringify(cart);
	
}



