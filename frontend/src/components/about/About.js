import { Link, useNavigate } from 'react-router-dom';
import './About.css';
import AboutMenu from '../menu/AboutMenu';

function About() {

    const nav = useNavigate();

    const onLogOut = () =>{
        nav('/');
    }

    const onHome = () => {
        nav('/home');
    }

    return (
        <div className="about">
            <AboutMenu/>
            <h3>About this site</h3>

            <h4>my details</h4>
            my name is Liam Tzror, my emnail is @gmail.com.
            I learn in practical enginiring software

        </div>
    )
}

export default About;