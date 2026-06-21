import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID = {
    'seeker_pro': 'price_1Tks5nL2OIqosKhg3DRHXe6Y',
    'seeker_premium': 'price_1TkrTIL2OIqosKhgP4jgIilL',
    'recruiter_growth': 'price_1TksbpL2OIqosKhgE02gCqaY',
    'seeker_enterprise': 'price_1TkscDL2OIqosKhgTa36jiEl',
}