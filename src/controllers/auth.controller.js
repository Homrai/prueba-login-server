import { User } from "../models/userModel.js";

export const SignUp = async (req,res)=>{
    try {
        const {user,password}= req.body;
        if (!user || !password) return res.status(200).json({error:"Ingrese todos los datos porfavor"});
        const findUser = await User.findOne({user});
        if (findUser) return res.status(200).json({error:"Cambie el nombre de usuario, el que agrego ya existe"});
        const newUser = new User({user,password});
        await newUser.save();
        return res.status(201).json({res:"Tu cuenta se ha creado con exito"})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"Lo sentimos estamos teniendo problemas con nuestro servidor, porfavor intentalo mas tarde"});
    }
}

export const Login = async (req,res)=>{
    try {
        const {user,password}= req.body;
        if (!user || !password) return res.status(200).json({error:"Ingrese todos los datos porfavor"});
        const findUser = await User.findOne({user});
        if (!findUser) return res.status(200).json({error:"Usuario o password incorrectos"})            
        const comparePassword = await findUser.comparePass(password);
        if(!comparePassword) return res.status(200).json({error:"Usuario o password incorrectos"});
        return res.status(200).json({res:"Datos de ingreso correctos",data:findUser.user});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"Lo sentimos estamos teniendo problemas con nuestro servidor, porfavor intentalo mas tarde"});
    }

}