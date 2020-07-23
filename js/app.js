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
