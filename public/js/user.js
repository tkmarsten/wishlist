const searchForm = document.querySelector("#searchUser");
searchForm.addEventListener("submit", e => {
    e.preventDefault();
    console.log('PREVENTED DEFAULT!')
    const userName =document.querySelector("#searchUsername").value
    console.log(`userName ${userName}`)
    fetch(`/api/users/search/${userName}`, {
        method: "GET",
    }).then(res => {
        if (res.ok) {
            console.log(res)
            location.replace(`/api/users/search/${userName}`)
        } else {
            alert("error finding user")
        }
    })
})