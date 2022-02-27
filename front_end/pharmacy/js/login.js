var form = document.forms[0]
var xhr = new XMLHttpRequest()
xhr.responseType = "json"

document.getElementsByTagName("button")[0].addEventListener("click", (event) => {
    event.preventDefault()
    let email = form["email"].value
    let password = form["pwd"].value
    if(email.length > 5){
        if(password.length > 5){
            let url = "http://3d94-43-224-111-192.ngrok.io"
            xhr.onload = () => {
                if(xhr.readyState == 4 && xhr.status == 200){
                    sessionStorage.setItem("pharmacy_data", JSON.stringify(xhr.response))
                    xhr.onload = () => {
                        if(xhr.readyState == 4 && xhr.status == 200){
                            window.location = "/front_end/pharmacy/html/point_of_sale.html"
                        }
                    }
                    xhr.open("GET", url + "/pharmacies/POS")
                    xhr.setRequestHeader("Authorization", JSON.parse(sessionStorage.getItem("pharmacy_data"))["token"])
                    xhr.send()
                }
                else sessionStorage.setItem("pharmacy_data", null)
            }
            xhr.open("POST", url + "/pharmacies/login/verify")
            xhr.setRequestHeader("Content-Type", "application/json")
            xhr.send(JSON.stringify({"userId": email, "password": password}))
        }
        else{
            alert("Password is too short!")
            return false
        }
    }
    else{
        alert("Username is too short!")
        return false
    }
})