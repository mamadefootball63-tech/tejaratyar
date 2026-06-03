/* ===== V5.7 Multi User ===== */

if(!localStorage.users){
localStorage.users = JSON.stringify([
{
username:"admin",
password:"1234"
}
]);
}

function register(){

const username = prompt("نام کاربری");

if(!username) return;

const password = prompt("رمز عبور");

if(!password) return;

let users = JSON.parse(localStorage.users);

const exists = users.find(
u => u.username === username
);

if(exists){
alert("این کاربر قبلاً ثبت شده است");
return;
}

users.push({
username,
password
});

localStorage.users = JSON.stringify(users);

alert("ثبت نام موفق بود");
}

function login(){

const username =
document.getElementById("u").value;

const password =
document.getElementById("p").value;

let users =
JSON.parse(localStorage.users);

const user = users.find(
u =>
u.username === username &&
u.password === password
);

if(user){

localStorage.currentUser =
  username;

document.getElementById("login").style.display =
  "none";

document.getElementById("app").style.display =
  "block";

render();

}else{

alert("نام کاربری یا رمز اشتباه است");

}
}

function logout(){

localStorage.removeItem("currentUser");

location.reload();

}
