// V5.6 - TejaratYar

if (!localStorage.user) {
  localStorage.user = "admin";
  localStorage.pass = "1234";
}

let products = JSON.parse(localStorage.products || "[]");
let customers = JSON.parse(localStorage.customers || "[]");
let invoices = JSON.parse(localStorage.invoices || "[]");

/* ثبت‌نام */
function register() {
  const user = prompt("نام کاربری خود را وارد کنید:");
  const pass = prompt("رمز عبور خود را وارد کنید:");
  if(user && pass){
    localStorage.user = user;
    localStorage.pass = pass;
    alert("ثبت‌نام با موفقیت انجام شد. حالا وارد شوید.");
  }
}

/* ورود */
function login() {
  const user = document.getElementById("u").value;
  const pass = document.getElementById("p").value;

  if(user === localStorage.user && pass === localStorage.pass){
    document.getElementById("login").style.display="none";
    document.getElementById("app").style.display="block";
    render();
  } else {
    alert("نام کاربری یا رمز اشتباه است");
  }
}

/* نمایش تب‌ها */
function showTab(id){
  document.querySelectorAll("section").forEach(s => s.classList.add("hidden"));
  const tab = document.getElementById(id);
  if(tab) tab.classList.remove("hidden");
}

/* ذخیره اطلاعات */
function save(){
  localStorage.products = JSON.stringify(products);
  localStorage.customers = JSON.stringify(customers);
  localStorage.invoices = JSON.stringify(invoices);
}

/* مدیریت کالاها */
function addProduct(){
  const name = document.getElementById("pn").value;
  const price = Number(document.getElementById("pp").value);
  const qty = Number(document.getElementById("pq").value);
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

/* بکاپ و بازیابی */
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

/* پرینت گزارشات */
function printReports(){
  let printWindow = window.open('','PRINT','height=600,width=800');
  let html = `<h1>گزارشات TejaratYar V5.6</h1>`;
  html += `<h3>کالاها (${products.length})</h3><ul>`;
  products.forEach(p=> html += `<li>${p.name} - قیمت: ${p.price} - موجودی: ${p.qty}</li>`);
  html += `</ul><h3>مشتریان (${customers.length})</h3><ul>`;
  customers.forEach(c=> html += `<li>${c.name}</li>`);
  html += `</ul><h3>فاکتورها (${invoices.length})</h3><ul>`;
  invoices.forEach(i=> html += `<li>${i.name}</li>`);
  html += `</ul>`;
  let totalInventory = 0;
  products.forEach(p => totalInventory += (p.price||0)*(p.qty||0));
  html += `<h3>💰 ارزش کل انبار: ${totalInventory.toLocaleString("fa-IR")}</h3>`;
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
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

  if(plist) plist.innerHTML = products.map((p,i)=>`
    <li>📦 ${p.name}<br>💰 قیمت: ${p.price||0}<br>📊 موجودی: ${p.qty||0}<br><br>
    <button onclick="deleteProduct(${i})">🗑 حذف</button></li>`).join("");

  if(clist) clist.innerHTML = customers.map((c,i)=>`
    <li>👤 ${c.name}<br><br>
    <button onclick="deleteCustomer(${i})">🗑 حذف</button></li>`).join("");

  if(ilist) ilist.innerHTML = invoices.map((i,index)=>`
    <li>🧾 ${i.name}<br><br>
    <button onclick="deleteInvoice(${index})">🗑 حذف</button></li>`).join("");

  let totalInventory = 0;
  products.forEach(p => totalInventory += (Number(p.price)||0)*(Number(p.qty)||0));
  if(inventoryValue) inventoryValue.textContent = totalInventory.toLocaleString("fa-IR");
  if(reportInventoryValue) reportInventoryValue.textContent = totalInventory.toLocaleString("fa-IR");

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
  window.addEventListener("load", async () => {
    // پاک کردن Service Worker قدیمی
    const regs = await navigator.serviceWorker.getRegistrations();
    for(let reg of regs) await reg.unregister();
    // ثبت Service Worker جدید
    navigator.serviceWorker.register("./service-worker.js")
      .then(()=>console.log("Service Worker updated and registered"))
      .catch(err=>console.log("SW Error:",err));
  });
}
