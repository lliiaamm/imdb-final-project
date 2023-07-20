
import './MovieCard.css'
function MovieCard(props) {

    async function addToFavorites() {
        // get the movie from imdb to get the movie type (movie or tv)
        // using HTTP GET
        const movieResp = await fetch('http://www.omdbapi.com/?apikey=19861f44&s=&i=' + props.movie.imdbID);
        const movieData = await movieResp.json()

        const userJson = localStorage.getItem('user')
        const user = JSON.parse(userJson);

        const movie = props.movie
        movie.Plot = movieData.Plot;    // copy the movie type from imdb response to our movie

        // add the movie to favories. using HTTP PATCH
        const response = await fetch('http://127.0.0.1:5000/user', {
            method: 'PATCH',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ userId: user._id, movie: movie })
        });
        // read the response from our server
        const updatedUser = await response.json()
        if (updatedUser.msg) {      // if we have msg field,  there is an error
            alert(updatedUser.msg)
        } else {
            alert(movie.Title + " was added successfully")
        }
    }

    async function removeFromFavorites(event) {
        event.stopPropagation();    // don't send the event to parent html (div)
        props.removeFunc(props.movie);       
    }

    function handleOnClick() {
        if (props.onClick) {
            props.onClick(props.movie)
        }
    }
    
    return (
        <div key={props.movie.id} className='movie-card' onClick={handleOnClick}>
            <img src={props.movie.Poster} />
            <h3>{props.movie.Title}</h3>
            <div>Type: {props.movie.Type}</div>
            {
                props.remove ? <button onClick={removeFromFavorites}>Delete</button>
                    :
                    <button onClick={addToFavorites}>Add to favorites</button>

            }
        </div>
    )
}

export default MovieCard;