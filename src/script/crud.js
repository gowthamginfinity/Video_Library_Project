let http = new XMLHttpRequest();
function userRegister() {
  let details = {
    name: document.querySelector(".name").value,
    userId: document.querySelector(".userId").value,
    password: document.querySelector(".password").value,
    date: document.querySelector(".date").value,
    phone: document.querySelector(".phone").value,
    email: document.querySelector(".email").value,
  };
  http.open("POST", "http://localhost:7140/submit/register", true);

  http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  http.onload = function () {
    if (http.status >= 200 && http.status < 300) {
      console.log(JSON.parse(http.responseText));
    } else {
      console.error(http.statusText);
    }
  };
  http.onerror = function () {
    console.error(http.statusText);
  };
  http.send(JSON.stringify(details));

  alert("you have successfully registered");
  window.location.href = "./../../index.html";
}

function userLogin() {
  http.open("get", "http://localhost:7140/get/userLogin", true);
  http.send();
  http.onreadystatechange = function () {
    if (http.readyState == 4) {
      let details = JSON.parse(http.responseText);
      let userId = document.querySelector(".userId").value;
      let password = document.querySelector(".password").value;
      console.log(details);
      for (let detail of details) {
        if (detail.userId === userId && detail.password === password) {
          sessionStorage.setItem("name_user", detail.name);
          document.getElementById("error").innerHTML = ``;
          location.href = "public/html/userHome.html";
          break;
        } else {
          document.getElementById("error").innerHTML = `Invalid User Id or Password`;
        }
      }
    }
  };
}

function adminLogin() {
  http.open("get", "http://localhost:7140/get/admin/Login", true);
  http.send();
  http.onreadystatechange = function () {
    if (http.readyState == 4) {
      let details = JSON.parse(http.responseText);
      let userId = document.querySelector(".userId").value;
      let password = document.querySelector(".password").value;
      for (let detail of details) {
        if (detail.userId === userId && detail.password === password) {
          sessionStorage.setItem("name_admin", detail.name);
          location.href = "./../../public/html/adminHome.html";
          document.getElementById("error").innerHTML = ``;

          break;
        } else {
          document.getElementById("error").innerHTML = `Invalid User Id or Password`;
        }
      }
    }
  };
}

function bodyload() {
  let a = sessionStorage.getItem("name_user");
  document.getElementById("nammee").innerHTML = a;
}
