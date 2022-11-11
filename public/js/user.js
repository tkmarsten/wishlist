const { User } = require('../../models')
console.log("user.js linked")

// const searchForm = document.querySelector("#searchUser");
// searchForm.addEventListener("submit", e => {
//     e.preventDefault();
//     console.log('PREVENTED DEFAULT!')
//     const userID =document.querySelector("#searchUsername").value
//     console.log(`userID ${userID}`)
//     fetch("/api/users/", {
//         method: "GET",
//         id: userID
//     }).then(res => {
//         if (res.ok) {
//             console.log(res)
//             location.replace(`/api/users/${userID}`)
//         } else {
//             alert("error finding user")
//         }
//     })
// })


const searchForm = document.querySelector("#searchUser");
searchForm.addEventListener("submit", e => {
    e.preventDefault();
    console.log('PREVENTED DEFAULT!')
    const userName =document.querySelector("#searchUsername").value
    console.log(`username is ${userName}`)
    // fetch("/api/users/", {
    //     method: "GET",
    //     where: {
    //         username: userName
    //       }
    // })
})
// .then(res => {
//     if (res.ok) {
//         console.log(res)
//         // location.replace(`/api/users/${username}`)
//     } else {
//         alert("error finding user")
//     }
// })

   
