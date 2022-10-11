let inptField = document.querySelector(".taskEnter input");
let sbmtBtn = document.querySelector(".taskEnter button");
let emptyText = document.querySelector(".empty");
let list = document.querySelector(".list");
// let listLis = document.querySelectorAll(".list li");
let activeNum = document.querySelector("#activeNum");
let clearBtn = document.querySelector("#clearCompleted");
// let checks = document.querySelectorAll("li input");
let tabsUl = document.querySelector(".tabs");
let tabsLis = document.querySelectorAll("li");

document.onload = loadActive();

var activeArr = [];
var completedArr = [];

function loadActive() {
  if (localStorage.getItem("activeLocal") == null) {
    window.localStorage.setItem("activeLocal", "[]");
    activeArr = window.localStorage.getItem("activeLocal");
    window.localStorage.setItem("completedLocal", "[]");
    completedArr = window.localStorage.getItem("completedLocal");
    loadCompleted();

    activeCounter();
    emptyCheck();
    return;
  } else if (localStorage.getItem("activeLocal") == "[]") {
    loadCompleted();

    activeCounter();
    emptyCheck();
    return;
  } else {
    activeArr = window.localStorage.getItem("activeLocal");
    loadCompleted();
    loadContent();
    activeCounter();
    emptyCheck();
  }
  loadCompleted();
  return;
}
// loadActive();

function loadCompleted() {
  if (localStorage.getItem("completedLocal") == null) {
    window.localStorage.setItem("completedLocal", "[]");
    return;
  } else {
    completedArr = window.localStorage.getItem("completedLocal");

    loadContent();
    return;
  }
}
// loadCompleted();

function loadContent() {
  let list = document.querySelector(".list");
  list.innerHTML = "";

  var activeArr = JSON.parse(window.localStorage.getItem("activeLocal"));
  var completedArr = JSON.parse(window.localStorage.getItem("completedLocal"));

  for (let i = 0; i < activeArr.length; i++) {
    let task = document.createElement("li");
    task.innerHTML = `<input type="checkbox" />${activeArr[i]}`;
    list.appendChild(task);
  }
  for (let i = 0; i < completedArr.length; i++) {
    let task = document.createElement("li");
    task.classList.add("completed");
    task.innerHTML = `<input type="checkbox" checked />${completedArr[i]}`;
    list.appendChild(task);
  }
  activeCounter();
  checks = document.querySelectorAll("li input");
}

function emptyCheck() {
  let listLis = document.querySelectorAll(".list li");
  if (
    localStorage.getItem("activeLocal") == null &&
    localStorage.getItem("completedLocal") == null
  ) {
    emptyText.classList.add("active");
  } else if (
    localStorage.getItem("activeLocal") == "[]" &&
    localStorage.getItem("completedLocal") == "[]"
  ) {
    emptyText.classList.add("active");
  } else {
    emptyText.classList.remove("active");
  }
}

sbmtBtn.addEventListener("click", function () {
  if (inptField.value == "") {
    alert(`Please type something`);
    loadContent();
  } else if (
    JSON.parse(localStorage.getItem("activeLocal")).includes(inptField.value)
  ) {
    alert(`Already exists`);
    loadContent();
  } else {
    emptyText.classList.remove("active");
    activeArr = JSON.parse(window.localStorage.getItem("activeLocal"));
    activeArr.push(inptField.value);
    window.localStorage.setItem("activeLocal", JSON.stringify(activeArr));
    inptField.value = "";
    loadActive();
    loadCompleted();
    loadContent();
    checks = document.querySelectorAll("li input");
    // ------------------------------------------------------------------------
    checking();
  }
  inptField.focus();

  return;
});

// document.querySelectorAll("li input").forEach(function (check) {
//   check.addEventListener("click", function () {
//     activeArr = JSON.parse(window.localStorage.getItem("activeLocal"));
//     completedArr = JSON.parse(window.localStorage.getItem("completedLocal"));

//     if (check.checked) {
//       this.parentElement.classList.add("completed");

//       completedArr.push(check.nextSibling.textContent);
//       window.localStorage.setItem(
//         "completedLocal",
//         JSON.stringify(completedArr)
//       );

