import {useState, useEffect} from 'react';
import MovieCard from '../movie-card/MovieCard'
import MovieDetails from '../movie-card/MovieDetails'
import FavoritesMenu from '../menu/FavoritesMenu'
import './favorites.css'

function Favotites(){
    const[movies, setMovies] = useState([])
    const[type, setType] = useState('')
    const[selectedMovie, setSelectedMovie] = useState(null)

    async function loadFavoties(){
        const userJson =  localStorage.getItem('user')
        const user = JSON.parse(userJson)

        const response = await fetch('http://127.0.0.1:5000/user/favorites/' + user._id);
        const favoritesMovies = await response.json();
        if(favoritesMovies.msg){
            alert(favoritesMovies.msg);
            return
        }
        setMovies(favoritesMovies.favorites)
    }

    async function loadSelectedMovie(movie){
        const response = await fetch('http://www.omdbapi.com/?apikey=19861f44&s=&i=' + movie.imdbID);
        //const response = await fetch('https://imdb-api.com/en/API/title/k_tpmfc7mf/' + movie.id);
        const data = await response.json()
        console.log('data', data);
        setSelectedMovie(data)
    }

    function handleOpenModal(movie){
        loadSelectedMovie(movie)
    }
    function handleCloseModal(){
        setSelectedMovie(null);
    }
    useEffect( () => {
        loadFavoties()
    }, [])

    async function removeFromFavorites(movie) {

        const userJson = localStorage.getItem('user')
        const user = JSON.parse(userJson);

        const response = await fetch('http://127.0.0.1:5000/user/' +user._id + "/" +movie.imdbID, {
            method: 'DELETE',
        });
        const updatedUser = await response.json()
        if (updatedUser.msg) {
            alert(updatedUser.msg)
        } else {
            alert(movie.Title + " was removed successfully")
            loadFavoties();
        }        
    }

    return(
        <div className="favorites">
            <FavoritesMenu/>
            {
               selectedMovie && <div className="modal" onClick={handleCloseModal}>
                <MovieDetails  movie={selectedMovie} />
               </div>
            }
            <div>
            <button onClick={()=>setType('movie')}>MOVIES</button>
            <button onClick={()=>setType('series')}>TV</button>
            </div>
            <div className="search-result">
                    {
                        movies.filter( m => type == '' ? true : m.Type == type ).map((movieElement) => {
                            return (
                                <MovieCard key={movieElement.imdbID} movie={movieElement} onClick={handleOpenModal} remove={true} removeFunc={removeFromFavorites}/>

                            )
                        })
                    }
                </div>
        </div>
    )
}

export default Favotites;
