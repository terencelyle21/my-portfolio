import React, { useRef, useEffect } from 'react';
import Button from './ui/Button';

// hooks
import { useScrollTriggerAnimation } from '../hooks/useScrollTriggerAnimation';
import { useScrollSmoother } from '../hooks/useScrollSmoother';
import { WordLooper } from "./WordLooper";

// styles
import '../styles/LandingPage.css';

const LandingPage: React.FC = () => {
    const heroRef = useRef<HTMLElement>(null);

    useScrollTriggerAnimation('.animated-heading');

    useScrollSmoother({
        wrapperId: 'smooth-wrapper',
        contentId: 'smooth-content',
        smooth: 1.5,
        effects: true,
    });

    useEffect(() => {
        let animationFrameId: number;

        const handleScroll = () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
            animationFrameId = requestAnimationFrame(() => {
                if (heroRef.current) {
                    const scrollTop = window.pageYOffset;
                    const offset = scrollTop * 0.05;
                    heroRef.current.style.backgroundPosition = `center ${offset}px`;
                }
            });
        };

        window.addEventListener('scroll', handleScroll);

        handleScroll();

        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div id="smooth-wrapper">
            <div id="smooth-content"> 
                <section className='hero-section' ref={heroRef}>
                    <div className='container animated-heading'>
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
                    <Button className='animated-heading'>
                        Get Started
                    </Button>
                </div>
            </section>
            </div>
        </div>
     );
 };

export default LandingPage;
