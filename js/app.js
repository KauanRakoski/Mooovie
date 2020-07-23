$('document').ready(() => {
    $('#search-form').on('submit', (e) => {
        let search = $('#searchText').val();
        $('#searchText').val('');
        getMovies(search)
        e.preventDefault();
    });
});

function getMovies(search) {
    axios.get('http://www.omdbapi.com/?s='+search+'&apikey=b321aa74')
    .then((response) => {
        console.log(response);
        let movies = response.data.Search;
        let output = '';

        $.each(movies, (index, movie) => {
           output += `
           <div class="col-md-3">
            <div class="well text-center">
                <img src="${movie.Poster}">
                <h5>${movie.Title}<h5>
                <a class="btn btn-primary" onclick="movieSelected('${movie.imdbID}')"  href="#">See movies</a>
            </div>
           </div>
           ` 
        });

        $('#movies').html(output)
    })
    .catch(err => console.log(err));
};

function movieSelected(id){
    try{
        sessionStorage.setItem("movieID", id);
        window.location = 'movie.html';

        return false;
    }catch(err){
        console.log(err);
    }
};

function getMovie(){
    let movieID = sessionStorage.getItem("movieID");

    axios.get('http://www.omdbapi.com/?i='+movieID+'&apikey=b321aa74')
    .then((response) => {
        console.log(response);
        let movie = response.data;

        let output = `
        <div class="row">
            <div class="col-md-4">
                <img class="thumbnail" src="${movie.Poster}">
                
            </div>
            <div class="col-md-8">
                <h2 class="mv-title">${movie.Title}</h2>
                <ul class="list-group">
                    <li class="list-group-item"><strong>Genre: </strong>${movie.Genre}</li>
                    <li class="list-group-item"><strong>Released: </strong>${movie.Released}</li>
                    <li class="list-group-item"><strong>Writer: </strong>${movie.Writer}</li>
                    <li class="list-group-item"><strong>Director: </strong>${movie.Director}</li>
                    <li class="list-group-item"><strong>Actors: </strong>${movie.Actors}</li>
                    <li class="list-group-item"><strong>IMDB rating: </strong>${movie.imdbRating}</li>
                </ul>
            </div>

            <div class="row">
                <div class="well">
                    <h3>Plot: </h3>
                    <p>${movie.Plot}</p>
                    <hr>
                    <a target="_blank" href="https://www.imdb.com/title/${movieID}" class="btn btn-primary">VIEW IN IMDB<a>
                    <a href="index.html" class="btn btn-secondary">GO BACK TO SEARCH<a> 
                </div>
                
            </div>
        </div>



        
        `;

        $('#movie').html(output);
    })
    .catch(err => console.log(err));
};
