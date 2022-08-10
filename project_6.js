console.log("postmaster project 6");

// initailly no of perameter
const perametercount = 0;

//create div
function createDiv(string) {
  let div = document.createElement("div");
  div.innerHTML = string;
  console.log(div.firstElementChild);
  return div.firstElementChild;
}
// hide perameter box initally

let perameterbox = document.getElementById("perameterbox");
perameterbox.style.display = "none";

let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener("click", () => {
  document.getElementById("Requestjsonbox").style.display = "block";
  document.getElementById("perameterbox").style.display = "none";
});

let peramRadio = document.getElementById("paramsRadio");
peramRadio.addEventListener("click", () => {
  document.getElementById("Requestjsonbox").style.display = "none";
  document.getElementById("perameterbox").style.display = "block";
});

// create multiple perameter boxes if you click  + on the button

let addParam = document.getElementById("addparams");
addParam.addEventListener("click", () => {
  let addNewparam = document.getElementById("peramNew");
  let string = `<div class="row my-3 perarow">
                    <label for="perabox" class="col-sm-2 col-form-label">PERAMETER${
                      perametercount + 2
                    }</label>
                <div class="col-md-3">
                     <input type="text" class="form-control" id="perameterkey${
                       perametercount + 2
                     }" placeholder="perameterkey${
    perametercount + 2
  }" aria-label="perameterkey${perametercount + 2}">
                </div>
               <div class="col-md-3">
                     <input type="text" class="form-control" id="perametervalue${
                       perametercount + 2
                     }" placeholder="perametervalue${
    perametercount + 2
  }" aria-label="perametervalue${perametercount + 2}">
                </div>
                 <button  class="btn btn-primary col-sm-1 deleteparams">-</button>
                </div>`;

  // addNewparam.innerHTML+=string;
  let parentEle = createDiv(string);
  addNewparam.appendChild(parentEle);

  // Add an event listener to remove the parameter on clicking - button
  let deleteParam = document.getElementsByClassName("deleteparams");
  for (const item of deleteParam) {
    //  console.log(item);
    item.addEventListener("click", (e) => {
      e.target.parentElement.remove();
    });
  }
  perametercount++;
});

// If user click on submit button
let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
  // Show please wait in the response box to request patience from the user
  document.getElementById("resposePrism").innerHTML =
    "Pleace Wait... Fatching your Response...";

  let url = document.getElementById("url").value;
  let Requesttype = document.querySelector(
    "input[name='requestType']:checked"
  ).value;
  let Ctype = document.querySelector("input[name='contentType']:checked").value;

  console.log(url);
  console.log(Requesttype);
  console.log(Ctype);

  // if user has used param option insted of json , so collact all the peramter in object
  if (Ctype == "params") {
    data = {};
    for (let i = 0; i < perametercount + 1; i++) {
      let key = document.getElementById("perameterkey" + (i + 1)).value;
      let val = document.getElementById("perametervalue" + (i + 1)).value;
      data[key] = val;
    }
    data = JSON.stringify(data);
    console.log(data);
  } else {
    data = document.getElementById("requestjsontext").value;
    console.log(data);
  }

  /// if you click on request type , you can get & post data from server

  if (Requesttype == "GET") {
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.text())
      .then((text) => {
        document.getElementById("resposePrism").innerHTML = text;
        Prism.highlightAll();
      });
  } else {
    fetch(url, {
      method: "POST",
      body: data,
      headers: {
        "content-type": "appliction/json; charset=UTF-8",
      },
    })
      .then((response) => response.text())
      .then((text) => {
        document.getElementById("resposePrism").innerHTML = text;
        Prism.highlightAll();
      });
  }
});
