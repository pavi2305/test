module.exports = (sequelize,DataTypes) => {
    var Model = sequelize.define('passenger',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
        name:{
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
        seatNo:{
            type:DataTypes.STRING,
            allowNull:false
        },
        createdAt:{
            type:DataTypes.DATE,
            allowNull:false
        }
    },{
        tableName:'passenger'
    });
    Model.associate = function(models){
        this.ticketId = this.belongsTo(models.ticket,{foreignKey : 'ticketId'});
    };
    return Model;
}