let user_data = JSON.parse(sessionStorage.getItem("pharmacy_data"))
var xhr = new XMLHttpRequest()
xhr.responseType = "json"
let url = "http://3d94-43-224-111-192.ngrok.io"
var form = document.forms[0]
var tbody = document.getElementsByTagName("tbody")[0]

document.getElementById("create").addEventListener("click", () => {
    document.getElementById("box_1").style.display = "flex"
    document.getElementById("box_1").style.visibility = "visible"

    document.getElementById("box_2").style.display = "flex"
    document.getElementById("box_2").style.visibility = "visible"

    document.getElementsByTagName("button")[0].style.display = "block"
    document.getElementsByTagName("button")[0].style.visibility = "visible"
})
document.getElementById("read").addEventListener("click", () => {
    document.getElementById("box_1").style.display = "none"
    document.getElementById("box_1").style.visibility = "hidden"

    document.getElementById("box_2").style.display = "none"
    document.getElementById("box_2").style.visibility = "hidden"

    xhr.onload = () => {
        if(xhr.readyState == 4 && xhr.status == 200){
            let data = xhr.response
            tbody.innerHTML = ""
            for(i of data){
                add_row(i)
            }
        }
        else{
            alert("Data Fetching Failed!")
        }
    }
    xhr.open("GET", url + "/pharmacies/inventory")
    xhr.setRequestHeader("Authorization", user_data["token"])
    xhr.send()
})
document.getElementById("update").addEventListener("click", () => {
    let data = {
        "medId": form["med_id"].value,
        "batchNo": form["bat_num"].value,
        "medName": form["med_name"].value,
        "medQty": form["med_quantity"].value,
        "unitPrice": form["unit_price"].value,
        "medCount": form["med_count"].value,
        "shelfNumber": form["shelf_num"].value,
        "type": "update"
    }
    xhr.onload = () => {
        if(xhr.readyState == 4 && xhr.status == 200){
            alert("Submission Successful")
            document.getElementById("box_1").style.display = "none"
            document.getElementById("box_1").style.visibility = "hidden"
            document.getElementById("box_2").style.display = "none"
            document.getElementById("box_2").style.visibility = "hidden"

            document.getElementById("update").style.filter = "blur(3px)"
            document.getElementById("update").style.pointerEvents = "none"
            document.getElementById("delete").style.filter = "blur(3px)"
            document.getElementById("delete").style.pointerEvents = "none"

            document.getElementById("create").style.filter = "none"
            document.getElementById("create").style.pointerEvents = "visible"
            document.getElementById("read").style.filter = "none"
            document.getElementById("read").style.pointerEvents = "visible"
        }
        else{
            alert("Data Submission Not Successful!")
            form["med_name"].value = ""
            form["med_id"].value = ""
            form["bat_num"].value = ""
            form["med_count"].value = ""
            form["unit_price"].value = ""
            document.getElementById("box_1").style.display = "none"
            document.getElementById("box_1").style.visibility = "hidden"
            document.getElementById("box_2").style.display = "none"
            document.getElementById("box_2").style.visibility = "hidden"

            document.getElementById("update").style.filter = "blur(3px)"
            document.getElementById("update").style.pointerEvents = "none"
            document.getElementById("delete").style.filter = "blur(3px)"
            document.getElementById("delete").style.pointerEvents = "none"

            document.getElementById("create").style.filter = "none"
            document.getElementById("create").style.pointerEvents = "visible"
            document.getElementById("read").style.filter = "none"
            document.getElementById("read").style.pointerEvents = "visible"
        }
    }
    xhr.open("POST", url + "/pharmacies/inventory/submit")
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.setRequestHeader("Authorization", user_data["token"])
    xhr.send(JSON.stringify(data))
})
document.getElementById("delete").addEventListener("click", () => {
    let data = {
        "medId": form["med_id"].value,
        "batchNo": form["bat_num"].value,
        "medName": form["med_name"].value,
        "medQty": form["med_quantity"].value,
        "unitPrice": form["unit_price"].value,
        "medCount": form["med_count"].value,
        "shelfNumber": form["shelf_num"].value,
        "type": "delete"
    }
    xhr.onload = () => {
        if(xhr.readyState == 4 && xhr.status == 200){
            alert("Submission Successful")
            document.getElementById("box_1").style.display = "none"
            document.getElementById("box_1").style.visibility = "hidden"
            document.getElementById("box_2").style.display = "none"
            document.getElementById("box_2").style.visibility = "hidden"

            document.getElementById("update").style.filter = "blur(3px)"
            document.getElementById("update").style.pointerEvents = "none"
            document.getElementById("delete").style.filter = "blur(3px)"
            document.getElementById("delete").style.pointerEvents = "none"

            document.getElementById("create").style.filter = "none"
            document.getElementById("create").style.pointerEvents = "visible"
            document.getElementById("read").style.filter = "none"
            document.getElementById("read").style.pointerEvents = "visible"
        }
        else{
            alert("Data Submission Not Successful!")
            form["med_name"].value = ""
            form["med_id"].value = ""
            form["bat_num"].value = ""
            form["med_count"].value = ""
            form["unit_price"].value = ""
            document.getElementById("box_1").style.display = "none"
            document.getElementById("box_1").style.visibility = "hidden"
            document.getElementById("box_2").style.display = "none"
            document.getElementById("box_2").style.visibility = "hidden"

            document.getElementById("update").style.filter = "blur(3px)"
            document.getElementById("update").style.pointerEvents = "none"
            document.getElementById("delete").style.filter = "blur(3px)"
            document.getElementById("delete").style.pointerEvents = "none"

            document.getElementById("create").style.filter = "none"
            document.getElementById("create").style.pointerEvents = "visible"
            document.getElementById("read").style.filter = "none"
            document.getElementById("read").style.pointerEvents = "visible"
        }
    }
    xhr.open("POST", url + "/pharmacies/inventory/submit")
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.setRequestHeader("Authorization", user_data["token"])
    xhr.send(JSON.stringify(data))
})
document.getElementById("search").addEventListener("click", () => {
    let medId = document.getElementById("medId").value
    let batchNumber = document.getElementById("batchNumber").value
    if(medId && batchNumber){
        xhr.onload = () => {
            if(xhr.readyState == 4 && xhr.status == 200){
                let response = xhr.response
                form["med_name"].value = response["brandName"]
                form["med_id"].value = medId
                form["bat_num"].value = batchNumber
                form["med_count"].value = response["perPage"]
                form["unit_price"].value = response["unitPrice"]

                document.getElementById("medId").value = ""
                document.getElementById("batchNumber").value = ""

                document.getElementById("box_1").style.display = "none"
                document.getElementById("box_1").style.visibility = "hidden"
            }
            else{
                alert("Wrong Medicine ID/Batch Number")
            }
        }
        xhr.open("POST", url + "/pharmacies/inventory/data")
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.setRequestHeader("Authorization", user_data["token"])
        xhr.send(JSON.stringify({"medId": medId, "batchNumber": batchNumber}))
    }
    else{
        alert("Medicine ID/Batch Number field can't be empty!")
    }
})
document.body.addEventListener("click", (event) => {
    if(event.target.className === "rem_med"){
        document.getElementById("box_2").style.display = "flex"
        document.getElementById("box_2").style.visibility = "visible"

        document.getElementById("create").style.filter = "blur(3px)"
        document.getElementById("create").style.pointerEvents = "none"
        document.getElementById("read").style.filter = "blur(3px)"
        document.getElementById("read").style.pointerEvents = "none"

        document.getElementById("update").style.filter = "none"
        document.getElementById("update").style.pointerEvents = "visible"
        document.getElementById("delete").style.filter = "none"
        document.getElementById("delete").style.pointerEvents = "visible"

        document.getElementsByTagName("button")[0].style.display = "none"
        document.getElementsByTagName("button")[0].style.visibility = "hidden"

        let data = event.target.closest("tr").childNodes
        form["med_id"].value = data[0].innerHTML
        form["med_name"].value = data[1].innerHTML
        form["bat_num"].value = data[2].innerHTML
        form["shelf_num"].value = data[3].innerHTML
        form["med_count"].value = data[4].innerHTML
        form["unit_price"].value = data[5].innerHTML
        form["med_quantity"].value = data[6].innerHTML
    }
})
function add_row(_data_available){
    var row = tbody.insertRow()

    var cell_1 = row.insertCell(0)
    var cell_2 = row.insertCell(1)
    var cell_3 = row.insertCell(2)
    var cell_4 = row.insertCell(3)
    var cell_5 = row.insertCell(4)
    var cell_6 = row.insertCell(5)
    var cell_7 = row.insertCell(6)
    var cell_8 = row.insertCell(7)

    cell_1.innerHTML = _data_available["medId"]
    cell_2.innerHTML = _data_available["medName"]
    cell_3.innerHTML = _data_available["batchNo"]
    cell_4.innerHTML = _data_available["shelfNumber"]
    cell_5.innerHTML = _data_available["medCount"]
    cell_6.innerHTML = _data_available["unitPrice"]
    cell_7.innerHTML = _data_available["medQty"]
    cell_8.innerHTML = `<img class="rem_med" src="../resources/edit_2.png">`
}
document.getElementsByTagName("button")[0].addEventListener("click", (event) => {
    event.preventDefault()
    let data = {
        "medId": form["med_id"].value,
        "batchNo": form["bat_num"].value,
        "medName": form["med_name"].value,
        "medQty": form["med_quantity"].value,
        "unitPrice": form["unit_price"].value,
        "medCount": form["med_count"].value,
        "shelfNumber": form["shelf_num"].value,
        "type": "create"
    }
    xhr.onload = () => {
        if(xhr.readyState == 4 && xhr.status == 200){
            alert("Submission Successful")
            document.getElementsByTagName("button")[0].style.display = "none"
            document.getElementsByTagName("button")[0].style.visibility = "hidden"
            location.reload(true)
        }
        else{
            alert("Data Submission Not Successful!")
            location.reload(true)
        }
    }
    xhr.open("POST", url + "/pharmacies/inventory/submit")
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.setRequestHeader("Authorization", user_data["token"])
    xhr.send(JSON.stringify(data))
})
function log_out(event){
    if(event.childNodes[0].tagName == "IMG"){
        sessionStorage.removeItem("pharmacy_data")
        window.location = "/front_end/pharmacy/html/login.html"
    }
    return false
}