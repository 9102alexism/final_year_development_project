let user_data = JSON.parse(sessionStorage.getItem("pharmacy_data"))
document.getElementById("pn").innerHTML = user_data["data"]["name"]
document.getElementById("pa").innerHTML = user_data["data"]["address"]
document.getElementById("pp").innerHTML = user_data["data"]["phone"]

let total_count = 0

let history = []
var tbody = document.getElementsByTagName("tbody")[0]

var labels = []
var values = []

var ctx = document.getElementById("chart_1").getContext("2d")

var data = {
    labels,
    datasets: [
        {
            data: values,
            label: "Monthly Sale",
            backgroundColor: "#fff",
            borderColor: "#008a8a"
        }
    ]
}
var config = {
    type: "line",
    data: data,
    option: {
        responsive: true
    }
}
var chart = new Chart(ctx, config)

var xhr = new XMLHttpRequest()
xhr.responseType = "json"
let url = "http://3d94-43-224-111-192.ngrok.io"
xhr.onload = () => {
    if(xhr.status == 200 && xhr.readyState == 4){
        history = xhr.response
        for(let dt of history){
            add_row(dt)
            total_count += dt["total"]
        }
        document.getElementById("amount").innerHTML = total_count.toFixed(2)

        xhr.onload = () => {
            if(xhr.status == 200 && xhr.readyState == 4){
                let resp = xhr.response
                labels = Object.keys(xhr.response)
                for(let i of labels){
                    values.push(resp[i])
                }
                data = {
                    labels,
                    datasets: [
                        {
                            data: values,
                            label: "Monthly Sale",
                            backgroundColor: "#fff",
                            borderColor: "#008a8a"
                        }
                    ]
                }
                config = {
                    type: "line",
                    data: data,
                    option: {
                        responsive: true
                    }
                }
                chart.destroy()
                chart = new Chart(ctx, config)
            }
            else{
                console.log("Something Is Wrong")
            }
        }
        xhr.open("GET", url + "/pharmacies/saleSummary")
        xhr.setRequestHeader("Authorization", user_data["token"])
        xhr.send()
    }
    else{
        console.log("Something Is Wrong")
    }
}
xhr.open("POST", url + "/pharmacies/invoices")
xhr.setRequestHeader("Authorization", user_data["token"])
xhr.send()

function add_row(_data_available){
    var row = tbody.insertRow()

    var cell_1 = row.insertCell(0)
    var cell_2 = row.insertCell(1)
    var cell_3 = row.insertCell(2)

    cell_1.innerHTML = _data_available["dt"]
    cell_2.innerHTML = _data_available["total"].toFixed(2)
    cell_3.innerHTML = `<button type="button" class="btn" onclick="print(this)">Click</button>`
}
function log_out(event){
    if(event.childNodes[0].tagName == "IMG"){
        sessionStorage.removeItem("pharmacy_data")
        window.location = "/front_end/pharmacy/html/login.html"
    }
    return false
}
function print(obj){
    if(obj.className == "btn"){
        let id = obj.closest("tr").cells[0].innerHTML
        for(let data of history){
            if(id == data["dt"]){
                let html = ""
                for(let med of data["medicines"]){
                    html += `<div class="row"><label>${med["medName"]}</label><label>${med["medQty"]}</label><label>${med["total"].toFixed(2)} BDT</label></div>`
                }
                document.getElementById("body").innerHTML = html
                document.getElementById("total").innerHTML = data["total"].toFixed(2) + " BDT"
                break
            }
        }
        printJS({
            printable: "print",
            type: "html",
            css: "../css/print.css"
        })
    }
}