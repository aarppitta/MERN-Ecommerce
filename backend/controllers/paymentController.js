import Stripe from 'stripe';
import Order from '../models/orderModel.js';
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//create checkout

export const createCheckoutSession = async (req, res) => {
    const {items} = req.body;

    const lineItems = items.map((item) => ({
        price_data:{
            currency:'usd',
            product_data:{ name:item.name},
            unit_amount:item.price * 100,
        },
        quantity:item.quantity,
    }))

    const session = await stripe.checkout.sessions.create({
        payment_method_types:['card'],
        line_items: lineItems,
        mopde:"payment",
        success_url:`${process.env.CLIENT_URL}/success`,
        cancel_url:`${process.env.CLIENT_URL}/cancel`,
    });

    await Order.create({
        user:req.user.id,
        items,
        totalAmount: items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        stripeSessionId: session.id,
    })
res.json({url:session.url});
}


//stripe webhooks

export const stripeWebhook = async (req, res) => {
    const sig= req.headers['stripe-signature'];

    const event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
    );


    if(event.type === 'checkout.session.completed'){
        const session = event.data.object;

        await Order.findOneAndUpdate(
            {stripeSessionId: session.id},
            {paymentStatus:'paid'}
        );
    }
    res.json({ received: true });
}