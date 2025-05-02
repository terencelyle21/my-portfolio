import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

interface ScrollSmootherConfig {
    wrapperId: string;
    contentId: string;
    smooth?: number;
    effects?: boolean;
    normalizeScroll?: boolean;
}

export const useScrollSmoother = (config: ScrollSmootherConfig) => {
    const { wrapperId, contentId, smooth, effects, normalizeScroll } = config;

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            ScrollSmoother.create({
                wrapper: `#${wrapperId}`,
                content: `#${contentId}`,
                smooth: smooth ?? 1.5,
                effects: effects ?? true,
                normalizeScroll: normalizeScroll ?? false,
            });
        });

        return () => ctx.revert();

    }, [wrapperId, contentId, smooth, effects, normalizeScroll]);
};
