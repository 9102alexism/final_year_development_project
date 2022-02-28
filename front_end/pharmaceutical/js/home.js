let user_data = JSON.parse(sessionStorage.getItem("pharmaceutical_data"))

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
    }
    else{
        console.log("Something Is Wrong")
    }
}
xhr.open("POST", url + "/pharmacies/invoices")
xhr.setRequestHeader("Authorization", user_data["token"])
// xhr.send()

const ctx_1 = document.getElementById("chart_1").getContext("2d")
const ctx_2 = document.getElementById("chart_2").getContext("2d")

const labels = [
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
            data: [211, 326, 165, 350, 420],
            label: "Monthly Sale",
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
            data: [211, 326, 165, 350, 420],
            label: "Top 5 Product",
            backgroundColor: ["green"],
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

function log_out(event){
    if(event.childNodes[0].tagName == "IMG"){
        sessionStorage.removeItem("pharmacy_data")
        window.location = "/front_end/pharmacy/html/login.html"
    }
    return false
}