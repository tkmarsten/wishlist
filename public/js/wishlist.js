const priorityEls = document.querySelectorAll('.priority')
priorityEls.forEach(element => {
  switch (element.innerHTML.toLowerCase()) {
    case 'low':
      element.className = 'text-bg-success'
      break
    case 'medium':
      element.className = 'text-bg-warning'
      break
    case 'high':
      element.className = 'text-bg-danger'
      break
  }
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


// update wishlist
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

let itemId = null
let itemQuantity = null
const itemCards = document.querySelector('#itemCards')
itemCards.addEventListener('click', e => {
  console.log(e.target.parentElement)
  itemId = e.target.parentElement.getAttribute('data-itemId')
  itemQuantity = e.target.parentElement.getAttribute('data-itemQuantity')
})


// update items
const editItemForm = document.querySelector("#editItem")
editItemForm.addEventListener('submit', e => {
  e.preventDefault()

  const formQuantity = document.querySelector('#editItemQuantity').value

  const itemObj = {
    quantity: formQuantity === "" ? itemQuantity : formQuantity,
    priority: document.querySelector('#editPriorityLevel').value,
    link: document.querySelector('#editItemLink').value,
  }

  fetch(`/api/items/${itemId}`, {
    method: 'PUT',
    body: JSON.stringify(itemObj),
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