/*----- Movie Search -----*/
let key = "915f760d";
let search = document.getElementById("search");

search.addEventListener("keyup", (e) => {
    var searchKey = e.target.value;
    SearchMovies(searchKey);
});

// if you needed async callbacks start with async keyword
async function SearchMovies(searchKey) {
    let BASE_URL = `https://www.omdbapi.com/?s=${searchKey}&apikey=${key}`; 
    
    let NoMoviePoster = 'https://raw.githubusercontent.com/tineshwar-singh/SnT_movies/main/images/download.png';

    // alternative solution of then & catch => es6
    // res7 feature called async and await

    try {
        let response = await window.fetch(BASE_URL);
        let movies = await response.json();
        movies.Search.sort(function(a, b){return b.Year-a.Year});
        let output = [];

        for (let movie of movies.Search) {
            let setDefaultPoster = movie.Poster === "N/A" ? NoMoviePoster : movie.Poster;

            output += `
                <div class="custom_card">
                    <div class="movie-poster">
                        <img src="${setDefaultPoster}" class="image" alt="${movie.Title}"/>
                    </div>
                    <div class="movie-body">
                        <h4 class="title">${movie.Title}</h4>
                        <h4 class="type">${movie.Type}</h4>
                        <p class="year">Year - ${movie.Year}</p>
                    </div>
                </div>
            `;
        }
        document.getElementById("movie-content").innerHTML = output;
    } catch (error) {
        console.error(error);        
    }
};
