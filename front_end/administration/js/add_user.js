var form = document.forms[0]
var xhr = new XMLHttpRequest()
xhr.responseType = "json"

let url = "http://ec23-43-224-111-192.ngrok.io"

document.getElementsByName("user_type")[0].addEventListener("change", (event) => {
    if(event.target.value == "doctor"){
        document.getElementById("doctor_form").style.display = "flex"
        document.getElementById("doctor_form").style.visibility = "visible"

        document.getElementsByTagName("button")[0].style.display = "flex"
        document.getElementsByTagName("button")[0].style.visibility = "visible"

        document.getElementById("pharmacy_form").style.display = "none"
        document.getElementById("pharmacy_form").style.visibility = "hidden"

        document.getElementById("pharmaceutical_form").style.display = "none"
        document.getElementById("pharmaceutical_form").style.visibility = "hidden"
    }
    else if(event.target.value == "pharmacy"){
        document.getElementById("pharmacy_form").style.display = "flex"
        document.getElementById("pharmacy_form").style.visibility = "visible"

        document.getElementsByTagName("button")[0].style.display = "flex"
        document.getElementsByTagName("button")[0].style.visibility = "visible"

        document.getElementById("doctor_form").style.display = "none"
        document.getElementById("doctor_form").style.visibility = "hidden"

        document.getElementById("pharmaceutical_form").style.display = "none"
        document.getElementById("pharmaceutical_form").style.visibility = "hidden"
    }
    else if(event.target.value == "pharmaceutical"){
        document.getElementById("pharmaceutical_form").style.display = "flex"
        document.getElementById("pharmaceutical_form").style.visibility = "visible"

        document.getElementsByTagName("button")[0].style.display = "flex"
        document.getElementsByTagName("button")[0].style.visibility = "visible"

        document.getElementById("doctor_form").style.display = "none"
        document.getElementById("doctor_form").style.visibility = "hidden"

        document.getElementById("pharmacy_form").style.display = "none"
        document.getElementById("pharmacy_form").style.visibility = "hidden"
    }
    else{
        document.getElementById("doctor_form").style.display = "none"
        document.getElementById("doctor_form").style.visibility = "hidden"

        document.getElementById("pharmacy_form").style.display = "none"
        document.getElementById("pharmacy_form").style.visibility = "hidden"

        document.getElementById("pharmaceutical_form").style.display = "none"
        document.getElementById("pharmaceutical_form").style.visibility = "hidden"

        document.getElementsByTagName("button")[0].style.display = "none"
        document.getElementsByTagName("button")[0].style.visibility = "hidden"
    }
})

