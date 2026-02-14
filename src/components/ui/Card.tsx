import React from 'react';
import styles from './Card.module.css';
import { clsx } from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    padded?: boolean;
    interactive?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, padded = true, interactive = false, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={clsx(
                    styles.card,
                    padded && styles.padded,
                    interactive && styles.interactive,
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';
