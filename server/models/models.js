const sequelize = require('../db')
const {DataTypes}=require('sequelize')

const User = sequelize.define('User',{
    id:{type: DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    email:{type:DataTypes.STRING,unique:true, allowNull: false},
    name:{type:DataTypes.STRING,unique:false},
    password:{type: DataTypes.STRING, allowNull: false},
    photo:{type:DataTypes.STRING},
    role:{type: DataTypes.ENUM("1","2","0"), defaultValue:"0"},
})

const Zakaz  = sequelize.define('Zakaz',{
    id:{type: DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    name:{type: DataTypes.STRING, allowNull: false},
    Status:{type: DataTypes.ENUM("1","2","0"), defaultValue:"0"},
    price:{type: DataTypes.INTEGER, defaultValue:0},
    description:{type: DataTypes.STRING, defaultValue:"Описание не добавлено(("},
})

const Chat  = sequelize.define('Chat',{
    id:{type: DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    Text:{type: DataTypes.STRING,allowNull: false},
})

const Otzyv  = sequelize.define('Otzyv',{
    id:{type: DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    Soderjanie:{type: DataTypes.STRING,defaultValue:"Привет, я твой единственный зритель"},
})
const userWallet  = sequelize.define('user_wallet',{
    id:{type: DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    Sushki:{type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
})

User.hasOne(userWallet)
userWallet.belongsTo(User)

User.hasMany(Zakaz)
Zakaz.belongsTo(User)
Zakaz.belongsTo(User,{as:'Whom'})

User.hasMany(Chat)
Chat.belongsTo(User)
Chat.belongsTo(User,{as:'Whom'})

User.hasMany(Otzyv)
Otzyv.belongsTo(User)
Otzyv.belongsTo(User,{as:'Whom'})

module.exports = {
    User,
    Zakaz,
    Chat,
    Otzyv,
    userWallet,
}