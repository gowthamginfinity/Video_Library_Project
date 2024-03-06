const { response } = require("express");

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
  let userId = document.querySelector(".userId").value;
  let password = document.querySelector(".password").value;
  $.ajax({
    method: "get",
    url: "http://localhost:7140/get/userLogin",
    success: (details) => {
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
    },
  });
}

function adminLogin() {
  let userId = document.querySelector(".userId").value;
  let password = document.querySelector(".password").value;
  $.ajax({
    method: "get",
    url: "http://localhost:7140/get/admin/Login",
    success: (details) => {
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
    },
  });
}

function bodyload() {
  let a = sessionStorage.getItem("name_user");
  document.getElementById("nammee").innerHTML = a;
}

function saveVideos() {
  let saveVideo = {
    videoTitle: document.getElementById("videoTitle").value,
    videoDescription: document.getElementById("videoDescription").value,
    videoUrl: document.getElementById("videoUrl").value,
    categoryType: document.getElementById("categoryType").value,
  };

  $.ajax({
    method: "post",
    url: "http://localhost:7140/save/videos",
    data: saveVideo,
  });

  alert("you have successfully uploaded");
  loadVideos();
}

function loadVideos() {
  document.querySelector("tbody").innerHTML = "";

  fetch("http://localhost:7140/get/videos")
    .then((response) => {
      return response.json();
    })
    .then((detailss) => {
      detailss.map((detail) => {
        let tr = document.createElement("tr");
        tr.innerHTML = `<td>${detail.videoTitle}</td>
    <td><iframe src=${detail.videoUrl} width="250" height="150"></iframe></td>
    <td style="width:250px">
      <button class="btn btn-info" id="btnDetails" value=${detail._id} onclick="view(this)"><span class="bi bi-eye-fill"></span></button>
      <button class="btn btn-warning" id="btnEdit" value=${detail._id}   onclick="edit(this)"><span class="bi bi-pen-fill"></span></button>
      <button class="btn btn-danger" id="btnDelete" value=${detail._id}  onclick="deletee(this)"><span class="bi bi-trash-fill"></span></button>
      </td> `;
        document.querySelector("tbody").appendChild(tr);
      });
    });
}

function view(e) {
  document.querySelector("main").innerHTML = "";
  let id = e.value;
  console.log(id);
  fetch(`http://localhost:7140/view/video/${id}`)
    .then((response) => {
      return response.json();
    })
    .then((videos) => {
      videos.map((video) => {
        console.log(video);
        let div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `<div class="card-header">
    <h4 style="display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;">${video.videoTitle}</h4>
</div>
<div class="card-body">
  <iframe width="100%" src=${video.videoUrl} height="400"></iframe>
  <p style="display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;">${video.videoDescription}
  </p>
</div>
<div class="card-footer">
   ${video.videoLikes}<span class="bi bi-hand-thumbs-up"></span> ${video.videoDislikes}<span class="bi bi-hand-thumbs-down"></span> ${video.videoViews} views
</div>`;
        document.getElementById("mainn").appendChild(div);
      });
    });
}

function edit(e) {
  document.querySelector("main").innerHTML = "";
  let id = e.value;
  fetch(`http://localhost:7140/view/video/${id}`)
    .then((response) => {
      return response.json();
    })
    .then((videos) => {
      videos.map((video) => {
        let div = document.createElement("div");
        div.innerHTML = `<h3>Edit Video</h3>
      <dl>
        <dt>Video Title</dt>
        <dd><textarea id="EvideoTitle" class="form-control">${video.videoTitle}</textarea></dd>
        <dt>Video Url</dt>
        <dd><input type="text" value=${video.videoUrl} id="EvideoUrl" class="form-control"></dd>
        <dt>Video Description</dt>
        <dd><textarea id="EvideoDescription" class="form-control">${video.videoDescription}</textarea></dd>
        <dt>Category Id</dt>
        <dd><select id="EcategoryType" class="form-select">
        <option>Educational Videos</option>
                      <option>Entertainment Videos</option>
                      <option>Documentaries</option>
                      <option>News and Current Affairs</option>
                      <option>Tutorials and How-to Videos</option>
                      <option>Product Reviews and Unboxings</option>
                      <option>Vlogs (Video Blogs)</option>
                      <option>Gaming Videos</option>
                      <option>Music Videos</option>
                      <option>Fitness and Health Videos</option>
                      <option>Cooking and Food Videos</option>
                      <option>Travel Videos</option>
                      <option>Animation and Animated Stories</option>
                      <option>Science and Technology Videos</option>
                      <option>Sports and Recreation Videos</option>
                      <option>Motivational and Inspirational Videos</option>
                      <option>Beauty and Fashion Videos</option>
                      <option>DIY and Crafting Videos</option>
                      <option>Business and Marketing Videos</option>
                      <option>Kids and Family Videos</option>
          </select>
          </dd>
        </dl>
        <button id="saveEdit" class="btn btn-success" value=${video._id} onclick="saveEdit(this)">Save</button>`;
        document.getElementById("mainn").appendChild(div);
      });
    });
}

function deletee(e) {
  let id = e.value;
  console.log(id);
  $.ajax({
    method: "delete",
    url: `http://localhost:7140/delete/video/${id}`,
  });
  alert("Video Deleted");
  loadVideos();
}
function saveEdit(e) {
  let id = e.value;
  let saveVideo = {
    videoTitle: document.getElementById("EvideoTitle").value,
    videoDescription: document.getElementById("EvideoDescription").value,
    videoUrl: document.getElementById("EvideoUrl").value,
    categoryType: document.getElementById("EcategoryType").value,
  };
  $.ajax({
    method: "put",
    url: `http://localhost:7140/save/edit/video/${id}`,
    data: saveVideo,
  });
  alert("Video Updated Successfully");
}

function videoLoad() {
  document.getElementById("namme").innerHTML = sessionStorage.getItem("name_admin");
  loadVideos();
}

function signOut() {
  sessionStorage.removeItem("name_admin");
  location.href = "./adminLogin.html";
}

function userHomeBodyload() {
  document.getElementById("namme").innerHTML = sessionStorage.getItem("name_admin");
  document.querySelector("main").innerHTML = "";
  fetch("http://localhost:7140/get/videos")
    .then((response) => {
      return response.json();
    })
    .then((details) => {
      console.log(details);
      details.map((detail) => {
        let div = document.createElement("div");
        div.className = "dynamicDiv";
        div.innerHTML = ` <iframe width="600" height="400" src=${detail.videoUrl}></iframe>
        <h4>${detail.videoTitle}</h4>
        <p style="display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden; ">${detail.videoDescription}</p>`;
        document.querySelector("main").appendChild(div);
      });
    });
}
function userSignOut(){
  sessionStorage.removeItem("name_user");
  location.href = "./../../index.html";
}