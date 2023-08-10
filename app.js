import express from 'express';
import { config } from "dotenv";
import paymentRoute from './routes/paymentRoute.js';
import cors from 'cors';

config({ path: "./config/config.env" });

export const app = express();
app.use(cors());
app.use(express.json());// to access data from req.body
app.use(express.urlencoded({ extended: true }));// to access data from req.body


app.use('/api', paymentRoute);
app.get('/api/getkey', (req, resp) => {
    resp.status(200).json({
        key: process.env.RazorPay_Api_Key
    });
});
app.get('/*',(req,resp)=>{
    resp.status(200).json({
        success:true,
        message:"Backend is working perfectlly"
    });
})

