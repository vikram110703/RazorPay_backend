import { instance } from "../server.js";
import crypto from 'crypto';
import { Payment } from "../models/PaymentModel.js";

export const checkout = async (req, resp) => {
    // if(typeof req.body.amount.amount=="number")console.log("number",req.body.amount.amount);
    const options = {
        amount: Number(req.body.amount.amount * 100), // amount in pesa
        currency: 'INR',
    };
    try {
        const order = await instance.orders.create(options);
        resp.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        console.log(error);
    }
};

export const paymentVerification = async (req, resp) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const requiredSignature = crypto
        .createHmac('sha256', process.env.RazorPay_Api_Secret)
        .update(body.toString())
        .digest('hex');

    const isMatched = requiredSignature === razorpay_signature;
    if (!isMatched) {
        resp.status(400).json({
            success: false,
            message:'Payment Failed due to invalid credentials',
        })
    }
     await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
     });

    resp.redirect(`${process.env.FRONTEND_URL}/paymentsuccess?reference=${razorpay_payment_id}`);



};