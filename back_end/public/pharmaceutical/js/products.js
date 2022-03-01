var xhr = new XMLHttpRequest()
xhr.responseType = "json"
let url = "http://3d94-43-224-111-192.ngrok.io"

let user_data = JSON.parse(sessionStorage.getItem("pharmaceutical_data"))
var tbody = document.getElementsByTagName("tbody")[0]

xhr.onload = () => {
    if(xhr.readyState == 4 && xhr.status == 200){
        for(var i of xhr.response){
            add_row(i)
        }
    }
}
xhr.open("GET", url + "/pharmaceuticals/products")
xhr.setRequestHeader("Authorization", user_data["token"])
xhr.send()

function add_row(_data_available){
    var row = tbody.insertRow()

    var cell_1 = row.insertCell(0)
    var cell_2 = row.insertCell(1)
    var cell_3 = row.insertCell(2)
    var cell_4 = row.insertCell(3)

    cell_1.innerHTML = _data_available["brandName"]
    cell_2.innerHTML = _data_available["medId"]
    cell_3.innerHTML = _data_available["medType"]
    cell_4.innerHTML = _data_available["weight"]
}
document.body.addEventListener("click", (event) => {
    if(event.target.tagName == "IMG"){
        console.log("huh")
    }
})
function log_out(event){
    if(event.childNodes[0].tagName == "IMG"){
        sessionStorage.removeItem("pharmaceutical_data")
        window.location = "/front_end/pharmaceutical/html/login.html"
    }
    return false
}
function promotion(){
    var data = {"medId": document.getElementById("p_id").value}
    if(data["medId"]){
        xhr.onload = () => {
            if(xhr.readyState == 4 && xhr.status == 200){
                alert("Promotional Data Listed!")
            }
            else{
                alert("Failed to Send Promotional Data")
            }
        }
        xhr.open("POST", url + "/pharmaceuticals/promote")
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.setRequestHeader("Authorization", user_data["token"])
        xhr.send(JSON.stringify(data))
    }
    else{
        alert("Medicine ID can't be empty!")
    }
}