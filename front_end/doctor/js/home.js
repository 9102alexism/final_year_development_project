let user_data = JSON.parse(sessionStorage.getItem("doctor_data"))
// document.getElementById("dn").innerHTML = user_data["name"]
// document.getElementById("dd").innerHTML = user_data["degree"]
// document.getElementById("ds").innerHTML = user_data["specializedFields"]
// document.getElementById("dr").innerHTML = user_data["role"]
// document.getElementById("drn").innerHTML = "Reg Num: " + user_data["regNumber"]
let user_count = 0

var xhr = new XMLHttpRequest()
xhr.responseType = "json"
let url = "http://ec23-43-224-111-192.ngrok.io"
xhr.onload = () => {
    if(xhr.status == 200 && xhr.readyState == 4){
        history = xhr.response
        for(let dt of history){
            add_row(dt)
            user_count += 1
        }
        document.getElementById("amount").innerHTML = user_count
    }
    else{
        console.log("Something Is Wrong")
    }
}
xhr.open("GET", url + "/doctors/history")
xhr.setRequestHeader("Authorization", user_data["token"])
xhr.send()

let history = []

var tbody = document.getElementsByTagName("tbody")[0]

function add_row(_data_available){
    var row = tbody.insertRow()

    var cell_1 = row.insertCell(0)
    var cell_2 = row.insertCell(1)
    var cell_3 = row.insertCell(2)

    cell_1.innerHTML = _data_available["date"]
    cell_2.innerHTML = _data_available["patient_name"]
    cell_3.innerHTML = `<button type="button" class="btn" onclick="print(this)">Click</button>`
}
function print(obj){
    if(obj.className == "btn"){
        let id = obj.closest("tr").cells[0].innerHTML
        for(let data of history){
            if(id == data["date"]){
                let html = ""
            }
        }
    }
}