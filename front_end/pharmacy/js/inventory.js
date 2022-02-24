var form = document.forms[0]
var tbody = document.getElementsByTagName("tbody")[0]

document.getElementById("create").addEventListener("click", () => {
    document.getElementById("box_1").style.display = "flex"
    document.getElementById("box_1").style.visibility = "visible"
})
document.getElementById("read").addEventListener("click", () => {
    document.getElementById("box_1").style.display = "none"
    document.getElementById("box_1").style.visibility = "hidden"

    document.getElementById("box_2").style.display = "none"
    document.getElementById("box_2").style.visibility = "hidden"

    var data = [
        {
            "id": "1sdngiud",
            "name": "Napa",
            "batch_no": "2",
            "shelf_no": "10",
            "per_leaf": 20,
            "unit_price": 3,
            "quantity": 50
        }
    ]
    for(i of data){
        add_row(i)
    }
})
document.getElementById("update").addEventListener("click", () => {
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
})
document.getElementById("delete").addEventListener("click", () => {
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
})
document.getElementById("search").addEventListener("click", () => {
    if(true){
        document.getElementById("box_2").style.display = "flex"
        document.getElementById("box_2").style.visibility = "visible"
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

    cell_2.innerHTML = _data_available["id"]
    cell_3.innerHTML = _data_available["name"]
    cell_4.innerHTML = _data_available["batch_no"]
    cell_5.innerHTML = _data_available["shelf_no"]
    cell_6.innerHTML = _data_available["per_leaf"]
    cell_1.innerHTML = _data_available["unit_price"]
    cell_7.innerHTML = _data_available["quantity"]
    cell_8.innerHTML = `<img class="rem_med" src="../resources/edit_2.png">`
}
document.getElementsByTagName("button")[0].addEventListener("click", (event) => {
    event.preventDefault()
    console.log("huh")
})