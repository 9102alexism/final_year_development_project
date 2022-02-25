var form = document.forms[0]

// medId, batchNumber, zone, count
// /pharmaceuticals/updateBatch
// post

document.getElementsByTagName("button")[0].addEventListener("click", (event) => {
    event.preventDefault()

    console.log(form["med_id"].value)
})