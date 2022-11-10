const wishlistForm = document.querySelector("#addwishlist");
wishlistForm.addEventListener("submit", e => {
    e.preventDefault();
    const listObj = {
        name: document.querySelector("#wishlistName").value,
    }

    fetch("/api/wishlists", {
        method: "POST",
        body: JSON.stringify(listObj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.ok) {
            location.reload()
        } else {
            alert("trumpet sound")
        }
    })
})

const delButtons = document.querySelectorAll(".delBtn");

delButtons.forEach(delBtn => {
    delBtn.addEventListener("click", e => {
        const listId = e.target.getAttribute("data-listid")
        console.log(listId);
        fetch(`/api/wishlists/${listId}`, {
            method: "DELETE"
        }).then(res => {
            if (res.ok) {
                location.reload();
            } else {
                alert("trumpet sound")
            }
        })
    })
})