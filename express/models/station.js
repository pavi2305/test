module.exports = (sequelize,DataTypes) => {
    var Model = sequelize.define('station',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
        trainId:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        arrivalTime:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },{
        tableName:'station'
    },{
        timestamps:true,
        paranoid:false
    });
    Model.associate = function(models){
        this.trainId = this.belongsTo(models.train,{foreignKey : 'trainId'});
    };
    return Model;
}