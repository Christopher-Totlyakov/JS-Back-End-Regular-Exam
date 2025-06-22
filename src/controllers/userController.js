import { Router } from "express";
import userService from "../services/userService.js";
import { isAuth, isGuest } from "../middlewares/authMiddlewares.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const userControler = Router();

userControler.get("/register", isGuest, (req, res) => {
    res.render("user/register");
});

userControler.post("/register", isGuest, async (req, res) => {
    const userData = req.body;
    
    try {
        const token = await userService.register(userData);
        res.cookie('auth', token)

        res.redirect('/')
    } catch (err) {
        res.render('user/register', { error: getErrorMessage(err), user: userData });
    }

});

userControler.get("/login", isGuest, (req, res) =>{
    res.render("user/login")
})

userControler.post("/login", isGuest, async (req, res) => {
    const {email, password} = req.body;

    try {
        const token = await userService.login(email, password);
        res.cookie('auth', token);

        res.redirect('/');
    } catch (err) {
        res.render('user/login', { error: getErrorMessage(err), email });
    }
    
});

userControler.get('/logout', isAuth, (req,res) =>{
    res.clearCookie('auth');
    res.redirect('/');
})


export default userControler;