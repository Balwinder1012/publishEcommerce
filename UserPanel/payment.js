var wrapper = document.getElementById('wrapper');
var ifCartEmpty = document.getElementById('ifCartEmpty');
var totalPrice = document.getElementById('totalPrice');
var options = document.getElementById('options');
var products = [];
var cart = [];


//////////////////////////////////////////////////////////////////////////For order Data

var masterOrders = [];
var detailOrders = [];


masterOrders = getMasterOrderData();

var idForMaster = 1;
	
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


//////////////////////////////////////////////////////////////////////////
cart = getTheCartArray();
//alert(cart.length);
function getTheCartArray(){
	
	if(!localStorage.cart){
            localStorage.cart = JSON.stringify([]);
        }
        return JSON.parse(localStorage.cart);
}

/////////////////////////////////////////////////////////////////////////For user data


var UserList = [];

var currentUser=sessionStorage.currentUser;

UserList = getUserList();
var UID = getUserId();

if(UID==-1){
	
	alert('Please Login First');
	window.location = "../LoginPage.html";
	
	
}

// This if function is used to set the flag offline if currentUser is undefined and still flag is set true

if(currentUser==undefined){
	var index = UID;
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
		
		UserList[UID].flag="offline";
		
		updateLocalStorage();
	
		window.location = "../LoginPage.html";
	
}

function insertBreak(node){
	
	node.appendChild(document.createElement('br'));
	
}



/////////////////////////////////////////////////////////////////////////

function getProductsArray(){
        if(!localStorage.products){
            localStorage.products = JSON.stringify([]);
        }
        return JSON.parse(localStorage.products);
}
function getCartArray(){
        if(!localStorage.cart){
            localStorage.cart = JSON.stringify([]);
        }
        return JSON.parse(localStorage.cart);
}

products = getProductsArray();
cart = getCartArray();
ddd();


showCartIsEmpty();
//alert(!cart.length +" "+ ifUserHasNoProductsInCart());
function showCartIsEmpty(){
	if(!cart.length && ifUserHasNoProductsInCart()){
	
	
		ifCartEmpty.innerHTML = "Cart is Empty".bold();
		insertBreak(ifCartEmpty);
		insertBreak(ifCartEmpty);
	}
}

function ifUserHasNoProductsInCart(){
	
	for(var i=0;i<cart.length;i++)
		if(cart[i].userID==UserList[getUserId()].id)
			return false;
		
		
	return true;
	
}
function ddd(){
	for(var i=0;i<cart.length;i++)
		console.log("Inserted Quant  "+cart[i].userQuant+ " for id= " + cart[i].id +" user quant "+cart[i].userQuant);
}
var table = document.createElement('table');
wrapper.appendChild(table);

addToDom2();

//if cart is not empty then adding the "Buy Now" button

if(cart.length && !ifUserHasNoProductsInCart()){
	
	displayTotal();
	
	insertBreak(options);
	insertBreak(options);
	var buyNow = document.createElement('a');
	buyNow.innerHTML = "Buy Now";
	buyNow.href = "#";
	options.appendChild(buyNow);
	
	buyNow.addEventListener("click",function(event){
		
			makeOrder();
			console.log(masterOrders);
			alert("Your Order Is Placed Sucessfully, Thank You");
			
			wrapper.setAttribute("style","visibility:hidden");
			showCartIsEmpty();
			clearTheCartForUser();
			window.location = "UserPanel.html";
	});
	
	insertBreak(options);
	insertBreak(options);
	
	var cancelNow = document.createElement('a');
	cancelNow.innerHTML = "Cancel";
	cancelNow.href = "#";
	options.appendChild(cancelNow);
	
	cancelNow.addEventListener("click",function(event){
		
			for(var i=0;i<cart.length;i++){
				var Cid = cart[i].id;
				
				var pIndex = getIndex(products,Cid);
				
				products[pIndex].quant = parseInt(products[pIndex].quant) + parseInt(cart[i].userQuant);
				
				cart.splice(i,1);
				updateLocalMemory();
				window.location = "BuyTheProducts.html";
			}
		
	});

	
	
}
function clearTheCartForUser(){
	
	
	cart=[];
	updateLocalMemory();
	
}
function insertBreak(node){
	
	var br = document.createElement('br');
	node.appendChild(br);
	
}

