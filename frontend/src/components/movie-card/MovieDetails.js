
import './MovieCard.css'
function MovieDetails(props) {


    console.log(props);

    return (
        <div key={props.movie.id} className='movie-card'>
            <img src={props.movie.Poster}/>
            <h3>{props.movie.Title}</h3>
            <div>{props.movie.Director}</div>
            <div>{props.movie.Plot}</div>
            {
                props.movie.Actors.split(', ').map( star => <div key={star}>{star}</div>)
            }
            <div>{props.movie.Country}</div>
            <div>{props.movie.Year}</div>
        </div>
    )
}

export default MovieDetails;