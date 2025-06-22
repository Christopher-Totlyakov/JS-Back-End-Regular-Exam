import jsonwebtoken from "jsonwebtoken";
import { JWT_SECRET } from "../config/index.js";
import util from 'util'

const jwtPromisVerify = util.promisify(jsonwebtoken.verify);

export async function auth(req, res, next){
    const token = req.cookies['auth'];

    if (!token) {
        return next();   
    }

    try {
        const user = await jwtPromisVerify(token, JWT_SECRET);

        req.user = user;
        req.isAuthenticated = true;
        res.locals.user = user;
        res.locals.isAuthenticated = true;
        next()
    } catch (error) {
        res.clearCookie('auth');
        res.redirect('/users/login');
    }
}

export function isAuth(req,res,next){
    if (!req.isAuthenticated) {
       return res.redirect('/users/login');
    } 
    next();
}

export function isGuest(req, res, next) {
    if (req.isAuthenticated) {
        return res.redirect('/');
    } 
    next();
}