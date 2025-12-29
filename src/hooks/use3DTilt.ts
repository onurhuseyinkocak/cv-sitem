import { useState, useEffect, useRef } from 'react';

interface TiltState {
    rotateX: number;
    rotateY: number;
}

export const use3DTilt = (maxTilt: number = 15) => {
    const [tilt, setTilt] = useState<TiltState>({ rotateX: 0, rotateY: 0 });
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -maxTilt;
            const rotateY = ((x - centerX) / centerX) * maxTilt;

            setTilt({ rotateX, rotateY });
        };

        const handleMouseLeave = () => {
            setTilt({ rotateX: 0, rotateY: 0 });
        };

        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [maxTilt]);

    return { tilt, elementRef };
};

export default use3DTilt;
