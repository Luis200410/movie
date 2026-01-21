const form = document.getElementById('movie-form')
const search = document.getElementById('movie-title')
const moviesContainer = document.getElementById('movies')
const apiKey = "eb42fd7d"

let watchList = []

moviesContainer.addEventListener("click", function(e){
    if (e.target.classList.contains('add-watchlist')){
        let watchList = JSON.parse(localStorage.getItem('myWatchlist'))
        const movieWatch = {
            id: e.target.dataset.imdb,
            title: e.target.dataset.title,
            rating: e.target.dataset.rating,
            image: e.target.dataset.poster,
            duration: e.target.dataset.runtime,
            genre: e.target.dataset.genre,
            resume: e.target.dataset.plot
        }

        watchList.push(movieWatch)
        localStorage.setItem('myWatchlist', JSON.stringify(watchList))
    }

})

async function firstPull(e){
    e.preventDefault()
    const res = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${search.value}&type=movie`)
    const data = await res.json()
    data.Search.forEach(async movie => {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`)
        const movieData = await response.json()
        renderSearch(movieData)
    })

    moviesContainer.innerHTML = ""
}


form.addEventListener('submit', firstPull)

function renderSearch(movieData){
    moviesContainer.innerHTML += `
        <div class="movie" id="${movieData.imdbID}">
            <div class="movieImage">
                <img src="${movieData.Poster}" alt="Movie Poster">
            </div>
            <div class="details">
                <div class="title-rating">
                    <h3>${movieData.Title}</h3>
                    <p>${movieData.imdbRating}</p>
                </div>
                <div class="info" id=""info>
                    <p>${movieData.Runtime}</p>
                    <p>Genre: ${movieData.Genre}</p>
                    <button class="add-watchlist" id="watchlist" type="button"
                        data-imdb="${movieData.imdbID}"
                        data-title="${movieData.Title}"
                        data-poster="${movieData.Poster}"
                        data-rating="${movieData.imdbRating}"
                        data-runtime="${movieData.Runtime}"
                        data-genre="${movieData.Genre}"
                        data-plot="${movieData.Plot}"
                        ><i class="fa-solid fa-circle-plus"></i> Watchlist</button>
                </div>
                <div class="plot">
                    <p>${movieData.Plot}</p>
                </div>
            </div>
        </div>
        `
}
