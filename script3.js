var wrapper = document.getElementById('wrapper');

var products = [];
var cart = [];

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
function ddd(){
	for(var i=0;i<cart.length;i++)
		console.log("Inserted Quant  "+cart[i].userQuant+ " for id= " + cart[i].id +" user quant "+cart[i].userQuant);
}
var table = document.createElement('table');
wrapper.appendChild(table);

addToDom2();

//if cart is not empty then adding the "Buy Now" button

if(cart.length){
	
	
	insertBreak();
	insertBreak();
	var buyNow = document.createElement('a');
	buyNow.innerHTML = "Buy Now";
	buyNow.href = "#";
	wrapper.appendChild(buyNow);
	
	buyNow.addEventListener("click",function(event){
		
			alert("Your Order Is Placed Sucessfully, Thank You");
			wrapper.setAttribute("style","visibility:hidden");
		
	});
	
	insertBreak();
	insertBreak();
	
	var cancelNow = document.createElement('a');
	cancelNow.innerHTML = "Cancel";
	cancelNow.href = "#";
	wrapper.appendChild(cancelNow);
	
	cancelNow.addEventListener("click",function(event){
		
			for(var i=0;i<cart.length;i++){
				var Cid = cart[i].id;
				
				var pIndex = getIndex(products,Cid);
				
				products[pIndex].quant = parseInt(products[pIndex].quant) + cart[i].userQuant;
				
				cart.splice(i,1);
				updateLocalMemory();
				window.location = "BuyTheProducts.html";
			}
		
	});
	
	
	
	
}
function insertBreak(){
	
	var br = document.createElement('br');
	wrapper.appendChild(br);
	
}

function addToDom2(){
	
	deleteAllDomElementsFirst();
	for(var i=0;i<cart.length;i++){
		
			var r2 = document.createElement('tr');
			r2.setAttribute("id",cart[i].id);
	
			var c1 = document.createElement('td');
			c1.innerHTML = "Product Name - ".bold() + cart[i].name;
			r2.appendChild(c1);
	
			var c2 = document.createElement('td');
			c2.innerHTML = "Product Price - ".bold() + cart[i].price;
			r2.appendChild(c2);
  
			var c4 = document.createElement('td');
			c4.innerHTML = "Entered Quantity - ".bold() + cart[i].userQuant;
			r2.appendChild(c4);
			
            var c5 = document.createElement('td');
            var increase = document.createElement('input');
            increase.type = "button";
            increase.value= "UP";
            c5.appendChild(increase);
            r2.appendChild(c5);
     
            increase.addEventListener("click",function(event){
               var Pindex = getIndex(products,event.target.parentNode.parentNode.id);
			   var Cindex = getIndex(cart,event.target.parentNode.parentNode.id);
			   //alert(cart[index].origQuant+" df");
               if(isSafeToIncrease(cart[Cindex].origQuant)){
					cart[Cindex].userQuant = parseInt(cart[Cindex].userQuant) +  1;  
					cart[Cindex].origQuant = parseInt(cart[Cindex].origQuant) - 1;
					products[Pindex].quant = cart[Cindex].origQuant;
					c4.innerHTML = "Entered Quantity - ".bold() + cart[Cindex].userQuant;
					updateLocalMemory();
               }
               
                
            });
            var c6 = document.createElement('td');
            var decrease = document.createElement('input');
            decrease.type = "button";
            decrease.value= "DOWN";
            c5.appendChild(decrease);
            r2.appendChild(c5);
     
            decrease.addEventListener("click",function(event){
                var Pindex = getIndex(products,event.target.parentNode.parentNode.id);
			    var Cindex = getIndex(cart,event.target.parentNode.parentNode.id);
			   
               if(isSafeToDecrease(cart[Cindex].userQuant,cart[Cindex].origQuant)){
					cart[Cindex].userQuant = parseInt(cart[Cindex].userQuant) - 1;  
					cart[Cindex].origQuant = parseInt(cart[Cindex].origQuant) +  1;
					products[Pindex].quant = cart[Cindex].origQuant;
					c4.innerHTML = "Entered Quantity - ".bold() + cart[Cindex].userQuant;
					updateLocalMemory();
              }
              
                
            });
			
			var c7 = document.createElement('td');
			var removeProduct = document.createElement('a');
			removeProduct.innerHTML = "Remove Product";
			removeProduct.href = "#";
			c7.appendChild(removeProduct);
			r2.appendChild(c7);
            
			
			
			removeProduct.addEventListener("click",function(event){
				//Delete it from the cart array and return back the userQuant from deleted array to products array
				 var index = getIndex(event.target.parentNode.parentNode.id);
				 products[index].quant = parseInt(products[index].quant) + cart[index].userQuant;
				 
				cart.splice(index,1);
				
				updateLocalMemory();
				removeFromDOM(event.target.parentNode.parentNode.id);
				
			});
			table.appendChild(r2);
	}
	
}
function removeFromDOM(id){
	
	 table.removeChild(document.getElementById(id+""));
}
function deleteAllDomElementsFirst(){
	table.innerHTML = "";
	
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
