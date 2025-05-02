import React from 'react';
import Button from './ui/Button';

// hooks
import { useScrollTriggerAnimation } from '../hooks/useScrollTriggerAnimation';
import { useScrollSmoother } from '../hooks/useScrollSmoother';
import { WordLooper } from "./WordLooper";

// styles
import '../styles/LandingPage.css';

const LandingPage: React.FC = () => {
    useScrollTriggerAnimation('.animated-heading');

    useScrollSmoother({
        wrapperId: 'smooth-wrapper',
        contentId: 'smooth-content',
        smooth: 1.5,
        effects: true,
    });

    return (
        <div id="smooth-wrapper">
            <div id="smooth-content"> 
                <section className='hero-section'>
                    <div className='container'>
                        <WordLooper />
                    </div>
                </section>

                <section className='about-section'>
                    <div className='container'>
                        <h1 className="animated-heading">About Section Heading</h1>
                    </div>
                </section>

                <section className='project-section'>
                <div className='container'>
                    <h1 className="animated-heading">Welcome to My Portfolio!!</h1>
                    <Button>
                        Get Started
                    </Button>
                </div>
            </section>
            </div>
        </div>
     );
 };

export default LandingPage;
