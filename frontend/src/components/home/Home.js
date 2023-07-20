import { useState } from 'react'
import HomeMenu from '../menu/HomeMenu'
import MovieCard from '../movie-card/MovieCard'
import './Home.css';

function Home() {

    const [movies, setMovies] = useState([])
    // public Object[] useState(Object)
    const [showSearch, setShowSearch] = useState(false)
    const [isLoading, setIsloading] = useState(false)
    const [searchText, setSearchText] = useState('')

    const searchApi = async () => {

        const response = await fetch('http://www.omdbapi.com/?apikey=19861f44&s=' + searchText);
        console.log('response', response);
        const data = await response.json()
        console.log('data', data);
        if(data.Response === "True"){
            setMovies(data.Search);
        }else{
            setMovies([]);
            alert(data.Error);
        }
        
        setIsloading(false);
    }

    function handleSearchText(event) {
        setSearchText(event.target.value)
    }
    function handleEnter(event) {
        if (event.key === "Enter") {
            setIsloading(true);
            setShowSearch(false)
            searchApi();
        }

    }
    return (
        <div>
            <HomeMenu />
            <h3>Home Page</h3>
            <div className="home-search">
                <span>SEARCH</span>
                {showSearch == false && <button onClick={() => setShowSearch(!showSearch)}>Search</button>}

                {showSearch == true && <input onKeyDown={handleEnter} onChange={handleSearchText} className="film-name" placeholder="Enter film name" />}
                {isLoading == true && <div>
                    <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </div>
}
                <div className="search-result">
                    {
                        movies.map((movieElement) => {
                            return (
                                <MovieCard key={movieElement.imdbID} movie={movieElement} remove={false}/>

                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default Home;