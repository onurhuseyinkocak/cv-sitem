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
    enableTilt = true,
}: FloatingCardProps) => {
    const { tilt, elementRef } = use3DTilt(10);

    return (
        <motion.div
            ref={elementRef}
            className={`floating-card ${className}`}
            style={enableTilt ? {
                transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                transition: 'transform 0.1s ease-out'
            } : undefined}
        >
            <div className="floating-card-inner">
                {children}
            </div>
        </motion.div>
    );
};

export default FloatingCard;
