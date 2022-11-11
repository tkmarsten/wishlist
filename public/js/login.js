const loginForm = document.querySelector("#login");
loginForm.addEventListener("submit", e => {
    e.preventDefault();
    console.log('PREVENTED DEFAULT!')
    const userObj = {
        username: document.querySelector("#loginUser").value,
        password: document.querySelector("#loginPassword").value,
    }
    fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.ok) {
            location.replace("/profile")
        } else {
            alert("error logging in")
        }
    })
})

const signupForm = document.querySelector("#signup");
signupForm.addEventListener("submit",e=>{
    e.preventDefault();
    console.log('PREVENTED DEFAULT!')
    const userObj = {
        username:document.querySelector("#signupUser").value,
        password:document.querySelector("#signupPassword").value,
        first_name:document.querySelector("#signupFirst").value,
        last_name:document.querySelector("#signupLast").value,
    }
    fetch("/api/users/",{
        method:"POST",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            alert("signed up!")
            location.replace("/profile")
        } else {
            alert("error signing up")
        }
    })
})