
if(!localStorage.user){localStorage.user='admin';localStorage.pass='1234';}
let products=JSON.parse(localStorage.products||'[]');
let customers=JSON.parse(localStorage.customers||'[]');
let invoices=JSON.parse(localStorage.invoices||'[]');
function login(){if(u.value===localStorage.user&&p.value===localStorage.pass){login.style.display='none';app.style.display='block';render();}}
function showTab(id){document.querySelectorAll('section').forEach(x=>x.classList.add('hidden'));document.getElementById(id).classList.remove('hidden');}
function save(){localStorage.products=JSON.stringify(products);localStorage.customers=JSON.stringify(customers);localStorage.invoices=JSON.stringify(invoices);}
function addProduct(){products.push({name:pn.value,price:pp.value});save();render();}
function addCustomer(){customers.push({name:cn.value});save();render();}
function addInvoice(){invoices.push({name:iname.value,amount:Number(iamount.value||0)});save();render();}
function render(){
plist.innerHTML=products.map(x=>`<li>${x.name} - ${x.price}</li>`).join('');
clist.innerHTML=customers.map(x=>`<li>${x.name}</li>`).join('');
ilist.innerHTML=invoices.map(x=>`<li>${x.name} - ${x.amount}</li>`).join('');
pc.textContent=products.length; cc.textContent=customers.length;
}
