// prescriptionId, brandName
// get (/pharmacies/medicine)

// post (/pharmacies/invoice)

var xhr = new XMLHttpRequest()
xhr.responseType = "json"
var form = document.forms[0]
var table = form.getElementsByTagName("table")[0]
var tbody = form.getElementsByTagName("tbody")[0]
var tfoot_price = table.getElementsByTagName("tfoot")[0].rows[0].cells[3]
var total = 0
var discount_percent = table.getElementsByTagName("tfoot")[0].rows[0].cells[1]
var discount = 0

var data = [
    {
        "name": "Napa",
        "shelf_no": 2,
        "available": 20,
        "quantity": 0,
        "unit_price": 2
    }
]

function add_medicine(){
    if(form["prescription_id"].value && !form["id_name"].value){
        xhr.onload = () => {
            if(xhr.readyState == 4 && xhr.status == 200){
                console.log(xhr.response)
            }
            else alert("No Such Prescription ID Found")
        }
        xhr.open("GET", "/")
        xhr.send()
    }
    else if(form["id_name"].value){
        xhr.onload = () => {
            if(xhr.readyState == 4 && xhr.status == 200){
                console.log(xhr.response)
            }
            else alert("No Such Medicine ID/Name Found")
        }
        xhr.open("GET", "/")
        xhr.send()
    }
    else{
        alert("No Valid Data Given")
    }
    add_row(data[0])
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
    cell_6.innerHTML = `${_data_available["unit_price"]*_data_available["quantity"]} BDT`
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
        for(var i of data){
            if(i["name"] == event.target.closest("tr").cells[1].innerHTML){
                event.target.closest("tr").cells[5].innerHTML = `${i["unit_price"]*event.target.value} BDT`
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
        for(var i of data){
            if(i["name"] == event.target.closest("tr").cells[1].innerHTML && (event.target.value >= 0 && event.target.value <= i["available"])){
                event.target.closest("tr").cells[5].innerHTML = `${i["unit_price"]*event.target.value} BDT`
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
        "pharmacyId": null, 
        "date": null
    }
    if(table.tBodies[0].rows.length > 0){
        data["medicine"] = []
        for(var row of table.tBodies[0].rows){
            var med = {}
            med["id"] = NaN
            med["name"] = row.cells[1].innerHTML
            med["totalPurchased"] = row.cells[4].childNodes[0].value
            data["medicine"].push(med)
        }
        data["total"] = tfoot_price.innerHTML.split(" ")[0]
    }
    else{
        data["medicine"] = null
        data["total"] = null
    }

    if(data["total"] > 0){
        console.log(data)
    }
    else alert("No Medicine Data Found")
})

// {
//     "pharmacyId": null, 
//     "date": null,
//     "medicine": [
//         {
//             "id": null,
//             "name": SVGNumberList,
//             "totalPurchased": null
//         }
//     ],
//     "total": null
// }