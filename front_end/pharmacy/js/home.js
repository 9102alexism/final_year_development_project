let user_data = JSON.parse(sessionStorage.getItem("pharmacy_data"))
document.getElementById("pn").innerHTML = user_data["data"]["name"]
document.getElementById("pa").innerHTML = user_data["data"]["address"]
document.getElementById("pp").innerHTML = user_data["data"]["phone"]

var xhr = new XMLHttpRequest()
xhr.responseType = "json"
let url = "http://ec23-43-224-111-192.ngrok.io"
xhr.onload = () => {
    if(xhr.status == 200 && xhr.readyState == 4){
        console.log(xhr.response)
    }
}
xhr.open("POST", url + "/pharmacies/invoices")
xhr.setRequestHeader("Authorization", user_data["token"])
xhr.send()

var tbody = document.getElementsByTagName("tbody")[0]
let history = [
    {
        "dt": "22-8-12 (14:15:17)",
        "medicines": [
            {
                "medName": "Napa",
                "medQty": 10,
                "total": 10
            },
            {
                "medName": "Alatrol",
                "medQty": 20,
                "total": 60
            }
        ],
        "total": 70
    },
    {
        "dt": "22-8-69 (14:15:17)",
        "medicines": [
            {
                "medName": "Napa",
                "medQty": 20,
                "total": 20
            },
            {
                "medName": "Alatrol",
                "medQty": 10,
                "total": 30
            }
        ],
        "total": 50
    }
]
for(let dt of history){
    add_row(dt)
}

const ctx_1 = document.getElementById("chart_1").getContext("2d")
const ctx_2 = document.getElementById("chart_2").getContext("2d")

const labels = [
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020"
]
const data_1 = {
    labels,
    datasets: [
        {
            data: [211, 326, 165, 350, 420, 370, 500, 375, 415],
            label: "Minecrafty Sales",
            backgroundColor: "#fff",
            borderColor: "#008a8a"
        }
    ]
}
const config_1 = {
    type: "line",
    data: data_1,
    option: {
        responsive: true
    }
}
const chart_1 = new Chart(ctx_1, config_1)

const data_2 = {
    labels,
    datasets: [
        {
            data: [211, 326, 165, 350, 420, 370, 500, 375, 415],
            label: "Minecrafty Sales",
            backgroundColor: ["blue", "red", "green"],
            borderColor: "#008a8a"
        }
    ]
}
const config_2 = {
    type: "bar",
    data: data_2,
    option: {
        responsive: true
    }
}
const chart_2 = new Chart(ctx_2, config_2)

function add_row(_data_available){
    var row = tbody.insertRow()

    var cell_1 = row.insertCell(0)
    var cell_2 = row.insertCell(1)
    var cell_3 = row.insertCell(2)

    cell_1.innerHTML = _data_available["dt"]
    cell_2.innerHTML = _data_available["total"]
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
                    html += `<div class="row"><label>${med["medName"]}</label><label>${med["medQty"]}</label><label>${med["total"]} BDT</label></div>`
                }
                document.getElementById("body").innerHTML = html
                document.getElementById("total").innerHTML = data["total"] + " BDT"
            }
        }
        printJS({
            printable: "print",
            type: "html",
            css: "../css/print.css"
        })
    }
}