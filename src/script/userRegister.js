let http = new XMLHttpRequest();

function userRegister() {
    let details = {
        "name" : document.querySelector(".name").value,
        "userId" : document.querySelector(".userId").value,
        "password" :document.querySelector(".password").value,
        "date" : document.querySelector(".date").value,
        "phone" : document.querySelector(".phone").value,
        "email" : document.querySelector(".email").value
    }
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
  location.href = "./../../index.html";
}
