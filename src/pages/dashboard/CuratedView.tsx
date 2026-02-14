import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Star, Clock } from 'lucide-react';
import { MOCK_PROFILES } from '../../data/mockData';

export const CuratedView: React.FC = () => {
    const standout = MOCK_PROFILES[1]; // Use Jessica as example

    return (
        <div style={{ padding: '1rem', height: '100%', overflowY: 'auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem', marginTop: '1rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255, 215, 0, 0.1)', padding: '0.5rem 1rem', borderRadius: '2rem' }}>
                    <Star size={16} fill="gold" color="gold" />
                    <span style={{ color: 'gold', fontWeight: 600, fontSize: '0.9rem' }}>Daily Picks</span>
                </div>
                <h2 style={{ margin: '1rem 0 0.5rem 0' }}>Today's Standouts</h2>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: 0 }}>
                    Specially curated for you based on your type.
                </p>
            </div>

            <div style={{ display: 'grid', gap: '1.5rem', paddingBottom: '2rem' }}>
                <Card className="interactive" style={{ overflow: 'hidden', position: 'relative', height: '400px', border: '1px solid var(--color-primary)' }}>
                    <div style={{
                        height: '100%',
                        background: `url(${standout.photos[1] || standout.photos[0]}) center/cover`,
                        position: 'relative'
                    }}>
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                <h3 style={{ margin: 0, fontSize: '1.5rem', color: 'white' }}>{standout.name}, {standout.age}</h3>
                            </div>
                            <p style={{ margin: '0 0 1rem 0', color: 'rgba(255,255,255,0.8)' }}>{standout.bio}</p>

                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <Button fullWidth variant="primary" startIcon={<Star size={16} />}>Select</Button>
                            </div>
                        </div>
                    </div>
                    <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.6)', padding: '0.25rem 0.75rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Clock size={14} color="var(--color-text-muted)" />
                        <span style={{ fontSize: '0.75rem', color: 'white' }}>Expires in 14h</span>
                    </div>
                </Card>
            </div>
        </div>
    );
};
