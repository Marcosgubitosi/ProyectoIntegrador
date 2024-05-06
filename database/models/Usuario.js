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
        contraseña: {
            type: dataTypes.STRING(50)
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
            type: dataTypes.DATE
        },
        updatedAt: {
            type: dataTypes.DATE
        }
    }

    let config = {
        tableName: 'usuarios',
        timestamps: true,
        underscored: true
    }

    let Usuario = sequelize.define(alias, cols, config)
    return Usuario
}