//       activeArr = activeArr.filter(
//         (e) => e !== String(check.nextSibling.textContent)
//       );
//       window.localStorage.setItem("activeLocal", JSON.stringify(activeArr));
//       activeCounter();
//       //   checks = document.querySelectorAll("li input");
//       return;
//     } else {
//       this.parentElement.classList.remove("completed");
//       activeArr.push(check.nextSibling.textContent);
//       window.localStorage.setItem("activeLocal", JSON.stringify(activeArr));
//       completedArr = completedArr.filter(
//         (e) => e !== String(check.nextSibling.textContent)
//       );
//       window.localStorage.setItem(
//         "completedLocal",
//         JSON.stringify(completedArr)
//       );
//       //   checks = document.querySelectorAll("li input");
//       activeCounter();
//     }
//   });
// });
checking();

function activeCounter() {
  let activeNumber = JSON.parse(localStorage.getItem("activeLocal")).length;
  activeNum.innerHTML = `${activeNumber} tasks left`;
}

tabsLis.forEach(function (tabLi) {
  tabLi.addEventListener("click", function () {
    tabsLis.forEach(function (item) {
      item.classList.remove("active");
    });
    this.classList.add("active");
    if (this.getAttribute("id") == "all") {
      emptyText.classList.remove("active");
      list.innerHTML = "";
      loadActive();
      checking();
    } else if (this.getAttribute("id") == "active") {
      if (
        localStorage.getItem("activeLocal") == null ||
        localStorage.getItem("activeLocal") == "[]"
      ) {
        emptyText.classList.add("active");
        list.innerHTML = ``;
      } else {
        checks = document.querySelectorAll("li input");
        emptyText.classList.remove("active");
        let activeArr = JSON.parse(window.localStorage.getItem("activeLocal"));
        list.innerHTML = "";
        for (let i = 0; i < activeArr.length; i++) {
          let task = document.createElement("li");
          task.innerHTML = `<input type="checkbox" />${activeArr[i]}`;
          list.appendChild(task);
        }
        // -----------------------------------------------
      }
      checking();
    } else {
      if (
        localStorage.getItem("completedLocal") == null ||
        localStorage.getItem("completedLocal") == "[]"
      ) {
        emptyText.classList.add("active");
        list.innerHTML = "";
      } else {
        emptyText.classList.remove("active");
        let completedArr = JSON.parse(
          window.localStorage.getItem("completedLocal")
        );
        list.innerHTML = "";
        for (let i = 0; i < completedArr.length; i++) {
          let task = document.createElement("li");
          task.classList.add("completed");
          task.innerHTML = `<input type="checkbox" checked />${completedArr[i]}`;
          list.appendChild(task);
        }
      }
      checking();
    }
  });
});

clearBtn.addEventListener("click", function () {
  window.localStorage.setItem("completedLocal", "[]");
  tabsLis.forEach(function (tab) {
    tab.classList.remove("active");
  });
  document.querySelector("#all").classList.add("active");
  loadActive();
});

function checking() {
  document.querySelectorAll("li input").forEach(function (check) {
    check.addEventListener("click", function () {
      activeArr = JSON.parse(window.localStorage.getItem("activeLocal"));
      completedArr = JSON.parse(window.localStorage.getItem("completedLocal"));

      if (check.checked) {
        this.parentElement.classList.add("completed");

        completedArr.push(check.nextSibling.textContent);
        window.localStorage.setItem(
          "completedLocal",
          JSON.stringify(completedArr)
        );

        activeArr = activeArr.filter(
          (e) => e !== String(check.nextSibling.textContent)
        );
        window.localStorage.setItem("activeLocal", JSON.stringify(activeArr));
        activeCounter();
        return;
      } else {
        this.parentElement.classList.remove("completed");
        activeArr.push(check.nextSibling.textContent);
        window.localStorage.setItem("activeLocal", JSON.stringify(activeArr));
        completedArr = completedArr.filter(
          (e) => e !== String(check.nextSibling.textContent)
        );
        window.localStorage.setItem(
          "completedLocal",
          JSON.stringify(completedArr)
        );
        activeCounter();
      }
    });
  });
}
checking();
