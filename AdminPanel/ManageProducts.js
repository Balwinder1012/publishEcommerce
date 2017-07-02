	var b = document.getElementById('button');
	var d = document.getElementById('wrapper');
    var table= document.getElementById('outputTable');
	var list = document.getElementById('list');
	var outputDiv = document.getElementById('output');

	var currentUser = sessionStorage.currentUser;
	var AdminList = [];
	AdminList = getAdminList();
	
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
	
	function updateAdminList(){
	
	localStorage.AdminList = JSON.stringify(AdminList);

	
}

	if(currentUser==undefined || getAdminId()==-1){
		var index = getAdminId();
		if(index!=-1){
		AdminList[index].flag="offline";
		}
		updateAdminList();
	
		alert("Please login first");
		hideTheElement(b);
		window.location = "../LoginPage.html"
	
	}

	
	
	rightMostPanel.innerHTML=currentUser;
	insertBreak(rightMostPanel);
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
		
		updateLocalManager();
	
		window.location = "../LoginPage.html";
	
}

    function getStoredProducts(){
        if(!localStorage.products){
            localStorage.products = JSON.stringify([]);
        }
        return JSON.parse(localStorage.products);
    }
    
	
	var products = getStoredProducts();
    displayArray();
	var productID=400;
	if(products.length-1>=0)
	  productID= products[products.length-1].id + 1;
	
    //This is used to display the list of items from the local storage
	if(products.length!=0){
        
       showTheElement(list);
       showTheElement(outputTable);
       addToDom2();
        
    }
	
	function hideTheElement(element){
		element.setAttribute("style","visibility:hidden");
		
	}
	
	function showTheElement(element){
		element.setAttribute("style","visibility:visible");
	}

    function updateLocalManager(){
        localStorage.products = JSON.stringify(products);
        
    }
	function insertBreak(node){
	
	node.appendChild(document.createElement('br'));
	
	}
	
	b.addEventListener("click", function(event){
                    	/*b is the id for button "Add products" which is required to be hidden
						  when clicked*/
						hideTheElement(b);  
				        
                        
						/*This makes the form in which the user can enter product details to be added
						  to inventory*/
						  
						makeBasicForm();
			
						/*This above form is wrapped in div d, which is required to be visible */
						showTheElement(d);
						
                        
					}
					);
	
	function makeBasicForm(){
		
		
		// Here table is used just to allign the elements correctly
        var newTable = document.createElement('table');
        
        var r1 = newTable.insertRow();
        r1.insertCell().innerHTML = "Product Name";
        var p2 = document.createElement('input');
		p2.setAttribute("id","pname");
		p2.type="text";
		r1.appendChild(p2);
        
       
        ///////////////////////////////////////////////////////////
        
        
        var r2 = newTable.insertRow();
        r2.insertCell().innerHTML = "Product Price";
        var p4 = document.createElement('input');
		p4.setAttribute("id","pprice");
		p4.type="number";
        r2.appendChild(p4);
        
        
        /////////////////////////////////////////////////////////
        
        
        var r3 = newTable.insertRow();
        r3.insertCell().innerHTML = "Description";
        var p6 = document.createElement('input');
		p6.setAttribute("id","pdesc");
		p6.type="text";
		r3.appendChild(p6);
		
        //////////////////////////////////////////////////////////////
        
		var r4 = newTable.insertRow();
        r4.insertCell().innerHTML = "Quantity";
        var p8 = document.createElement('input');
		p8.setAttribute("id","pquant");
		p8.type="number";
		r4.appendChild(p8);
        
		///////////////////////////////////////////
        
        d.appendChild(newTable);        
		var submit = document.createElement('input');
		submit.setAttribute("id","psubmit");
		submit.type="button";
		submit.value="Submit"
		d.appendChild(submit);
		
		submit.addEventListener("click", function(event){
					
				if(p4.value<=0 || p8.value<=0)
						alert("Please enter the price and quantity greater than 0");
				else if(p2.value && p4.value && p6.value && p8.value){
					
					
					/*When submit button is clicked then first products are added to array which works
					  as inventory and then the products are added to DOM*/
					addToArray();
					
					/* Now as the values are filled in array and to DOM so, now we can delete the form we made
					   and will rebuilt it when "Add Products" button will be reclicked*/
					d.innerHTML = '';
					
					hideTheElement(d);
					showTheElement(b);
					
					/*Now Product list should also be made visible*/
					showTheElement(list);
					showTheElement(outputDiv);
			
				}
				else{
					alert("Please insert all the values");
					
				}	

		});
        
        
		
	}
