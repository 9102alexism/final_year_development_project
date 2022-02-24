var form = document.forms[0]

document.getElementsByTagName("button")[0].addEventListener("click", (event) => {
    event.preventDefault()

    console.log(form["med_id"].value)
})