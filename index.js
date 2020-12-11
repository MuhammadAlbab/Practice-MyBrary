var testAPI = document.getElementById("testAPI")
var maxResult = 12
var searchBook = document.getElementById('searchKey')
searchBook.addEventListener('keyup', loadDoc)
var seemore = document.getElementById('see-more')
seemore.addEventListener('click', loadDoc)
function loadDoc(event) {
    if(event.keyCode === 13 || event.button === 0){
        if(event.button === 0) maxResult = maxResult + 12
        fetch("https://www.googleapis.com/books/v1/volumes?q=" + searchBook.value + "&maxResults=" + maxResult, {
            "method": "GET",
        })
        .then(response => response.json())
        .then(data => {
            testAPI.innerHTML = ""
            var books = data.items
            var pagination = data.totalItems / 12
            books.forEach(function(item, index){
                var author = (item.volumeInfo.authors != undefined) ? item.volumeInfo.authors.join(', ') : ""
                var countCharAuthor = (author.length > 30) ? ' . . .' : ''
                var thumbnail = (item.volumeInfo.imageLinks != undefined) ? item.volumeInfo.imageLinks.thumbnail : ""
                var bookYear = (item.volumeInfo.publishedDate != undefined) ? item.volumeInfo.publishedDate.substring(0, 4) : ""
                var cartRow = document.createElement('div')
                var countCharTitle = (item.volumeInfo.title.length > 50) ? ' . . .' : ''
                var booksContents = `
                <div class="section-items">
                    <img class="item-book" src="` + thumbnail + `">
                    <div class="item-details">
                        <h2 class="section-items item-name">` + item.volumeInfo.title.substring(0, 50) + countCharTitle + `</h2>
                        <div class="section-items item-author">` + author.substring(0, 30) + countCharAuthor + `</div>
                        <div class="section-items item-year">` + bookYear + `</div>
                        <a class="click-item-details" href="detail.html?link=` + item.selfLink + `">Details!</a>
                    </div>
                </div>`
                cartRow.innerHTML = booksContents
                testAPI.append(cartRow)
            })
        })
        .catch(err => {
            console.error(err);
        })
    }
}