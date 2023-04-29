module.exports = (sequelize,DataTypes) => {
    var Model = sequelize.define('train',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
        trainNo:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        destination:{
            type:DataTypes.STRING,
            allowNull:false
        },
        seatAvailability:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },{
        tableName:'train'
    },{
        timestamps:true,
        paranoid:false
    });
    Model.associate = function(models){
        this.station = this.hasMany(models.station,{foreignKey : 'trainId'});
    };
    return Model;
}