function addToDom2(){
	
	deleteAllDomElementsFirst();
	for(var i=0;i<cart.length;i++){
	
		//Only show list for this user
		
		if(parseInt(UserList[UID].id)===parseInt(cart[i].userID)){
			
			
			var r2 = document.createElement('tr');
			r2.setAttribute("id",cart[i].id);
	
			var c1 = document.createElement('td');
			c1.innerHTML = "Product Name : ".bold() + cart[i].name;
			r2.appendChild(c1);
	
			var c2 = document.createElement('td');
			c2.innerHTML = "Product Price : ".bold() + cart[i].pprice;
			r2.appendChild(c2);
  
			var c4 = document.createElement('td');
			c4.setAttribute("id",cart[i].id+"Q");
			c4.innerHTML = "Entered Quantity : ".bold() + cart[i].userQuant;
			r2.appendChild(c4);
			
			var c7 = document.createElement('td');
			c7.setAttribute("id",cart[i].id+"T");
            c7.innerHTML = "Sub Total : ".bold() + cart[i].tprice;
            r2.appendChild(c7);
			
            var c5 = document.createElement('td');
            var increase = document.createElement('input');
            increase.type = "button";
            increase.value= "UP";
            c5.appendChild(increase);
            r2.appendChild(c5);
     
            increase.addEventListener("click",function(event){
					  var Cindex = getIndex(cart,event.target.parentNode.parentNode.id);
					  var Pindex = getIndex(products,cart[Cindex].pid);
					 // alert(cart[Cindex].name + " ZZ " + products[Pindex].name);
			//  alert(event.target.parentNode.parentNode.id);
			 
			   //alert(Cindex  +"ok");//+" increaing");
               if(isSafeToIncrease(cart[Cindex].origQuant)){
					cart[Cindex].userQuant = parseInt(cart[Cindex].userQuant) +  1;  
					cart[Cindex].origQuant = parseInt(cart[Cindex].origQuant) - 1;
					cart[Cindex].tprice = (cart[Cindex].pprice * cart[Cindex].userQuant);
					//alert(cart[Cindex].name);
					products[Pindex].quant = cart[Cindex].origQuant;
					document.getElementById(cart[Cindex].id+"Q").innerHTML = "Entered Quantity : ".bold() + cart[Cindex].userQuant;
					document.getElementById(cart[Cindex].id+"T").innerHTML  = "Sub Total : ".bold() + cart[Cindex].tprice ;
					displayTotal();
					updateLocalMemory();
               }
               
                
            });
            var c6 = document.createElement('td');
            var decrease = document.createElement('input');
            decrease.type = "button";
            decrease.value= "DOWN";
            c6.appendChild(decrease);
            r2.appendChild(c6);
     
            decrease.addEventListener("click",function(event){
                
			    var Cindex = getIndex(cart,event.target.parentNode.parentNode.id);
				var Pindex = getIndex(products,cart[Cindex].pid);
               if(isSafeToDecrease(cart[Cindex].userQuant,cart[Cindex].origQuant)){
					cart[Cindex].userQuant = parseInt(cart[Cindex].userQuant) - 1;  
					cart[Cindex].origQuant = parseInt(cart[Cindex].origQuant) +  1;
					cart[Cindex].tprice = cart[Cindex].userQuant * cart[Cindex].pprice;
					products[Pindex].quant = cart[Cindex].origQuant;
					document.getElementById(cart[Cindex].id+"Q").innerHTML = "Entered Quantity : ".bold() + cart[Cindex].userQuant;
					document.getElementById(cart[Cindex].id+"T").innerHTML= "Sub Total : ".bold() + cart[Cindex].tprice;
					
					displayTotal();
					updateLocalMemory();
              }
              
                
            });
			
			
			
			
			var c8 = document.createElement('td');
			var removeProduct = document.createElement('a');
			removeProduct.innerHTML = "Remove Product";
			removeProduct.href = "#";
			c8.appendChild(removeProduct);
			r2.appendChild(c8);
            
			
			
			removeProduct.addEventListener("click",function(event){
				//Delete it from the cart array and return back the userQuant from deleted array to products array
				 var index = getIndex(event.target.parentNode.parentNode.id);
				 products[index].quant = parseInt(products[index].quant) + parseInt(cart[index].userQuant);
				 
				cart.splice(index,1);
				
				updateLocalMemory();
				removeFromDOM(event.target.parentNode.parentNode.id);
				displayTotal();
				
			});
			
			
			
			table.appendChild(r2);
		}	
	}
	
}
function removeFromDOM(id){
	
	 table.removeChild(document.getElementById(id+""));
}
function deleteAllDomElementsFirst(){
	table.innerHTML = "";
	
}