function addToArray(){
		var productObj = new Object();
		productObj.id = productID;
		productObj.name = document.getElementById('pname').value;
		productObj.price = parseInt(document.getElementById('pprice').value);
		productObj.desc =  document.getElementById('pdesc').value;
		productObj.quant = parseInt(document.getElementById('pquant').value);
		
		productObj.addedBy = AdminList[getAdminId()].name;
		productObj.date = new Date();
		productObj.active = "yes";
		productID++;
		
		products.push(productObj);
    
        updateLocalManager();
        console.log("After Adding...");
        displayArray();
		
		addToDom2();
	
}

function addToDom2(){
	
	//deleteAllDomElementsFirst();
	table.innerHTML="";
	for(var i=0;i<products.length;i++){
		if(products[i].active=="yes"){
			var r2 = document.createElement('tr');
			r2.setAttribute("id",products[i].id);
	
			var c1 = document.createElement('td');
			c1.innerHTML = products[i].name;
			r2.appendChild(c1);
	
			var c2 = document.createElement('td');
			c2.innerHTML = products[i].price;
			r2.appendChild(c2);
  
			var c4 = document.createElement('td');
			c4.innerHTML = products[i].quant;
			r2.appendChild(c4);
 
			var del = document.createElement('input');
			del.type = "button";
			del.value = "Delete";
			r2.appendChild(del);
    
			var edit = document.createElement('input');
			edit.type = "button";
			edit.value = "Edit";
			r2.appendChild(edit);
	
			table.appendChild(r2);	
    
            del.addEventListener("click",function(event){
                        SoftDeleteFromArray(event.target.parentNode);
                        event.target.parentNode.parentNode.removeChild(event.target.parentNode);
                        updateLocalManager();
        
            });
            edit.addEventListener("click",function(event){
		
		
                        editTheArray(event.target);
                        updateLocalManager();
		
	         });
	
		
		
		}
	}
}

function deleteAllDomElementsFirst(){
    table.innerHTML="";
}


function editTheArray(targetNode){
		/*To edit the array, 1. first show the form, get the product's values from the array
                             2. delete the product from array
                             3. add the updated product into the array and to dom     */
                             
    
        makeBasicForm();
		showTheElement(d);
		hideTheElement(b);
		displayArray();
		var identity = targetNode.parentNode.id;
        var index = findIndex(identity);
        
		document.getElementById('pname').value=products[index].name;
        document.getElementById('pprice').value=products[index].price;
        document.getElementById('pdesc').value=products[index].desc;
        document.getElementById('pquant').value=products[index].quant;
	   
        products[index].active="no";
	    updateLocalManager();  
        displayArray();
	    
}

function displayArray(){
    if(products.length==0)
        console.log("Product Array is empty");
    for(var i=0;i<products.length;i++)
		if(products[i].active==="yes")
			console.log("name= "+products[i].name+" id= "+products[i].id);
}

function SoftDeleteFromArray(targetNode){
	
	var id = targetNode.id;
	var indexToSoftDelete = findIndex(id);
	
	products[indexToSoftDelete].active="no";
	updateLocalManager();
}

function findIndex(id){
	
		for(var i=0;i<products.length;i++)
			if(products[i].id==id)
				return i;
		
		//If element to be deleted is not in the array itself
		return -1;
}

function updateLocalManager(){
	
	localStorage.AdminList = JSON.stringify(AdminList);
	localStorage.products = JSON.stringify(products);
	
	
}