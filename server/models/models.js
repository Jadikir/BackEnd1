const sequelize = require('../db')
const {DataTypes}=require('sequelize')

const User = sequelize.define('User',{
    id:{type: DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    email:{type:DataTypes.STRING,unique:true, allowNull: false},
    password:{type: DataTypes.STRING, allowNull: false},
    role:{type: DataTypes.ENUM("1","2","0"), defaultValue:"0"},
})

const Zakaz  = sequelize.define('Zakaz',{
    id:{type: DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    name:{type: DataTypes.STRING, allowNull: false},
    id_Zakazchika:{type: DataTypes.INTEGER, allowNull: false},
    id_Ispolnitelya:{type: DataTypes.INTEGER, allowNull: false},
    Status:{type: DataTypes.ENUM("1","2","0"), defaultValue:"0"},
    price:{type: DataTypes.INTEGER, defaultValue:0},
    description:{type: DataTypes.STRING, defaultValue:"Описание не добавлено(("},
})
const Chat  = sequelize.define('Chat',{
    id:{type: DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    id_Zakazchika:{type: DataTypes.INTEGER, allowNull: false},
    id_Ispolnitelya:{type: DataTypes.INTEGER, allowNull: false},
    Text:{type: DataTypes.STRING,allowNull: false},
})


const Otzyv  = sequelize.define('Otzyv',{
id:{type: DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    id_Komu:{type: DataTypes.INTEGER, allowNull: false}, id_Oy_Kogo:{type: DataTypes.INTEGER, allowNull: false},
    Soderjanie:{type: DataTypes.STRING,defaultValue:"Привет, я твой единственный зритель"},
})
const userWallet  = sequelize.define('user_wallet',{
    id:{type: DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    id_User:{type: DataTypes.INTEGER,allowNull: false},
    Sushki:{type: DataTypes.INTEGER, allowNull: false},
})

User.hasOne(userWallet)
userWallet.belongsTo(User)

User.hasMany(Zakaz)
Zakaz.belongsTo(User)

User.hasMany(Chat)
Chat.belongsTo(User)

User.hasMany(Otzyv)
Otzyv.belongsTo(User)


module.exports = {
    User,
    Zakaz,
    Chat,
    Otzyv,
    userWallet,
}