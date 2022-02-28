let user_data = JSON.parse(sessionStorage.getItem("doctor_data"))
document.getElementById("dn").innerHTML = user_data["name"]
document.getElementById("dd").innerHTML = user_data["degree"]
document.getElementById("ds").innerHTML = user_data["specializedFields"]
document.getElementById("dr").innerHTML = user_data["role"]
document.getElementById("drn").innerHTML = "Reg Num: " + user_data["regNumber"]
let user_count = 0

var xhr = new XMLHttpRequest()
xhr.responseType = "json"
let url = "http://3d94-43-224-111-192.ngrok.io"
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
        document.getElementById("comp").innerHTML = ""
        document.getElementById("exam").innerHTML = ""
        document.getElementById("diag").innerHTML = ""
        document.getElementById("inv").innerHTML = ""
        document.getElementById("first").innerHTML = "<label>Rx.</label>"
        document.getElementById("adv").innerHTML = ""
        document.getElementById("last").innerHTML = "<label>Follow-Up</label>"
        document.getElementById("qrcode").innerHTML = ""
        for(let data of history){
            if(id == data["date"]){
                document.getElementById("p_name").innerHTML = data["patient_name"]
                document.getElementById("p_gender").innerHTML = "Gender: " + data["gender"]
                document.getElementById("p_age").innerHTML = "Age: " + data["age"] + " " + data["age_type"]
                document.getElementById("p_date").innerHTML = "Date: " + data["date"].split(" ")[0]
                let html = ""
                for(let comp of data["complaint"]){
                    html += "&#8226 " + comp
                    if(!(comp == data["complaint"][data["complaint"].length - 1])){
                        html += "<br>"
                    }
                }
                document.getElementById("comp").innerHTML = html
                html = ""
                for(let exam of data["examinations"]){
                    html += "&#8226 " + exam
                    if(!(exam == data["examinations"][data["examinations"].length - 1])){
                        html += "<br>"
                    }
                }
                document.getElementById("exam").innerHTML = html
                html = ""
                for(let diag of data["diagnosis"]){
                    html += "&#8226 " + diag
                    if(!(diag == data["diagnosis"][data["diagnosis"].length - 1])){
                        html += "<br>"
                    }
                }
                document.getElementById("diag").innerHTML = html
                html = ""
                for(let inv of data["investigation"]){
                    html += "&#8226 " + inv
                    if(!(inv == data["investigation"][data["investigation"].length - 1])){
                        html += "<br>"
                    }
                }
                document.getElementById("inv").innerHTML = html
                html = ""
                let cnt = 1
                for(let med of data["medicine"]){
                    let count = ""
                    if(med["total_count"] > 3){
                        count = `Each ${Math.ceil(24/med["total_count"])} hours`
                    }
                    else{
                        if(med["morning"]) count += "1+"; else count += "0+"
                        if(med["noon"]) count += "1+"; else count += "0+"
                        if(med["night"]) count += "1"; else count += "0"
                    }
                    let duration = ""
                    if(med["duration"] > 1) duration = "days"; else duration = "day"
                    html += `<div class="row"><label>${cnt}. ${med["name"]}</label><label>${count} for ${med["duration"]} ${duration}</label></div>`
                    cnt += 1
                }
                document.getElementById("first").innerHTML += html
                html = ""
                cnt = 1
                for(let adv of data["advice"]){
                    html += `${cnt}. ` + adv
                    if(!(adv == data["advice"][data["advice"].length - 1])){
                        html += "<br>"
                    }
                    cnt += 1
                }
                document.getElementById("adv").innerHTML = html
                html = ""
                cnt = 1
                document.getElementById("last").innerHTML += `<label>${data["follow_up"]}</label>`
                let qr_code = new QRCode(document.getElementById("qrcode"), {
                    width: 70,
                    height: 70,
                    colorDark : "#000000",
                    colorLight : "#ffffff",
                    correctLevel : QRCode.CorrectLevel.H
                })
                qr_code.clear()
                qr_code.makeCode(data["prescriptionId"])
                break
            }
        }
        document.getElementById("qrcode").innerHTML = `<img src="${document.getElementById("qrcode").children[0].toDataURL("image/png")}">`
        printJS({
            printable: "print",
            type: "html",
            css: "../css/print.css"
        })
    }
}
document.getElementById("l_out").addEventListener("click", () => {
    sessionStorage.removeItem("doctor_data")
    window.location = "/front_end/doctor/html/login.html"
})