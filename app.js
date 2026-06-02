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
  document.querySelectorAll("section").forEach(s => {
    s.classList.add("hidden");
  });

  document.getElementById(id).classList.remove("hidden");
}

function save() {
  localStorage.products = JSON.stringify(products);
  localStorage.customers = JSON.stringify(customers);
  localStorage.invoices = JSON.stringify(invoices);
}

function addProduct() {
  const name = document.getElementById("pn").value;

  if (!name) return;

  products.push({
    name: name
  });

  document.getElementById("pn").value = "";

  save();
  render();
}

function addCustomer() {
  const name = document.getElementById("cn").value;

  if (!name) return;

  customers.push({
    name: name
  });

  document.getElementById("cn").value = "";

  save();
  render();
}

function addInvoice() {
  const name = document.getElementById("iname").value;

  if (!name) return;

  invoices.push({
    name: name
  });

  document.getElementById("iname").value = "";

  save();
  render();
}

function render() {

  const plist = document.getElementById("plist");
  const clist = document.getElementById("clist");
  const ilist = document.getElementById("ilist");

  const pc = document.getElementById("pc");
  const cc = document.getElementById("cc");
  const ic = document.getElementById("ic");

  if (plist) {
    plist.innerHTML = products
      .map(p => `<li>${p.name}</li>`)
      .join("");
  }

  if (clist) {
    clist.innerHTML = customers
      .map(c => `<li>${c.name}</li>`)
      .join("");
  }

  if (ilist) {
    ilist.innerHTML = invoices
      .map(i => `<li>${i.name}</li>`)
      .join("");
  }

  if (pc) pc.textContent = products.length;
  if (cc) cc.textContent = customers.length;
  if (ic) ic.textContent = invoices.length;
}