function displayTotal(){
	
	var s=0;
	for(x in cart){

		if(cart[x].userID==UserList[getUserId()].id){
			
			s = s + (cart[x].tprice);
		}
	}
		
	
	var TotalPrice = s + "";
	totalPrice.innerHTML = "Total Price :".bold().fontsize(5) + TotalPrice.bold().fontsize(5);
		
		
	
	
	
	
}
		
function isSafeToIncrease(origQuant){
    //alert(origQuant);
	
    if(origQuant==0){
        alert("Entered quantity exceeds the quantity of products present in inventory");
        return false;
   
    }
    return true;
        
       
    
}		
function isSafeToDecrease(userQuant,origQuant){
    if(userQuant==0){
        alert("Please enter quantity greater than or equal to 1");
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

function updateLocalMemory(){
	localStorage.products = JSON.stringify(products);
	localStorage.cart = JSON.stringify(cart);
	
}





function makeOrder(){
	//First making detail order
	for(var i=0;i<cart.length;i++){
		var orderObj = new Object();
		orderObj.id = idForDetail;
		orderObj.cid = cart[i].id;
		orderObj.pid = cart[i].pid;
		orderObj.pname = cart[i].name;
		orderObj.pprice = cart[i].pprice;
		orderObj.quant = cart[i].userQuant;
		orderObj.tprice = cart[i].tprice;
		orderObj.userId = cart[i].userID;
		orderObj.userName = cart[i].userName;
		orderObj.date = new Date();
		orderObj.status = "ordered";
		detailOrders.push(orderObj);
		updateStorageForDetailOrders();
		idForDetail++;
	
	}
	addToMasterOrders(orderObj.userId);
}
function addToMasterOrders(userId){
	
	
	//var noOfUserIds = findNumberOfUsersIds();
	
	if(userIDisUnique(userId)){
			var totalQuantity=0;
			var totalPrice=0;
			
			for(var i=0;i<detailOrders.length;i++){
				if(detailOrders[i].userId==userId){
					totalQuantity = totalQuantity + detailOrders[i].quant;
					totalPrice = totalPrice + detailOrders[i].tprice;
				}
			}
			var masterObj = new Object();
	
			masterObj.id = idForMaster;
			masterObj.userId = userId;
			masterObj.totalPrice = totalPrice;
			masterObj.totalQuantity = totalQuantity;
			masterObj.date = new Date();
			masterObj.flag = "ordered";
			idForMaster++;
			
			masterOrders.push(masterObj);
			updateStorageForMasterOrders();
		
		
		
		
		
		
	}
	else{
		
			var index = getMasterIndex(userId);
			
			masterOrders[index].totalPrice = findTotalPrice(userId);
			masterOrders[index].totalQuantity = findTotalQuantity(userId);
			masterOrders[index] = new Date();
			
		
		
		
	}
	
}
function findTotalPrice(userId){
	var sum=0;
	for(var i=0;i<detailOrders.length;i++){
				if(detailOrders[i].userId==userId){
					sum = sum + detailOrders[i].tprice;
				}
			}
			
	return sum;
	
	
}


function findTotalQuantity(userId){
	var sum=0;
	for(var i=0;i<masterOrders.length;i++){
				if(masterOrders[i].userId==userId){
					sum = sum + masterOrders[i].userQuant;
				}
			}
			
	return sum;
	
	
}
function getMasterIndex(userId){
	
		for(var i=0;i<masterOrders.length;i++)
			if(masterOrders[i].userID==userId)
				return 1;
			
		return -1;	
	
}
function userIDisUnique(uid){
	
	for(x in masterOrders)
		if(masterOrders[x].userId==uid)
			return false;
		
	return true;	
	
	
}