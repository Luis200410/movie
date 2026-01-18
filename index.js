const form = document.getElementById('movie-form')
const movieContainer = document.getElementById('movie-container')
const apiKey = "eb42fd7d"


form.addEventListener('submit', function(e){
    e.preventDefault()
    const search = document.getElementById('movie-title').value
    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t=${search}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            movieContainer.innerHTML =
            `<div class="movie-card">
                <h3>${data.Title}</h3>
                <p>Released: ${data.Released}</p>
                <p>Genre: ${data.Genre}</p>
                <p>Director: ${data.Director}</p>
                <img src="${data.Poster}" alt="Movie Poster">
            </div>`

            })
})

