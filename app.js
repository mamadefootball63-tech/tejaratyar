// ===== TejaratYar V5.7 =====

// کاربران
if(!localStorage.users){
localStorage.users=JSON.stringify([
{
username:"admin",
password:"1234"
}
]);
}

// داده ها
let products=JSON.parse(localStorage.products||"[]");
let customers=JSON.parse(localStorage.customers||"[]");
let invoices=JSON.parse(localStorage.invoices||"[]");

// ثبت نام
function register(){

const username=prompt("نام کاربری");
if(!username) return;

const password=prompt("رمز عبور");
if(!password) return;

let users=JSON.parse(localStorage.users);

if(users.find(u=>u.username===username)){
alert("این نام کاربری وجود دارد");
return;
}

users.push({
username,
password
});

localStorage.users=JSON.stringify(users);

alert("ثبت نام موفق بود");

}

// ورود
function login(){

const username=document.getElementById("u").value;
const password=document.getElementById("p").value;

let users=JSON.parse(localStorage.users);

const user=users.find(
u=>u.username===username &&
u.password===password
);

if(user){

localStorage.currentUser=username;

document.getElementById("login").style.display="none";
document.getElementById("app").style.display="block";

render();

}else{

alert("نام کاربری یا رمز اشتباه است");

}

}

// خروج
function logout(){

localStorage.removeItem("currentUser");
location.reload();

}

// تب ها
function showTab(id){

document.querySelectorAll("section")
.forEach(el=>el.classList.add("hidden"));

const tab=document.getElementById(id);

if(tab){
tab.classList.remove("hidden");
}

}

// ذخیره
function save(){

localStorage.products=JSON.stringify(products);
localStorage.customers=JSON.stringify(customers);
localStorage.invoices=JSON.stringify(invoices);

}

// کالا
function addProduct(){

const name=document.getElementById("pn").value;
const price=Number(document.getElementById("pp").value);
const qty=Number(document.getElementById("pq").value);

if(!name) return;

products.push({
name,
price,
qty
});

save();
render();

document.getElementById("pn").value="";
document.getElementById("pp").value="";
document.getElementById("pq").value="";

}

// مشتری
function addCustomer(){

const name=document.getElementById("cn").value;

if(!name) return;

customers.push({
name
});

save();
render();

document.getElementById("cn").value="";

}

// فاکتور
function addInvoice(){

const name=document.getElementById("iname").value;

if(!name) return;

invoices.push({
name
});

save();
render();

document.getElementById("iname").value="";

}

// چاپ
function printReports(){

window.print();

}

// رندر
function render(){

const pc=document.getElementById("pc");
const cc=document.getElementById("cc");
const ic=document.getElementById("ic");

if(pc) pc.textContent=products.length;
if(cc) cc.textContent=customers.length;
if(ic) ic.textContent=invoices.length;

// ارزش انبار
let totalInventory=0;

products.forEach(p=>{

totalInventory+=
(Number(p.price)||0)*
(Number(p.qty)||0);

});

const inventoryValue=
document.getElementById("inventoryValue");

if(inventoryValue){
inventoryValue.textContent=
totalInventory.toLocaleString("fa-IR");
}

const reportInventoryValue=
document.getElementById("reportInventoryValue");

if(reportInventoryValue){
reportInventoryValue.textContent=
totalInventory.toLocaleString("fa-IR");
}

const reportProducts=
document.getElementById("reportProducts");

const reportCustomers=
document.getElementById("reportCustomers");

const reportInvoices=
document.getElementById("reportInvoices");

if(reportProducts){
reportProducts.textContent=
products.length;
}

if(reportCustomers){
reportCustomers.textContent=
customers.length;
}

if(reportInvoices){
reportInvoices.textContent=
invoices.length;
}

const plist=document.getElementById("plist");

if(plist){

plist.innerHTML=products.map(p=>`

<li>
📦 ${p.name}
<br>
💰 ${p.price}
<br>
📊 ${p.qty}
</li>
`).join("");}

const clist=document.getElementById("clist");

if(clist){

clist.innerHTML=customers.map(c=>`

<li>
👤 ${c.name}
</li>
`).join("");}

const ilist=document.getElementById("ilist");

if(ilist){

ilist.innerHTML=invoices.map(i=>`

<li>
🧾 ${i.name}
</li>
`).join("");}

}

// ورود خودکار
window.onload=function(){

if(localStorage.currentUser){

document.getElementById("login").style.display="none";
document.getElementById("app").style.display="block";

render();

}

};
