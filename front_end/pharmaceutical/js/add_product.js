var form = document.forms[0]

// /pharmaceuticals/addMedicine
// brandName, genericName, medType, weight, unitPrice, perPage, pagePrice, department (arr)

document.getElementsByTagName("button")[0].addEventListener("click", (event) => {
    event.preventDefault()

    console.log(form["brand_name"].value)
})