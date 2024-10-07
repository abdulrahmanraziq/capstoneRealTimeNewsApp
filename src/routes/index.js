import express from 'express';
import userRoutes from '../routes/user.js';
import newsRoutes from '../routes/news.js';
import sendEmailRoutes from '../routes/sendmail.js'
const router = express.Router();

router.get('/', (req, res)=> {
    res.send(`<h1>Welcome to the News App</h1>`)
});

router.use('/user', userRoutes);
router.use('/news', newsRoutes);
router.use('/sendEmail', sendEmailRoutes)
export default router;