import {Router} from "express";
import jwt from "jsonwebtoken";
import {Container, Inject} from "typedi";
import config from "../../../config";
import argon2 from "argon2";
import IAuthenticationService from "../../services/IServices/IAuthenticationService";
import verifyToken from "../../services/verifyToken"
import AuthenticationService from "../../services/authenticationService";
import IFleetPlaningService from "../../services/IServices/IFleetPlaningService";


const secretKey = "iefbr@i3wbdow2~23e~m3b24d2e%$#Rge5n";
const au = Router();

export default (app: Router) => {
    app.use('/auth', au);
    const serv = Container.get(config.services.authenticate.name) as IAuthenticationService;
    
    
    au.post('/signin',async (req, res) => {
        const email = req.body.email
        const password = req.body.password
        await serv.getUserByEmail(email).then(async existUser => {
            if (existUser) {
                const validPassword = await argon2.verify(existUser.getValue().password, password);
                if (validPassword) {
                    const authToken = jwt.sign({
                        email: existUser.getValue().email,
                        role: existUser.getValue().role
                    }, secretKey, {expiresIn: '1h'})
                    res.json({status: 'ok', data: {authToken, existUser}})
                } else if (!validPassword) {
                    res.json({status: 'error', data: {existUser, response: 'Wrong Password'}})
                }
            }
        }).catch(err => {
            res.json({status: 'error', data:{response: 'No user found'}})
        })
    })

    au.post('/signinGoogle',async (req, res) => {
        const email = req.body.email
        const authToken = req.body.token
        await serv.getUserByEmail(email).then(async existUser => {
            console.log('exist  user', existUser)
            if (existUser) {
                res.json({status: 'ok', data: {authToken,existUser}})
            } else if (!existUser) {
                res.json({status: 'error', data: { response:'No user in database'}})
            }
        }).catch(err => {
            res.json({status: 'error', data: 'Something went  wrong'})
        })
    })
    au.get('/verifyToken',verifyToken, async (req,res)=>{
        if (req){
            res.json({status: 'ok', data: 'ok'})
        }else{
            res.json({status: 'error', data: 'error'})
        }
    })
}