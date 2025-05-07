import  { useEffect, useState } from 'react';
import NavButton from './ui/NavButton.tsx';
import '../styles/Navigation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

// import titleIcon from '../assets/images/title-icon.png';

const Navbar = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setVisible(false);
                    } else {
                        setVisible(true);
                    }
                });
            },
            { threshold: 0.1 }
        );

        observer.observe(heroSection);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <nav>
            <div className={`header-nav ${!visible ? 'is-shown' : ''}`}>
                <div className="nav-container">
                    <div className="nav-container-1">
                        {/* <h3><FontAwesomeIcon icon={faHome} className='home-1' /></h3> */}
                        <h3>Terence Borromeo</h3>
                    </div>
                    <div className="nav-container-2">
                        <h3>Project</h3>
                        <h3>Infos</h3>
                        <h3>Contact</h3>
                    </div>
                </div>
            </div>
            <div className={`navbar ${visible ? 'slide-up visible' : 'slide-down hidden'}`}>
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
            </div>
            
        </nav>
    );
};

export default Navbar;
