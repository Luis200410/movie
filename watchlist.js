const watchContainer = document.getElementById('movies-watchlist')
let watchList = JSON.parse(localStorage.getItem('myWatchlist'))
const loading = document.getElementById('loading-remove')

loading.style.display = 'flex'

watchList.forEach(movie => renderWatchlist(movie))

function renderWatchlist(movie){
    loading.style.display = 'none'
    watchContainer.innerHTML += `
    <div class="movie" id="${movie.id}">
        <div class="movieImage">
            <img src="${movie.image}" alt="Movie Poster">
        </div>
        <div class="details">
            <div class="title-rating">
                <h3>${movie.title}</h3>
                <p>${movie.rating}</p>
            </div>
            <div class="info">
                <p>${movie.duration}</p>
                <p>Genre: ${movie.genre}</p>
                <button class="remove-watchlist" data-id="${movie.id}" type"button"><i class="fa-solid fa-trash-can"></i> Remove</button>
            </div>
            <div class="plot">
                <p>${movie.resume}</p>
            </div>
        </div>
    </div>
`
}

watchContainer.addEventListener('click', removeMovie)

function removeMovie(e){
    if (e.target.classList.contains('remove-watchlist')){
        const targetId = e.target.dataset.id
        let watchList = JSON.parse(localStorage.getItem('myWatchlist'))
        watchList = watchList.filter(movie => movie.id !== targetId )
        localStorage.setItem('myWatchlist', JSON.stringify(watchList))
        watchContainer.innerHTML = ''
        watchList.forEach(movie => renderWatchlist(movie))
        if(watchList.length === 0){
            loading.style.display = 'flex'
        }
    }
}

