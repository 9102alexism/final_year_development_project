class Prescription{
    static xhr = new XMLHttpRequest()
    static user_data = JSON.parse(localStorage.getItem("user_data"))
    static url = "http://ec23-43-224-111-192.ngrok.io"
    complaint
    examinations
    diagnosis
    investigation
    add_med
    body
    add_adv
    advice
    submit_btn
    constructor(){
        Prescription.xhr.responseType = "json"
        this.new_date = new Date()
        this.form = document.forms[0]

        this.department = this.form["department"]
        this.patient_name = this.form["patient_name"]
        this.gender = this.form["gender"]
        this.age = this.form["age"]
        this.age_type = this.form["age_type"]
        this.blood_group = this.form["blood_group"]
        this.weight = this.form["weight"]
        this.paid = this.form["paid"]
        this.currency = this.form["currency"]
        this.date = this.form["date"]

        this.bp = this.form["bp"]
        this.pulse = this.form["pulse"]
        this.complaint = this.form["complaint"]
        this.examinations = this.form["examinations"]
        this.diagnosis = this.form["diagnosis"]
        this.investigation = this.form["investigation"]

        this.add_med = document.getElementById("add_med")
        this.body = document.getElementsByTagName("body")[0]

        this.medicine = this.form["medicine"]
        this.instruction = this.form["instruction"]
        this.duration = this.form["duration"]
        
        this.adv = this.form["adv"]
        this.add_adv = document.getElementById("add_advice")
        this.advice = this.form["advice"]

        this.follow_up = this.form["follow_up"]
        this.submit_btn = document.getElementsByTagName("button")[0]
    }
    set_data(){
        // department
        this.department.value = Prescription.user_data["dept"]
        this.department.disabled = true
        // patient
        this.patient_name.placeholder = "Patient Name"
        this.patient_name.required = true
        // gender
        var gender_available = ["Male", "Female"]
        var genders_list = document.getElementById("genders")
        for(var gender of gender_available){
            var opt = document.createElement("option")
            opt.value = gender
            genders_list.appendChild(opt)
        }
        this.gender.placeholder = "Gender"
        this.gender.required = true
        // age
        this.age.min = "0"
        this.age.max = "150"
        this.age.placeholder = "Age"
        this.age.required = true

        var data_available = ["M", "Y"]
        var age_types_list = document.getElementById("age_types")
        for(var age_type of data_available){
            var opt = document.createElement("option")
            opt.value = age_type
            age_types_list.appendChild(opt)
        }
        this.age_type.placeholder = "M/Y"
        this.age_type.required = true
        // blood_group
        var data_available = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]
        var blood_groups_list = document.getElementById("blood_groups")
        for(var blood_group of data_available){
            var opt = document.createElement("option")
            opt.value = blood_group
            blood_groups_list.appendChild(opt)
        }
        this.blood_group.placeholder = "Blood Group"
        this.blood_group.required = true
        // weight
        this.weight.min = "0"
        this.weight.max = "200"
        this.weight.placeholder = "Weight"
        this.weight.required = true
        // payment
        this.paid.min = "0"
        this.paid.placeholder = "Paid"
        this.paid.required = true
        
        var data_available = ["BDT", "USD"]
        var currency_list = document.getElementById("currencies")
        for(var currency of data_available){
            var opt = document.createElement("option")
            opt.value = currency
            currency_list.appendChild(opt)
        }
        this.currency.placeholder = "BDT/USD"
        this.currency.required = true
        // date
        var year = this.new_date.getFullYear()
        var month = String(this.new_date.getMonth() + 1).padStart(2, "0")
        var today_date = String(this.new_date.getDate()).padStart(2, "0")
        var date_pattern = `${year}-${month}-${today_date}`
        this.date.value = date_pattern
        this.date.disabled = true
        // left_section
        this.bp.placeholder = "BP"
        this.pulse.placeholder = "Pulse"

        this.complaint.required = true
        this.examinations.required = true
        this.diagnosis.required = true
        // right_section
        var data_available = []
        Prescription.xhr.onload = function(){
            if(this.readyState == 4 && this.status == 200){
                data_available = this.response
                var medicine_list = document.getElementById("medicines")
                for(var medicine of data_available){
                    var opt = document.createElement("option")
                    opt.value = medicine["brandName"]
                    medicine_list.appendChild(opt)
                }
            }
        }
        Prescription.xhr.open("GET", Prescription.url + "/doctors/medicines")
        Prescription.xhr.setRequestHeader("Authorization", localStorage.getItem("token"))
        Prescription.xhr.send()
        this.medicine.placeholder = "Medicine"

        var data_available = ["1+0+1", "1+1+1", "0+0+1", "1+0+0", "0+1+0", "1+1+0", "0+1+1", "1+1+1+1"]
        var instruction_list = document.getElementById("instructions")
        for(var instruction of data_available){
            var opt = document.createElement("option")
            opt.value = instruction
            instruction_list.appendChild(opt)
        }
        this.instruction.placeholder = "Instruction"

        this.duration.placeholder = "Duration"

        var data_available = ["Don't stay on shower for long", "Drink hot water when necessary"]
        var advice_list = document.getElementById("advices")
        for(var advice of data_available){
            var opt = document.createElement("option")
            opt.value = advice
            advice_list.appendChild(opt)
        }
        this.adv.placeholder = "Advice"

        var data_available = ["1 week", "1 month"]
        var follow_up_list = document.getElementById("follow_ups")
        for(var follow_up of data_available){
            var opt = document.createElement("option")
            opt.value = follow_up
            follow_up_list.appendChild(opt)
        }
        this.follow_up.placeholder = "Follow Up"
    }
    textarea_bullet(event){
        // special_thanks => https://stackoverflow.com/a/57042927
        var bullet = "\u2022"
        var {key, target} = event
        var {selectionStart, value} = target
    
        if(value[0] != bullet && value.length > 0) target.value = `${bullet} ${value}`
        if(key == "Enter"){
            target.value = [...value].map((c, i) => i === selectionStart - 1 ? `\n${bullet} ` : c).join("")

            target.selectionStart = selectionStart + `${bullet} `.length
            target.selectionEnd = selectionStart + `${bullet} `.length
        }
    }
    add_medicine(){
        var form = document.forms[0]
        if(form["medicine"].value){
            if(form["instruction"].value){
                if(form["duration"].value){
                    if(parseInt(form["duration"].value) > 0 && parseInt(form["duration"].value) <= 365){
                        var form = document.forms[0]
                        var table = form.getElementsByTagName("table")[0]
                        var row_count = table.tBodies[0].rows.length + 1

                        var tbody = form.getElementsByTagName("tbody")[0]
                        var row = tbody.insertRow()

                        var cell_1 = row.insertCell(0)
                        var cell_2 = row.insertCell(1)
                        var cell_3 = row.insertCell(2)
                        var cell_4 = row.insertCell(3)
                        var cell_5 = row.insertCell(4)

                        cell_1.innerHTML = row_count
                        cell_2.innerHTML = form["medicine"].value
                        cell_3.innerHTML = form["instruction"].value
                        cell_4.innerHTML = form["duration"].value 
                        cell_5.innerHTML = `<img class="rem_med" src="../resources/sub.png">`

                        form["medicine"].value = ""
                        form["instruction"].value = ""
                        form["duration"].value = ""
                    }
                    else alert("Duration Range 0-365"); form["duration"].focus()
                }
                else form["duration"].focus()
            }
            else form["instruction"].focus()
        }
        else form["medicine"].focus()
    }
    rem_medicine(event){
        if(event.target.className === "rem_med") event.target.closest("tr").remove()
    }
    add_advice(event){
        var bullet = "\u2022"

        var adv = event.target.closest("div").getElementsByTagName("input")[0]
        var text_area = document.forms[0].getElementsByTagName("textarea")
        text_area = text_area[text_area.length -1]

        if(text_area.value.length == 0 && adv.value.length != 0){
            text_area.value += `${bullet} ${adv.value}`
            adv.value = ""
        }
        else if(adv.value.length != 0){
            text_area.value += `\n${bullet} ${adv.value}`
            adv.value = ""
        }
    }
    static name_validation(_name){
        if(_name.value){
            var regex = /^[A-Z][a-zA-Z]{3,}(?: [A-Z][a-zA-Z]*){0,2}$/
            if(!regex.test(_name.value)){
                _name.value = ""
                _name.focus()
                alert("Incorrect Format")
                return null
            }
            return _name.value
        }
        else{
            _name.focus()
            alert("Patient Name Can't Be Empty")
            return null
        }
    }
    static gender_validation(_gender){
        if(_gender.value){
            if(_gender.value != "Male" && _gender.value != "Female"){
                _gender.value = ""
                _gender.focus()
                alert("Select Gender Between Male/Female")
                return null
            }
            return _gender.value
        }
        else{
            _gender.focus()
            alert("Select Gender")
            return null
        }
    }
    static age_validation(_age){
        if(parseInt(_age.value)){
            var value = parseInt(_age.value)
            if(value < 0 || value > 150){
                _age.value = ""
                _age.focus()
                alert("Range 0-150")
                return null
            }
            return _age.value
        }
        else{
            _age.focus()
            alert("Invalid Age Data")
            return null
        }
    }
    static age_type_validation(_type){
        if(_type.value){
            if(_type.value != "M" && _type.value != "Y"){
                _type.value = ""
                _type.focus()
                alert("Select Age Type Between Month/Year")
                return null
            }
            return _type.value
        }
        else{
            _type.focus()
            alert("Select Age Type")
            return null
        }
    }
    static blood_group_validation(_group){
        if(_group.value){
            if(_group.value != "A+" && _group.value != "A-" && _group.value != "B+" && _group.value != "B-" && _group.value != "O+" && _group.value != "O-" && _group.value != "AB+" && _group.value != "AB-"){
                _group.value = ""
                _group.focus()
                alert("Improper Blood Group")
                return null
            }
            return _group.value
        }
        else{
            _group.focus()
            alert("Select Blood Group")
            return null
        }
    }
    static weight_validation(_weight){
        if(_weight.value){
            var value = parseInt(_weight.value)
            if(value < 0 || value > 200){
                _weight.value = ""
                _weight.focus()
                alert("Range 0-200")
                return null
            }
            return _weight.value
        }
        else{
            _weight.focus()
            alert("Enter Weight")
            return null
        }
    }
    static payment_validation(_paid){
        if(_paid.value){
            var value = parseInt(_paid.value)
            if(value < 0 || value > 1000){
                _paid.value = ""
                _paid.focus()
                alert("Range 0-1000")
                return null
            }
            return _paid.value
        }
        else{
            _paid.focus()
            alert("Enter Amount Paid")
            return null
        }
    }
    static currency_validation(_currency){
        if(_currency.value){
            if(_currency.value != "BDT" && _currency.value != "USD"){
                _currency.value = ""
                _currency.focus()
                alert("Select Currency Between BDT/USD")
                return null
            }
            return _currency.value
        }
        else{
            _currency.focus()
            alert("Select Currency")
            return null
        }
    }
    static bp_validation(_bp){
        if(_bp.value){
            _bp.value = _bp.value.split(" ").join("")
            var arr = _bp.value.split("/")
            if(arr.length == 2){
                if((arr[0] >= 0 && arr[0] <= 200) && (arr[1] >=0 || arr[1] <= 200)){
                    return _bp.value
                }
            }
            else{
                _bp.value = ""
                _bp.focus()
                alert("BP Format: 120/80")
                return null
            }
        }
        return null
    }
    static pulse_validation(_pulse){
        if(_pulse.value){
            var value = parseInt(_pulse.value)
            if(value < 0 || value > 250){
                _pulse.value = ""
                _pulse.focus()
                alert("Range 0-250")
                return null
            }
            return _pulse.value
        }
        return null
    }
    static complaint_validation(_complaint){
        if(_complaint.value){
            var bullet = "\u2022"
            var regex = /^[a-zA-Z0-9-']+( [a-zA-Z0-9-']+)*$/
            var str = _complaint.value
            str = str.replaceAll(`${bullet} `, "")
            var arr = str.split("\n").filter(n => n)
            for(var i of arr){
                if(!regex.test(i)){
                    _complaint.focus()
                    alert("Wrong Input Format in Complaint")
                    return null
                }
            }
            return arr
        }
        else{
            _complaint.focus()
            alert("Complaint Cannot Be Empty")
            return null
        }
    }
    static examinations_validation(_examinations){
        if(_examinations.value){
            var bullet = "\u2022"
            var regex = /^[a-zA-Z0-9-']+( [a-zA-Z0-9-']+)*$/
            var str = _examinations.value
            str = str.replaceAll(`${bullet} `, "")
            var arr = str.split("\n").filter(n => n)
            for(var i of arr){
                if(!regex.test(i)){
                    _examinations.focus()
                    alert("Wrong Input Format in Examinations")
                    return null
                }
            }
            return arr
        }
        else{
            _examinations.focus()
            alert("Examinations Cannot Be Empty")
            return null
        }
    }
    static diagnosis_validation(_diagnosis){
        if(_diagnosis.value){
            var bullet = "\u2022"
            var regex = /^[a-zA-Z0-9-']+( [a-zA-Z0-9-']+)*$/
            var str = _diagnosis.value
            str = str.replaceAll(`${bullet} `, "")
            var arr = str.split("\n").filter(n => n)
            for(var i of arr){
                if(!regex.test(i)){
                    _diagnosis.focus()
                    alert("Wrong Input Format in Diagnosis")
                    return null
                }
            }
            return arr
        }
        else{
            _diagnosis.focus()
            alert("Diagnosis Cannot Be Empty")
            return null
        }
    }
    static investigation_validation(_investigation){
        if(_investigation.value){
            var bullet = "\u2022"
            var regex = /^[a-zA-Z0-9-']+( [a-zA-Z0-9-']+)*$/
            var str = _investigation.value
            str = str.replaceAll(`${bullet} `, "")
            var arr = str.split("\n").filter(n => n)
            for(var i of arr){
                if(!regex.test(i)){
                    _investigation.focus()
                    alert("Wrong Input Format in Investigation")
                    return null
                }
            }
            return arr
        }
        return null
    }
    static advice_validation(_advice){
        if(_advice.value){
            var bullet = "\u2022"
            var regex = /^[a-zA-Z0-9-']+( [a-zA-Z0-9-']+)*$/
            var str = _advice.value
            str = str.replaceAll(`${bullet} `, "")
            var arr = str.split("\n").filter(n => n)
            for(var i of arr){
                if(!regex.test(i)){
                    _advice.focus()
                    alert("Wrong Input Format in Advice")
                    return null
                }
            }
            return arr
        }
        return null
    }
    static follow_up_validation(_follow_up){
        if(_follow_up.value){
            var regex = /^[a-zA-Z0-9-']+( [a-zA-Z0-9-']+)*$/
            if(!regex.test(_follow_up.value)){
                _follow_up.value = ""
                _follow_up.focus()
                alert("Wrong Input In Follow_Up")
                return null
            }
            return _follow_up.value
        }
        return null
    }
    static table_validation(_table){
        if(_table.rows.length > 0){
            var arr = []
            for(var row of _table.rows){
                var med = {}
                var temp_arr = row.cells[2].innerHTML.split("+")
                if(temp_arr.length > 3){
                    med["morning"] = 0.0
                    med["noon"] = 0.0
                    med["night"] = 0.0
                }
                else if(temp_arr.length == 3){
                    med["morning"] = parseFloat(temp_arr[0])
                    med["noon"] = parseFloat(temp_arr[1])
                    med["night"] = parseFloat(temp_arr[2])
                }
                else{
                    alert("Wrong Data In Table Instruction")
                    return null
                }
                med["id"] = NaN
                med["name"] = row.cells[1].innerHTML
                med["duration"] = row.cells[3].innerHTML
                med["total_count"] = temp_arr.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
                arr.push(med)
            }
            return arr
        }
        else{
            alert("Empty Table")
            return null
        }
    }
    parse_form(event){
        event.preventDefault()
        var form = document.forms[0]

        var data = {
            "department": form["department"].value,
            "date": form["date"].value
        }
        // name_validation
        data["patient_name"] = Prescription.name_validation(form["patient_name"])
        // gender_validation
        data["gender"] = Prescription.gender_validation(form["gender"])
        // age_validation
        data["age"] = Prescription.age_validation(form["age"])
        // age_type_validation
        data["age_type"] = Prescription.age_type_validation(form["age_type"])
        // blood_group_validation
        data["blood_group"] = Prescription.blood_group_validation(form["blood_group"])
        // weight_validation
        data["weight"] = Prescription.weight_validation(form["weight"])
        // payment_validation
        data["paid"] = Prescription.payment_validation(form["paid"])
        // currency_validation
        data["currency"] = Prescription.currency_validation(form["currency"])
        // bp_validation
        data["bp"] = Prescription.bp_validation(form["bp"])
        // pulse_validation
        data["pulse"] = Prescription.pulse_validation(form["pulse"])
        // complaint_validation
        data["complaint"] = Prescription.complaint_validation(form["complaint"])
        // examinations_validation
        data["examinations"] = Prescription.examinations_validation(form["examinations"])
        // diagnosis_validation
        data["diagnosis"] = Prescription.diagnosis_validation(form["diagnosis"])
        // investigation_validation
        data["investigation"] = Prescription.investigation_validation(form["investigation"])
        // advice_validation
        data["advice"] = Prescription.advice_validation(form["advice"])
        // follow_up_validation
        data["follow_up"] = Prescription.follow_up_validation(form["follow_up"])
        // table_validation
        data["medicine"] = Prescription.table_validation(document.forms[0].getElementsByTagName("table")[0].tBodies[0])

        if(data["patient_name"]){
            if(data["gender"]){
                if(data["age"]){
                    if(data["age_type"]){
                        if(data["blood_group"]){
                            if(data["weight"]){
                                if(data["paid"]){
                                    if(data["currency"]){
                                        if(data["complaint"]){
                                            if(data["examinations"]){
                                                if(data["diagnosis"]){
                                                    if(data["medicine"]){
                                                        Prescription.xhr.onload = function(){
                                                            if(this.readyState == 4 && this.status == 200){
                                                                alert("Submitted")
                                                            }
                                                            else alert("Failed")
                                                        }
                                                        Prescription.xhr.open("POST", Prescription.url + "/doctors/prescribe")
                                                        Prescription.xhr.setRequestHeader("Content-Type", "application/json")
                                                        Prescription.xhr.setRequestHeader("Authorization", Prescription.user_data["token"])
                                                        Prescription.xhr.send(JSON.stringify(data))
                                                    }
                                                    else form.reportValidity()
                                                }
                                                else form.reportValidity()
                                            }
                                            else form.reportValidity()
                                        }
                                        else form.reportValidity()
                                    }
                                    else form.reportValidity()
                                }
                                else form.reportValidity()
                            }
                            else form.reportValidity()
                        }
                        else form.reportValidity()
                    }
                    else form.reportValidity()
                }
                else form.reportValidity()
            }
            else form.reportValidity()
        }
        else form.reportValidity()
    }
}