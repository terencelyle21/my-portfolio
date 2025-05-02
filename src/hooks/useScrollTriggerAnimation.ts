import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimationOptions {
    fromVars?: gsap.TweenVars;
    toVars?: gsap.TweenVars;
    scrollTriggerVars?: ScrollTrigger.Vars;
}

const defaultFromVars: gsap.TweenVars = { opacity: 0, y: 50 };
const defaultToVars: gsap.TweenVars = { opacity: 1, y: 0, duration: 1.8, ease: 'power3.out' };
const defaultScrollTriggerVars: ScrollTrigger.Vars = { start: 'top 85%', end: 'bottom 20%', toggleActions: 'play none none none', once: true };

export const useScrollTriggerAnimation = (
    selector: string,
    options: AnimationOptions = {}
) => {
    const {
        fromVars = defaultFromVars,
        toVars = defaultToVars,
        scrollTriggerVars = defaultScrollTriggerVars
    } = options;

    useEffect(() => {
        const elements = gsap.utils.toArray<Element>(selector);

        if (elements.length === 0) return;

        const triggers: ScrollTrigger[] = [];

        elements.forEach((element) => {
            const trigger = ScrollTrigger.create({
                trigger: element,
                ...scrollTriggerVars, // Spread default or provided scrollTrigger settings
                animation: gsap.fromTo(element, fromVars, { ...toVars }), // Combine animation directly
            });
            triggers.push(trigger);
        });

        return () => {
            triggers.forEach(trigger => trigger.kill()); // Kill only the triggers created by this hook
            gsap.killTweensOf(elements); // Kill tweens associated with these elements
        };
    }, [selector, fromVars, toVars, scrollTriggerVars]); // Add dependencies
};