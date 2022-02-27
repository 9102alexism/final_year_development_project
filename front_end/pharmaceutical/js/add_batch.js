var form = document.forms[0]
var xhr = new XMLHttpRequest()
xhr.responseType = "json"
let url = "http://3d94-43-224-111-192.ngrok.io"

document.getElementsByTagName("button")[0].addEventListener("click", (event) => {
    event.preventDefault()
    var data = {
        "medId": form["med_id"].value,
        "batchNumber": form["batch_num"].value,
        "zone": form["zone"].value,
        "count": form["count"].value
    }
    xhr.onload = () => {
        if(xhr.readyState == 4 && xhr.status == 200){
            alert("Submitted")
        }
        else{
            alert("Data Submission Failed")
        }
    }
    xhr.open("POST", url + "/pharmaceuticals/updateBatch")
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