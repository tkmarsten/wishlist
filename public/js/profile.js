const wishlistForm = document.querySelector("#addWishlist");
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