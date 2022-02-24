var form = document.forms[0]
// var form_3 = document.forms[2]

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
    var dt = new Date().getTime()
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0
        dt = Math.floor(dt/16)
        return (c=="x" ? r :(r&0x3|0x8)).toString(16);
    })
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
                                                                "department": form["department"].value,
                                                                "institute": form["institute"].value,
                                                                "role": form["role"].value,
                                                                "degree": form["degree"].value,
                                                                "specialized_fields": form["specialized_fields"].value,
                                                                "reg_num": form["reg_num"].value,
                                                                "address": form["address"][0].value,
                                                                "visiting_hour": form["visiting_hour"].value,
                                                                "off_day": form["off_day"].value,
                                                                "phone": form["phone"][0].value,
                                                                "user_id": form["user_id"][0].value,
                                                                "password": form["password"][0].value,
                                                                "doctor_id": uuid
                                                            }
                                                            console.log(data)
                                                            form.reset()
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
                                            "e_tin": form["e_tin"].value,
                                            "operation_hour": form["operation_hour"].value,
                                            "phone": form["phone"][1].value,
                                            "user_id": form["user_id"][1].value,
                                            "password": form["password"][1].value,
                                            "pharmacy_id": uuid,
                                            "zone": form["zone"].value
                                        }
                                        console.log(data)
                                        form.reset()
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
                                "name": form["name"][2].value,
                                "address": form["address"][2].value,
                                "phone": form["phone"][2].value,
                                "user_id": form["user_id"][2].value,
                                "password": form["password"][2].value,
                                "company_id": uuid
                            }
                            console.log(data)
                            form.reset()
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