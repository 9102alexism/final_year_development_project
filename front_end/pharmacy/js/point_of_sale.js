var date = new Date();

let user_data = JSON.parse(sessionStorage.getItem("pharmacy_data"))
document.getElementById("pn").innerHTML = user_data["data"]["name"]
document.getElementById("pa").innerHTML = user_data["data"]["address"]
document.getElementById("pp").innerHTML = user_data["data"]["phone"]
let medicine = user_data["meds"]
var medicine_list = document.getElementById("medicines")
for(var med of medicine){
    var opt = document.createElement("option")
    opt.value = med["medName"]
    medicine_list.appendChild(opt)
}

var xhr = new XMLHttpRequest()
xhr.responseType = "json"
let url = "http://ec23-43-224-111-192.ngrok.io"
var form = document.forms[0]
var table = form.getElementsByTagName("table")[0]
var tbody = form.getElementsByTagName("tbody")[0]
var tfoot_price = table.getElementsByTagName("tfoot")[0].rows[0].cells[3]
var total = 0
var discount_percent = table.getElementsByTagName("tfoot")[0].rows[0].cells[1]
var discount = 0

function add_medicine(){
    if(form["prescription_id"].value && !form["id_name"].value){
        data = {
            "prescriptionId": form["prescription_id"].value
        }
        xhr.onload = () => {
            if(xhr.readyState == 4 && xhr.status == 200){
                let prescription = xhr.response
                for(i of prescription["medicine"]){
                    let data = {}
                    for(j of medicine){
                        if(j["medId"] == i["id"]){
                            data["name"] = j["medName"]
                            data["shelf_no"] = j["shelfNumber"]
                            data["available"] = j["medQty"]
                            data["quantity"] = i["total_count"]
                            data["unit_price"] = j["unitPrice"]
                            break
                        }
                    }
                    add_row(data)
                }
            }
            else{
                alert("No Such Prescription Found")
            }
        }
        xhr.open("POST", url + "/pharmacies/medicine")
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.setRequestHeader("Authorization", user_data["token"])
        xhr.send(JSON.stringify(data))
    }
    else if(form["id_name"].value){
        for(var med of medicine){
            if(med["medName"] == form["id_name"].value || med["medId"] == form["id_name"].value){
                let data = {
                    "name": med["medName"],
                    "shelf_no": med["shelfNumber"],
                    "available": med["medQty"],
                    "quantity": 0,
                    "unit_price": med["unitPrice"]
                }
                add_row(data)
                return
            }
        }
        alert("Medicine ID/Name Not Found")
    }
    else{
        alert("No Valid Data Given")
    }
}
function add_row(_data_available){
    var row_count = table.tBodies[0].rows.length + 1
    var row = tbody.insertRow()

    var cell_1 = row.insertCell(0)
    var cell_2 = row.insertCell(1)
    var cell_3 = row.insertCell(2)
    var cell_4 = row.insertCell(3)
    var cell_5 = row.insertCell(4)
    var cell_6 = row.insertCell(5)
    var cell_7 = row.insertCell(6)

    cell_1.innerHTML = row_count
    cell_2.innerHTML = _data_available["name"]
    cell_3.innerHTML = _data_available["shelf_no"]
    cell_4.innerHTML = _data_available["available"]
    cell_5.innerHTML = `<input type="number" class="change_quantity" name="quantity" min="0" max="${_data_available["available"]}" value=${_data_available["quantity"]}>`
    cell_6.innerHTML = `${(_data_available["unit_price"]*_data_available["quantity"]).toFixed(2)} BDT`
    cell_7.innerHTML = `<img class="rem_med" src="../resources/sub.png">`

    form["prescription_id"].value = ""
    form["id_name"].value = ""
    total += _data_available["unit_price"]*_data_available["quantity"]
    tfoot_price.innerHTML = `${parseInt(total - (total * (parseFloat(discount) / 100)))} BDT`
}
document.body.addEventListener("click", (event) => {
    if(event.target.className === "rem_med"){
        total -= parseInt(event.target.closest("tr").cells[5].innerHTML.split(" ")[0])
        tfoot_price.innerHTML = `${total} BDT`
        event.target.closest("tr").remove()
        if(table.tBodies[0].rows.length == 0){
            discount_percent.innerHTML = `<input type="number" name="discount" min="0" max="100" placeholder="%">`
        }
    }
    else if(event.target.className === "change_quantity"){
        for(var i of medicine){
            if(i["medName"] == event.target.closest("tr").cells[1].innerHTML){
                event.target.closest("tr").cells[5].innerHTML = `${(i["unitPrice"]*event.target.value).toFixed(2)} BDT`
                temp = 0
                for(var row of table.tBodies[0].rows){
                    temp += parseInt(row.cells[5].innerHTML.split(" ")[0])
                }
                if(discount_percent.childNodes[0].value) discount = discount_percent.childNodes[0].value
                tfoot_price.innerHTML = `${parseInt(temp - (temp * (parseFloat(discount) / 100)))} BDT`
                total = temp
            }
        }
    }
    else if(event.target.name === "discount" && table.tBodies[0].rows.length > 0 && event.target.value){
        discount = event.target.value
        if(discount >= 0 && discount <= 100){
            tfoot_price.innerHTML = `${parseInt(total - (total * (parseFloat(discount) / 100)))} BDT`
        }
    }
})
document.body.addEventListener("keyup", (event) => {
    // event.key == "Enter" will stop live search
    if(event.target.className === "change_quantity" && event.key == "Enter"){
        for(var i of medicine){
            if(i["medName"] == event.target.closest("tr").cells[1].innerHTML && (event.target.value >= 0 && event.target.value <= i["medQty"])){
                event.target.closest("tr").cells[5].innerHTML = `${(i["unitPrice"]*event.target.value).toFixed(2)} BDT`
                temp = 0
                for(var row of table.tBodies[0].rows){
                    temp += parseInt(row.cells[5].innerHTML.split(" ")[0])
                }
                if(discount_percent.childNodes[0].value) discount = discount_percent.childNodes[0].value
                tfoot_price.innerHTML = `${parseInt(temp - (temp * (parseFloat(discount) / 100)))} BDT`
                total = temp
            }
            else{
                alert("Invalid Quantity Given")
                event.target.value = 0
            }
        }
    }
    else if(event.target.name === "discount" && table.tBodies[0].rows.length > 0 && event.target.value && event.key == "Enter"){
        discount = event.target.value
        if(discount >= 0 && discount <= 100){
            tfoot_price.innerHTML = `${parseInt(total - (total * (parseFloat(discount) / 100)))} BDT`
        }
        else{
            alert("Invalid Percentage Given")
            event.target.value = ""
        }
    }
})
document.getElementsByTagName("button")[0].addEventListener("click", (event) => {
    event.preventDefault()
    var data = {
        "pharmacyId": user_data["data"]["pharmacyId"], 
        "date": date
    }
    if(table.tBodies[0].rows.length > 0){
        data["medicines"] = []
        for(var row of table.tBodies[0].rows){
            var med = {}
            med["medId"] = NaN
            for(var i of medicine){
                if(i["medName"] == row.cells[1].innerHTML){
                    med["medId"] = i["medId"]
                    break
                }
            }
            med["name"] = row.cells[1].innerHTML
            med["totalPurchased"] = row.cells[4].childNodes[0].value
            data["medicines"].push(med)
        }
        data["total"] = tfoot_price.innerHTML.split(" ")[0]
    }
    else{
        data["medicines"] = null
        data["total"] = null
    }

    if(data["total"] > 0){
        xhr.onload = () => {
            if(xhr.readyState == 4 && xhr.status == 200){
                alert("Successful")
                location.reload(true)
            }
            else{
                alert("Failed")
            }
        }
        xhr.open("POST", url + "/pharmacies/invoice")
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.setRequestHeader("Authorization", user_data["token"])
        xhr.send(JSON.stringify(data))
    }
    else alert("No Medicine Data Found")
})
function log_out(event){
    if(event.childNodes[0].tagName == "IMG"){
        sessionStorage.removeItem("pharmacy_data")
        window.location = "/front_end/pharmacy/html/login.html"
    }
    return false
}