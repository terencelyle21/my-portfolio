import NavButton from './ui/NavButton.tsx';
import '../styles/Navigation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    return (
        <nav className="navbar">
            <NavButton>
                <FontAwesomeIcon icon={faHome} />
            </NavButton>
            <NavButton>
                Projects
            </NavButton>
            <NavButton>
                Infos
            </NavButton>
            <NavButton variant="contact">
                Contact
            </NavButton>
        </nav>
    );
};

export default Navbar;
