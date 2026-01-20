const form = document.getElementById('movie-form')
const search = document.getElementById('movie-title')
const moviesContainer = document.getElementById('movies')
const apiKey = "eb42fd7d"


function firstPull(e){
    e.preventDefault()
    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${search.value}&type=movie`)
        .then(res => res.json())
        .then(data => {
            const movies = data.Search
            movies.forEach(movie => {
                console.log(movie)
                fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}&type=movie`)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        moviesContainer.innerHTML += `
                            <div class="movie">
                                <div class="movieImage">
                                    <img src="${data.Poster}" alt="Movie Poster">
                                </div>
                                <div class="details">
                                    <div class="title-rating">
                                        <h3>${data.Title}</h3>
                                        <p>${data.imdbRating}</p>
                                    </div>
                                    <div class="info">
                                        <p>${data.Runtime}</p>
                                        <p>Genre: ${data.Genre}</p>
                                        <button class="add-watchlist" id="watchlist"><span></span>Watchlist</button>
                                    </div>
                                    <div class="plot">
                                        <p>${data.Plot}</p>
                                    </div>
                                </div>
                            </div>
                            `
                    })
            })
    })

    
}


form.addEventListener('submit', firstPull)


    
// }






