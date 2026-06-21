'use client';

import React, { useState } from 'react';

const PricingPage = () => {
    const [activeTab, setActiveTab] = useState('seekers'); // 'seekers' or 'recruiters'

    const seekerPlans = [
        {
            name: 'Free',
            id:'seeker_free',
            price: '0',
            period: '/forever',
            features: [
                'Browse & save up to 10 jobs',
                'Apply to up to 3 jobs per month',
                'Basic profile',
                'Email alerts'
            ],
            buttonText: 'Current Plan',
            popular: false
        },
        {
            name: 'Pro',
            id:'seeker_pro',
            price: '19',
            period: '/month',
            features: [
                'Apply to up to 30 jobs per month',
                'Unlimited saved jobs',
                'Application tracking',
                'Salary insights'
            ],
            buttonText: 'Upgrade to Pro',
            popular: true
        },
        {
            name: 'Premium',
            id:'seeker_premium',
            price: '39',
            period: '/month',
            features: [
                'Everything in Pro + unlimited applications',
                'Profile boost to recruiters',
                'Early access to new jobs',
                'Priority support'
            ],
            buttonText: 'Get Premium',
            popular: false
        }
    ];

    const recruiterPlans = [
        {
            name: 'Free',
            id:'recruiter_free',
            price: '0',
            period: '/forever',
            features: [
                'Up to 3 active job posts',
                'Basic applicant management',
                "Standard listing visibility (great for a company's first year of hiring)"
            ],
            buttonText: 'Get Started',
            popular: false
        },
        {
            name: 'Growth',
            id:'recruiter_growth',
            price: '49',
            period: '/month',
            features: [
                'Up to 10 active job posts',
                'Applicant tracking',
                'Basic analytics',
                'Email support'
            ],
            buttonText: 'Upgrade to Growth',
            popular: true
        },
        {
            name: 'Enterprise',
            id:'recruiter_enterprise',
            price: '149',
            period: '/month',
            features: [
                'Up to 50 active job posts',
                'Advanced analytics dashboard',
                'Featured job listings',
                'Team collaboration',
                'Custom branding',
                'Priority support'
            ],
            buttonText: 'Contact Sales',
            popular: false
        }
    ];

    const currentPlans = activeTab === 'seekers' ? seekerPlans : recruiterPlans;

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Simple, transparent pricing
                    </h1>
                    <p className="text-lg text-gray-600">
                        Choose the perfect plan to boost your career or find the best talent for your company.
                    </p>
                </div>

                {/* Toggle Button */}
                <div className="flex justify-center mb-12">
                    <div className="bg-gray-200/80 p-1.5 rounded-full inline-flex shadow-inner">
                        <button
                            onClick={() => setActiveTab('seekers')}
                            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === 'seekers'
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            For Job Seekers
                        </button>
                        <button
                            onClick={() => setActiveTab('recruiters')}
                            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === 'recruiters'
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            For Recruiters
                        </button>
                    </div>
                </div>

                {/* Pricing Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {currentPlans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative flex flex-col bg-white rounded-2xl shadow-sm transition-transform duration-300 hover:-translate-y-1 ${plan.popular ? 'border-2 border-blue-600 shadow-md scale-105 lg:scale-105 z-10' : 'border border-gray-100'
                                }`}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute top-0 inset-x-0 flex justify-center -mt-4">
                                    <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <div className="p-8 flex-1">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                <div className="flex items-baseline text-gray-900 mb-6">
                                    <span className="text-4xl font-extrabold tracking-tight">${plan.price}</span>
                                    <span className="text-gray-500 ml-1 text-sm font-medium">{plan.period}</span>
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start text-sm text-gray-600">
                                            <svg className="w-5 h-5 text-blue-500 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="leading-tight">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="p-8 pt-0 mt-auto">
                                <form action="/api/checkout_sessions" method="POST">
                                    <input type="hidden" name='plan_id' value={plan.id} />
                                    <section>
                                        <button type="submit" role="link" className={`w-full py-3 px-6 rounded-lg font-semibold text-sm transition-colors ${plan.popular
                                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                                        : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                                    }`}>
                                            Checkout
                                        </button>
                                    </section>
                                </form>
                                
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default PricingPage;