var form = document.forms[0]
var xhr = new XMLHttpRequest()
xhr.responseType = "json"
let url = "http://ec23-43-224-111-192.ngrok.io"

document.getElementsByTagName("button")[0].addEventListener("click", (event) => {
    event.preventDefault()
    var dept = form["department"].value.split(",")
    dept = dept.map((_dept) => {
        return _dept.trim()
    })
    var data = {
        "brandName": form["brand_name"].value,
        "genericName": form["generic_name"].value,
        "medType": form["med_type"].value,
        "weight": form["weight"].value,
        "unitPrice": form["unit_price"].value,
        "perPage": form["per_leaf"].value,
        "pagePrice": form["leaf_price"].value,
        "department": dept
    }
    xhr.onload = () => {
        if(xhr.readyState == 4 && xhr.status == 200){
            alert("Submitted")
        }
        else{
            alert("Data Submission Failed")
        }
    }
    xhr.open("POST", url + "/pharmaceuticals/addMedicine")
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.setRequestHeader("Authorization", JSON.parse(sessionStorage.getItem("pharmaceutical_data"))["token"])
    xhr.send(JSON.stringify(data))
})
function log_out(event){
    if(event.childNodes[0].tagName == "IMG"){
        sessionStorage.removeItem("pharmaceutical_data")
        window.location = "/front_end/pharmaceutical/html/login.html"
    }
    return false
}