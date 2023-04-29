module.exports = (sequelize,DataTypes) => {
    var Model = sequelize.define('ticket',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
        trainNo:{
            type:DataTypes.STRING,
            allowNull:false
        },
        bookedUser:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        status:{
            type:DataTypes.STRING,
            allowNull:false
        },
        amount:{
            type:DataTypes.STRING,
            allowNull:false
        },
        noOfPassenger:{
            type:DataTypes.STRING,
            allowNull:false
        },
        createdAt:{
            type:DataTypes.DATE,
            allowNull:false
        }
    },{
        tableName:'ticket'
    },{
        timestamps:true,
        paranoid:false
    });
    Model.associate = function(models){
        this.bookedUser = this.belongsTo(models.user,{foreignKey : 'bookedUser'});
        this.ticket = this.hasMany(models.passenger,{foreignKey : 'ticketId'});
    }
    return Model;
}