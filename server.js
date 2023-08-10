import {app}from './app.js';
import Razorpay from 'razorpay';
import { ConnectDb } from './config/database.js';

ConnectDb();
export const instance =new Razorpay({
    key_id:process.env.RazorPay_Api_Key,
    key_secret:process.env.RazorPay_Api_Secret,
});

app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
});