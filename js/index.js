document.addEventListener("DOMContentLoaded", function() {
fetch('http://localhost:3000/books')
.then(res => res.json())
.then(json => json.forEach(book => showList(book)))

const showList = (book) => {
    let ul = document.querySelector('ul')
    let li = document.createElement('li')
    li.innerText = book.title
    li.addEventListener('click', (e) => showBook(e, book))
    ul.appendChild(li)

}

const showBook = (e,book) => {
    let showPanel = document.getElementById('show-panel')
    showPanel.innerHTML = ''
    console.log(book)
    let div = document.createElement('div')
    div.className = 'card'
    div.id = book.id
    //Adding the book id here will let us grab 
    //the card elm after we append it
  
    div.innerHTML = `
        <img src=${book.img_url} />
        <h3>${book.title}</h3>
        <h4>${book.author}</h4>
        <p>${book.description}</p> 
    `
    showPanel.appendChild(div)
    //Now that our div is on the Dom
    //We can grab it by the book.id

    let bookCard = document.getElementById(book.id)
    book.users.forEach(user => {
        let li = document.createElement('li')
        li.innerText = user.username
        bookCard.appendChild(li)
    })

    let btn = document.createElement('button')
    btn.innerText = 'like'

    btn.addEventListener('click', addLike(book))

}

const addLike = (book) => {
    let arr = book.users
    arr.push({"id":1, "username":"pouros"})
    fetch(`http://localhost:3000/books/${book.id}`,{
        method:'PATCH',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({users:arr})
    })
    
}
});

// author: "Yoko Ono"
// description: "Back in print for the first time in nearly thirty years, here is Yoko Ono's whimsical, delightful, subversive, startling book of instructions for art and for life. 'Burn this book after you've read it.' -- Yoko 'A dream you dream alone may be a dream, but a dream two people dream together is a reality. This is the greatest book I've ever burned.' -- John"
// id: 1
// img_url: "https://books.google.com/books/content?id=3S8Rwr-iBdoC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
// subtitle: "A book of Instruction and Drawings."
// title: "Grapefruit"
// users: (2) [{…}, {…}]