import React from 'react';
import { SwipeDeck } from '../../components/discovery/SwipeDeck';

export const SwipeView: React.FC = () => {
    return (
        <div style={{ height: 'calc(100vh - 140px)', padding: '1rem', overflow: 'hidden' }}>
            <SwipeDeck />
        </div>
    );
};
