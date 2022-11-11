const addForm = document.querySelector("#addItem")
addForm.addEventListener('submit', e => {
  e.preventDefault()

  const listId = e.target.getAttribute("data-listId")

  const itemObj = {
    name: document.querySelector('#itemName').value,
    link: document.querySelector('#itemLink').value,
    quantity: document.querySelector('#itemQuantity').value,
    priority: document.querySelector('#priorityLevel').value,
    wishlist_id: listId
  }

  fetch(`/api/items`, {
    method: 'POST',
    body: JSON.stringify(itemObj),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    if (res.ok) {
      location.reload()
    } else {
      alert('stinky')
    }
  })
})

const editForm = document.querySelector("#editWishlist")
editForm.addEventListener('submit', e => {
  e.preventDefault()

  const listId = e.target.getAttribute("data-listId")

  const nameObj = {
    name: document.querySelector('#editListName').value
  }

  fetch(`/api/wishlists/${listId}`, {
    method: 'PUT',
    body: JSON.stringify(nameObj),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    if (res.ok) {
      location.reload()
    } else {
      alert('Error')
    }
  })
})

const delBtn = document.querySelector("#delBtn");
delBtn.addEventListener('click', e => {
  const listId = e.target.parentElement.getAttribute("data-listId")

  fetch(`/api/wishlists/${listId}`, {
    method: 'DELETE'
  }).then(res => {
    if (res.ok) {
      location.replace('/profile')
    } else {
      alert("trumpet sound")
    }
  })
})

const delItemBtns = document.querySelectorAll('.delItemBtn')
delItemBtns.forEach(itemBtn => {
  itemBtn.addEventListener('click', e => {
    const itemId = e.target.parentElement.getAttribute("data-itemId")
    console.log(itemId)

    fetch(`/api/items/${itemId}`, {
      method: 'DELETE'
    }).then(res => {
      if (res.ok) {
        location.reload()
      } else {
        alert('stinky')
      }
    })
  })
})