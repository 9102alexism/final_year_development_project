var form = document.forms[0]
var xhr = new XMLHttpRequest()
xhr.responseType = "json"

document.getElementsByTagName("button")[0].addEventListener("click", (event) => {
    event.preventDefault()
    let email = form["email"].value
    let password = form["pwd"].value
    if(email.length > 5){
        if(password.length > 5){
            let url = "http://ec23-43-224-111-192.ngrok.io"
            xhr.onload = () => {
                if(xhr.readyState == 4 && xhr.status == 200){
                    localStorage.setItem("user_data", JSON.stringify(xhr.response))
                    xhr.onload = () => {
                        if(xhr.readyState == 4 && xhr.status == 200){
                            window.location = "/front_end/doctor/html/prescription.html"
                        }
                    }
                    xhr.open("GET", url + "/doctors/prescription")
                    xhr.setRequestHeader("Authorization", JSON.parse(localStorage.getItem("user_data"))["token"])
                    xhr.send()
                }
                else localStorage.setItem("user_data", null)
            }
            xhr.open("POST", url + "/doctors/login/verify")
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