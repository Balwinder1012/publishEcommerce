var wrapper = document.getElementById('wrapper');

var products = [];
var cart = [];

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
		
		if(!cart.length)
			alert("Please first add atleast one product into the cart");
		else
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
					var origQuant = products[index].quant;
					
					var insertedQuant = document.getElementById(event.target.parentNode.id+"user").value;
					
					if(insertedQuant <= 0){
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
						
						
						if(productIdisUnique(products[index].id)){
			
						addToCartArray(event.target.parentNode.id,insertedQuant);
					
						}
						else
						{	
							var index = getIndex(cart,products[index].id);
							
							cart[index].origQuant = products[index].quant;
							cart[index].userQuant = parseInt(cart[index].userQuant)+  parseInt(insertedQuant);
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
		alert("cart id - "+cart[i].id+" id= "+id1);
		if(cart[i].id==id1)
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
	cartObj.id = products[index].id;
	cartObj.name = products[index].name;
	cartObj.price = products[index].price;
	cartObj.origQuant = products[index].quant;
	cartObj.userQuant = iQuant;

	cart.push(cartObj);
		
	alert(cartObj.userQuant+" of product "+cartObj.name+" is added to cart");
	document.getElementById(id+'user').value = "";
	
	if(!cart.length)
		console.log("Cart Empty");
	
	
	
}

function updateLocalMemory(){
	localStorage.products = JSON.stringify(products);
	localStorage.cart = JSON.stringify(cart);
	
}



