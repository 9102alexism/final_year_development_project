const validate = (_data) => {
    let email = _data["email"].value
    let password = _data["pwd"].value
    if(email.length > 5){
        if(password.length > 5){
            return true
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
}