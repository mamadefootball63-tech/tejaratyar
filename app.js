if (!localStorage.user) {
localStorage.user = "admin";
localStorage.pass = "1234";
}

let products = JSON.parse(localStorage.products || "[]");
let customers = JSON.parse(localStorage.customers || "[]");
let invoices = JSON.parse(localStorage.invoices || "[]");

function login() {
const user = document.getElementById("u").value;
const pass = document.getElementById("p").value;

if (user === localStorage.user && pass === localStorage.pass) {
document.getElementById("login").style.display = "none";
document.getElementById("app").style.display = "block";
render();
} else {
alert("نام کاربری یا رمز اشتباه است");
}
}

function showTab(id) {
document.querySelectorAll("section").forEach(s => s.classList.add("hidden"));
const tab = document.getElementById(id);
if(tab) tab.classList.remove("hidden");
}

function save() {
localStorage.products = JSON.stringify(products);
localStorage.customers = JSON.stringify(customers);
localStorage.invoices = JSON.stringify(invoices);
}

/* مدیریت کالاها */
function addProduct() {
const name = document.getElementById("pn").value;
const price = document.getElementById("pp").value;
const qty = document.getElementById("pq").value;
if(!name) return;

products.push({name, price, qty});
document.getElementById("pn").value="";
document.getElementById("pp").value="";
document.getElementById("pq").value="";
save();
render();
}

function deleteProduct(index){
if(confirm("کالا حذف شود؟")){
products.splice(index,1);
save();
render();
}
}

/* مدیریت مشتریان */
function addCustomer(){
const name = document.getElementById("cn").value;
if(!name) return;
customers.push({name});
document.getElementById("cn").value="";
save();
render();
}

function deleteCustomer(index){
if(confirm("مشتری حذف شود؟")){
customers.splice(index,1);
save();
render();
}
}

/* مدیریت فاکتورها */
function addInvoice(){
const name = document.getElementById("iname").value;
if(!name) return;
invoices.push({name});
document.getElementById("iname").value="";
save();
render();
}

function deleteInvoice(index){
if(confirm("فاکتور حذف شود؟")){
invoices.splice(index,1);
save();
render();
}
}

/* بکاپ */
function downloadBackup(){
const data = {products, customers, invoices};
const blob = new Blob([JSON.stringify(data,null,2)], {type:"application/json"});
const a = document.createElement("a");
a.href = URL.createObjectURL(blob);
a.download = "tejaratyar-backup.json";
a.click();
}

function restoreBackup(event){
const file = event.target.files[0];
if(!file) return;
const reader = new FileReader();
reader.onload = function(e){
const data = JSON.parse(e.target.result);
products = data.products||[];
customers = data.customers||[];
invoices = data.invoices||[];
save();
render();
alert("بازیابی با موفقیت انجام شد");
};
reader.readAsText(file);
}

/* Render همه بخش‌ها */
function render(){
const plist = document.getElementById("plist");
const clist = document.getElementById("clist");
const ilist = document.getElementById("ilist");
const pc = document.getElementById("pc");
const cc = document.getElementById("cc");
const ic = document.getElementById("ic");

const inventoryValue = document.getElementById("inventoryValue");

const reportProducts = document.getElementById("reportProducts");
const reportCustomers = document.getElementById("reportCustomers");
const reportInvoices = document.getElementById("reportInvoices");
const reportInventoryValue = document.getElementById("reportInventoryValue");

if(plist){
plist.innerHTML = products.map((p,i)=>" <li> 📦 ${p.name}<br> 💰 قیمت: ${p.price||0}<br> 📊 موجودی: ${p.qty||0}<br><br> <button onclick="deleteProduct(${i})">🗑 حذف</button> </li>").join("");
}

if(clist){
clist.innerHTML = customers.map((c,i)=>" <li> 👤 ${c.name}<br><br> <button onclick="deleteCustomer(${i})">🗑 حذف</button> </li>").join("");
}

if(ilist){
ilist.innerHTML = invoices.map((i,index)=>" <li> 🧾 ${i.name}<br><br> <button onclick="deleteInvoice(${index})">🗑 حذف</button> </li>").join("");
}

/* محاسبه ارزش انبار /
let totalInventory = 0;
products.forEach(p=>{
totalInventory += (Number(p.price)||0)(Number(p.qty)||0);
});
if(inventoryValue) inventoryValue.textContent = totalInventory.toLocaleString("fa-IR");
if(reportInventoryValue) reportInventoryValue.textContent = totalInventory.toLocaleString("fa-IR");

/* آپدیت آمار گزارشات */
if(pc) pc.textContent = products.length;
if(cc) cc.textContent = customers.length;
if(ic) ic.textContent = invoices.length;
if(reportProducts) reportProducts.textContent = products.length;
if(reportCustomers) reportCustomers.textContent = customers.length;
if(reportInvoices) reportInvoices.textContent = invoices.length;
}

render();

/* Service Worker */
if("serviceWorker" in navigator){
window.addEventListener("load",()=>{
navigator.serviceWorker.register("./service-worker.js")
.then(()=>console.log("Service Worker Registered"))
.catch(err=>console.log("SW Error:",err));
});
  }
