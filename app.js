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

/* اصلاح اطلاعات قدیمی */
products = products.map(p => ({
name: p.name || "",
price: parseFloat(p.price) || 0,
qty: parseFloat(p.qty) || 0
}));

if(plist){
plist.innerHTML = products.map((p,i)=>"<li> 📦 ${p.name}<br> 💰 قیمت: ${p.price}<br> 📊 موجودی: ${p.qty}<br><br> <button onclick="deleteProduct(${i})">🗑 حذف</button> </li>").join("");
}

if(clist){
clist.innerHTML = customers.map((c,i)=>"<li> 👤 ${c.name}<br><br> <button onclick="deleteCustomer(${i})">🗑 حذف</button> </li>").join("");
}

if(ilist){
ilist.innerHTML = invoices.map((inv,i)=>"<li> 🧾 ${inv.name}<br><br> <button onclick="deleteInvoice(${i})">🗑 حذف</button> </li>").join("");
}

/* محاسبه ارزش انبار */
let totalInventory = products.reduce((sum,p)=>{
return sum + (p.price * p.qty);
},0);

if(inventoryValue){
inventoryValue.textContent =
totalInventory.toLocaleString("fa-IR");
}

if(reportInventoryValue){
reportInventoryValue.textContent =
totalInventory.toLocaleString("fa-IR");
}

if(pc) pc.textContent = products.length;
if(cc) cc.textContent = customers.length;
if(ic) ic.textContent = invoices.length;

if(reportProducts) reportProducts.textContent = products.length;
if(reportCustomers) reportCustomers.textContent = customers.length;
if(reportInvoices) reportInvoices.textContent = invoices.length;
}
