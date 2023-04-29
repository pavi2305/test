const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const {to,Res} = require('./../global_functions');
const cryptoService = require('./../service/cryptoService');

module.exports = (sequelize,DataTypes) => {
    var Model = sequelize.define('user',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
        fName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        lName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        gender:{
            type:DataTypes.STRING,
            allowNull:false
        },
        age:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        },
        aadharNo:{
            type:DataTypes.STRING,
            allowNull:false
        },
        dob:{
            type:DataTypes.DATE,
            allowNull:false
        },
        address:{
            type:DataTypes.JSON,
            allowNull:false
        }
    },{
        tableName:'user'
    },{
        timestamps:true,
        paranoid:false
    });
    Model.associate = function(models){
        this.ticket = this.hasMany(models.ticket,{foreignKey : 'bookedUser'});
    };
    Model.beforeSave(async function(user,options){
        let err;
        if(user.changed('password')){
            console.log('iff');
            let salt,hash;
            let rounds = crypto.randomInt(3,10);
            console.log('rpounds', rounds);
            [err,salt] = await to(bcrypt.genSalt(rounds));
            console.log('salt value', salt);
            if(err) console.log('err 11',err.message);
            [err,hash] = await to(bcrypt.hash(user.password,salt));
            console.log('hash value', hash);
            if(err) console.log('err 22',err.message);
            user.password = hash;
            console.log('user.password', user.password);
        } else {
            console.log('inside else');
        }
    });
    Model.prototype.getJwt = async function(){
        let err,encryptedToken;
        const token = 'Bearer '+jwt.sign({
            id:this.id,
            email:this.email
        },CONFIG.jwt_encryption,{expiresIn:CONFIG.jwt_expiration});
        [err,encryptedToken] = await to(cryptoService.encrypt(token));
        if(err) TE(err.message);
        return encryptedToken;
    }
    return Model
}