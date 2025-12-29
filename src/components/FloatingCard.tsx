import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { use3DTilt } from '../hooks/use3DTilt';
import './FloatingCard.css';

interface FloatingCardProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    enableTilt?: boolean;
    floatIntensity?: 'low' | 'medium' | 'high';
}

const FloatingCard = ({
    children,
    className = '',
    delay = 0,
    enableTilt = true,
    floatIntensity = 'medium'
}: FloatingCardProps) => {
    const { tilt, elementRef } = use3DTilt(10);

    const floatDurations = {
        low: 4,
        medium: 3,
        high: 2
    };

    return (
        <motion.div
            ref={elementRef}
            className={`floating-card ${className}`}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{
                opacity: 1,
                y: 0,
                scale: 1
            }}
            transition={{
                delay,
                duration: 0.6,
                type: 'spring',
                stiffness: 100
            }}
            style={enableTilt ? {
                transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                transition: 'transform 0.1s ease-out'
            } : undefined}
        >
            <div
                className="floating-card-inner"
                style={{
                    animation: `float ${floatDurations[floatIntensity]}s ease-in-out infinite`
                }}
            >
                {children}
            </div>
        </motion.div>
    );
};

export default FloatingCard;
