export default function Validation({...props}) {
    const error = {}

    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
    const password_pattern = /[0-9a-zA-Z]{6,}/;
    // const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    if(props.fullName === ""){
        error.fullName = "This field is required!";
    }
    if(props.email === ''){
        error.email = "This field is required!";
    } else if(!email_pattern.test(props.email)){
        error.email = "Email is not correct";
    }
    if(props.password === ''){
        error.password = "This field is required!";
    } else if(!password_pattern.test(props.password)){
        error.password = "Minimum 6 digit password is required!"
    }
    if(props.mobNo === ''){
        error.mobno = "This field is required!";
    }
    else if(props.mobNo.length != 10){
        error.mobno = "10 digit mobile number required!"
    }
    if(props.mark_x === ''){
        error.marksX = "This field is required!";
    }
    if(props.mark_xii === ''){
        error.marksXII = "This field is required!";
    }
    if(props.mark_degree === ''){
        error.marksDegree = "This field is required!";
    }

    return error;
}

export const recruiterRegistrationValidation = ({orgName, email, password, mobNo}) => {
    const error = {}

    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
    const password_pattern = /[0-9a-zA-Z]{6,}/;

    if(email === ''){
        error.email = "This field is required!";
    } else if(!email_pattern.test(email)){
        error.email = "Email is not correct";
    }
    if(password === ''){
        error.password = "This field is required!";
    } else if(!password_pattern.test(password)){
        error.password = "Minimum 6 digit password is required!"
    }

    if(orgName === ""){
        error.orgName = "This field is required!";
    }

    if(mobNo === ''){
        error.mobno = "This field is required!";
    }

    return error
}

export const logInValidations = ({email, password}) => {
    const error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
    const password_pattern = /[0-9a-zA-Z]{6,}/;

    if(email === ''){
        error.email = "This field is required!";
    } else if(!email_pattern.test(email)){
        error.email = "Email is not correct";
    }
    if(password === ''){
        error.password = "This field is required!";
    } else if(!password_pattern.test(password)){
        error.password = "Minimum 6 digit password is required!"
    }
    console.log(email);

    return error;
}