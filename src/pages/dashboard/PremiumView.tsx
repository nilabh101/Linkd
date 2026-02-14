import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, Crown, Sparkles, Zap } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import styles from './PremiumView.module.css';

interface PricingPlan {
    id: string;
    name: string;
    price: number;
    period: string;
    discount?: string;
    popular?: boolean;
}

const pricingPlans: PricingPlan[] = [
    { id: 'weekly', name: 'Weekly', price: 499, period: 'week' },
    { id: 'monthly', name: 'Monthly', price: 1500, period: 'month', popular: true },
    { id: 'quarterly', name: '3 Months', price: 4000, period: '3 months', discount: 'Save ₹500' },
    { id: 'biannual', name: '6 Months', price: 7000, period: '6 months', discount: 'Save ₹2000' }
];

const blackFeatures = [
    'Unlimited likes',
    'See who liked you',
    'Priority in discovery',
    'Advanced filters (height, education, etc.)',
    'Rewind unlimited',
    'Read receipts',
    '5 Super Likes per week',
    'Boost profile once per month',
    'Message before matching',
    'Ad-free experience',
    'See matches faster',
    'Exclusive Black badge on profile'
];

const basicFeatures = [
    'Limited likes per day',
    'Standard discovery',
    'One rewind per day',
    'Match to message',
    'Ads supported'
];

export const PremiumView: React.FC = () => {
    const navigate = useNavigate();
    const [selectedPlan, setSelectedPlan] = useState<string>('monthly');
    const [showComparison, setShowComparison] = useState(false);

    const handleSubscribe = async (plan: PricingPlan) => {
        // Razorpay integration
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_xxxxxxxx', // Replace with actual key
            amount: plan.price * 100, // Convert to paise
            currency: 'INR',
            name: 'Linkd Black',
            description: `${plan.name} Subscription`,
            image: '/logo.png', // Add your logo
            handler: function (response: any) {
                // Payment successful
                console.log('Payment ID:', response.razorpay_payment_id);
                alert('🎉 Welcome to Linkd Black! Your premium features are now active.');
                // TODO: Save subscription to Supabase
                navigate('/dashboard');
            },
            prefill: {
                name: 'User Name', // Get from auth context
                email: 'user@example.com',
                contact: '9999999999'
            },
            theme: {
                color: '#f59e0b'
            }
        };

        const razorpay = new (window as any).Razorpay(options);
        razorpay.open();
    };

    if (showComparison) {
        return (
            <div className={styles.container}>
                <Button variant="ghost" onClick={() => setShowComparison(false)} className={styles.backButton}>
                    ← Back
                </Button>

                <h2 className={styles.header}>
                    <Crown size={32} color="#f59e0b" />
                    Basic vs Linkd Black
                </h2>

                <div className={styles.comparisonGrid}>
                    {/* Basic Plan */}
                    <Card className={styles.comparisonCard}>
                        <h3>Basic</h3>
                        <p className={styles.price}>Free</p>
                        <ul className={styles.featureList}>
                            {basicFeatures.map((feature, index) => (
                                <li key={index}>
                                    <Check size={18} color="#10b981" />
                                    {feature}
                                </li>
                            ))}
                            {blackFeatures.slice(5).map((feature, index) => (
                                <li key={index} className={styles.unavailable}>
                                    <X size={18} color="#ef4444" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </Card>

                    {/* Black Plan */}
                    <Card className={`${styles.comparisonCard} ${styles.premium}`}>
                        <div className={styles.badge}>
                            <Crown size={16} />
                            Popular
                        </div>
                        <h3>Linkd Black</h3>
                        <p className={styles.price}>₹1,500<span>/month</span></p>
                        <ul className={styles.featureList}>
                            {blackFeatures.map((feature, index) => (
                                <li key={index}>
                                    <Check size={18} color="#f59e0b" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <Button
                            onClick={() => setShowComparison(false)}
                            style={{ marginTop: '1rem', width: '100%' }}
                        >
                            Choose Plan
                        </Button>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.hero}>
                <Crown size={48} color="#f59e0b" />
                <h1>Upgrade to Linkd Black</h1>
                <p>Get premium features and find your perfect match faster</p>
            </div>

            {/* Pricing Cards */}
            <div className={styles.pricingGrid}>
                {pricingPlans.map((plan) => (
                    <Card
                        key={plan.id}
                        className={`${styles.pricingCard} ${selectedPlan === plan.id ? styles.selected : ''} ${plan.popular ? styles.popular : ''}`}
                        onClick={() => setSelectedPlan(plan.id)}
                    >
                        {plan.popular && (
                            <div className={styles.popularBadge}>
                                <Sparkles size={14} />
                                Most Popular
                            </div>
                        )}
                        {plan.discount && (
                            <div className={styles.discountBadge}>
                                {plan.discount}
                            </div>
                        )}
                        <h3>{plan.name}</h3>
                        <div className={styles.price}>
                            <span className={styles.currency}>₹</span>
                            <span className={styles.amount}>{plan.price.toLocaleString()}</span>
                            <span className={styles.period}>/{plan.period}</span>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Features List */}
            <div className={styles.features}>
                <h3>What's Included</h3>
                <div className={styles.featureGrid}>
                    {blackFeatures.map((feature, index) => (
                        <div key={index} className={styles.feature}>
                            <Zap size={20} color="#f59e0b" />
                            <span>{feature}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.actions}>
                <Button
                    variant="primary"
                    onClick={() => {
                        const plan = pricingPlans.find(p => p.id === selectedPlan)!;
                        handleSubscribe(plan);
                    }}
                    style={{ fontSize: '1.125rem', padding: '1rem 2rem' }}
                >
                    <Crown size={20} />
                    Subscribe Now
                </Button>
                <Button
                    variant="ghost"
                    onClick={() => setShowComparison(true)}
                >
                    Compare Plans
                </Button>
            </div>

            {/* Add Razorpay Script */}
            <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
        </div>
    );
};
