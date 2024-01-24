import { Schema,model } from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema= new Schema({
    user:{
        type:String,
        require:true,
        trim: true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    }
});

userSchema.pre("save", async function (next){
    const user = this;
    if (!user.isModified("password")) return next()
    try {
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(user.password, salt);
        next();
    } catch (error) {
        console.log(error);
    }

});

userSchema.methods.comparePass = async function (originalPass){
    return await bcryptjs.compare(originalPass,this.password);
};


export const User = model("User", userSchema);