document.getElementsByTagName("button")[0].addEventListener("click", (event) => {
    event.preventDefault()
    if(document.getElementsByName("user_type")[0].value == "doctor"){
        if(form["name"][0].value){
            if(form["department"].value){
                if(form["institute"].value){
                    if(form["role"].value){
                        if(form["degree"].value){
                            if(form["specialized_fields"]){
                                if(form["reg_num"].value){
                                    if(form["address"][0].value){
                                        if(form["visiting_hour"].value){
                                            if(form["off_day"].value){
                                                if(form["phone"][0].value){
                                                    if(form["user_id"][0].value){
                                                        if(form["password"][0].value){
                                                            var data = {
                                                                "name": form["name"][0].value,
                                                                "dept": form["department"].value,
                                                                "institute": form["institute"].value,
                                                                "role": form["role"].value,
                                                                "degree": form["degree"].value,
                                                                "specializedFields": form["specialized_fields"].value,
                                                                "regNumber": form["reg_num"].value,
                                                                "address": form["address"][0].value,
                                                                "visitHour": form["visiting_hour"].value,
                                                                "offDay": form["off_day"].value,
                                                                "phone": form["phone"][0].value,
                                                                "userId": form["user_id"][0].value,
                                                                "password": form["password"][0].value
                                                            }
                                                            xhr.onload = () => {
                                                                if(xhr.readyState == 4 && xhr.status == 200){
                                                                    alert("Success!")
                                                                    location.reload(true)
                                                                }
                                                                else{
                                                                    alert("Failed")
                                                                }
                                                            }
                                                            xhr.open("POST", url + "/admin/doctorSignup")
                                                            xhr.setRequestHeader("Content-Type", "application/json")
                                                            xhr.send(JSON.stringify(data))
                                                        }
                                                        else alert("Some Data Is Missing!")
                                                    }
                                                    else alert("Some Data Is Missing!")
                                                }
                                                else alert("Some Data Is Missing!")
                                            }
                                            else alert("Some Data Is Missing!")
                                        }
                                        else alert("Some Data Is Missing!")
                                    }
                                    else alert("Some Data Is Missing!")
                                }
                                else alert("Some Data Is Missing!")
                            }
                            else alert("Some Data Is Missing!")
                        }
                        else alert("Some Data Is Missing!")
                    }
                    else alert("Some Data Is Missing!")
                }
                else alert("Some Data Is Missing!")
            }
            else alert("Some Data Is Missing!")
        }
        else alert("Some Data Is Missing!")
    }
    else if(document.getElementsByName("user_type")[0].value == "pharmacy"){
        if(form["name"][1].value){
            if(form["address"][1].value){
                if(form["e_tin"].value){
                    if(form["operation_hour"].value){
                        if(form["phone"][1].value){
                            if(form["user_id"][1].value){
                                if(form["password"][1].value){
                                    if(form["zone"].value){
                                        var data = {
                                            "name": form["name"][1].value,
                                            "address": form["address"][1].value,
                                            "eTIN": form["e_tin"].value,
                                            "operationHour": form["operation_hour"].value,
                                            "phone": form["phone"][1].value,
                                            "userId": form["user_id"][1].value,
                                            "password": form["password"][1].value,
                                            "zone": form["zone"].value
                                        }
                                        xhr.onload = () => {
                                            if(xhr.readyState == 4 && xhr.status == 200){
                                                alert("Success!")
                                                location.reload(true)
                                            }
                                            else{
                                                alert("Failed")
                                            }
                                        }
                                        xhr.open("POST", url + "/admin/pharmacySignup")
                                        xhr.setRequestHeader("Content-Type", "application/json")
                                        xhr.send(JSON.stringify(data))
                                    }
                                    else alert("Some Data Is Missing!")
                                }
                                else alert("Some Data Is Missing!")
                            }
                            else alert("Some Data Is Missing!")
                        }
                        else alert("Some Data Is Missing!")
                    }
                    else alert("Some Data Is Missing!")
                }
                else alert("Some Data Is Missing!")
            }
            else alert("Some Data Is Missing!")
        }
        else alert("Some Data Is Missing!")
    }
    else if(document.getElementsByName("user_type")[0].value == "pharmaceutical"){
        if(form["name"][2].value){
            if(form["address"][2].value){
                if(form["phone"][2].value){
                    if(form["user_id"][2].value){
                        if(form["password"][2].value){
                            var data = {
                                "companyName": form["name"][2].value,
                                "address": form["address"][2].value,
                                "phone": form["phone"][2].value,
                                "userId": form["user_id"][2].value,
                                "password": form["password"][2].value,
                            }
                            xhr.onload = () => {
                                if(xhr.readyState == 4 && xhr.status == 200){
                                    alert("Success!")
                                    location.reload(true)
                                }
                                else{
                                    alert("Failed")
                                }
                            }
                            xhr.open("POST", url + "/admin/pharmaSignup")
                            xhr.setRequestHeader("Content-Type", "application/json")
                            xhr.send(JSON.stringify(data))
                        }
                        else alert("Some Data Is Missing!")
                    }
                    else alert("Some Data Is Missing!")
                }
                else alert("Some Data Is Missing!")
            }
            else alert("Some Data Is Missing!")
        }
        else alert("Some Data Is Missing!")
    }
    else{
        alert("Something is wrong!")
    }
})