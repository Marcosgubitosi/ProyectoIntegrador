module.exports = function (sequelize, dataTypes) {
    let alias = "Usuario"

    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        email: {
            type: dataTypes.STRING(50)
        },
        contrasenia: {
            type: dataTypes.STRING(100)
        },
        fecha_nacimiento: {
            type: dataTypes.DATE
        },
        dni: {
            type: dataTypes.BIGINT
        },
        foto_perfil: {
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
        tableName: 'usuarios',
        timestamps: true,
        underscored: true
    }

    let Usuario = sequelize.define(alias, cols, config)

    Usuario.associate = function(models){
        Usuario.hasMany(models.Producto, {
            as: "producto",
            foreignKey: "usuario_id"
        })
        Usuario.hasMany(models.Comentario, {
            as: "comentario",
            foreignKey: "usuario_id"
        })
    }

    return Usuario
}