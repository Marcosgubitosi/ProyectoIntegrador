module.exports = function (sequelize, dataTypes) {
    let alias = "Producto"

    let cols = {
        producto_id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        usuario_id: {
            type: dataTypes.INTEGER
            //foreign key
        },
        nombre_archivo_producto: {
            type: dataTypes.STRING
        },
        nombre_producto: {
            type: dataTypes.STRING
        },
        descripcion_producto: {
            type: dataTypes.STRING
        },
        createdAt: {
            type: dataTypes.DATE,
            field: 'createdAt'
        },
        updatedAt: {
            type: dataTypes.DATE,
            field: 'updatedAt'
        }
    }

    let config = {
        tableName: 'productos',
        timestamps: true,
        underscored: true
    }

    let Producto = sequelize.define(alias, cols, config)


Producto.associate = function(models){
    Producto.belongsTo(models.Usuario, {
        as: "usuario",
        foreignKey: "usuario_id"
    })
    Producto.hasMany(models.Comentario, {
        as: "comentario",
        foreignKey: "producto_id"
    })
}

    return Producto
}