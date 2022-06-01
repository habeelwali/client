const valid=({fullname,username ,email, password, cf_password, })=>{
    const err = {}
    
    if(!fullname){
        err.fullname="Please add your full name"
    }else if(!fullname.match(/^[A-Za-z]+$/)){
        err.fullname="add character only"
    }else if(fullname.length >25){
        err.fullname="Full name is up to 25 character long"
    }

    if(!username){
        err.username="Please add your user name"
    }else if(username.replace(/ /g, "").length >25){
        err.username="User name is up to 25 character long"
    }

    if(!email){
        err.email="Please add your email"
    }else if(isEmailValid(email) ){
        err.email="email formate is incorrect"
    }
    if(!password){
        err.password="Please add your password"
    }else if(password.length<6 ){
        err.email="password must me at least 6 character"
    }
    if(password !== cf_password){
        err.cf_password="password is not match"
    }

    return {
        errMsg:err,
        errLength:Object.keys(err).length
    }
}

function isEmailValid(email) {
    var EMAIL_REGEXP = new RegExp('^[a-z0-9]+(/.[_a-z0-9]+)*@[a-z0-9-]+(/.[a-z0-9-]+)*(/.[a-z]{2,15})$', 'i');
    return EMAIL_REGEXP.test(email)
}

export default valid