module.exports = function (sequelize, dataTypes) {
    let alias = "Comentario"

    let cols = {
        comentario_id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        producto_id: {
            type: dataTypes.INTEGER
            //foreign key
        },
        usuario_id: {
            type: dataTypes.INTEGER
            //foreign key
        },
        comentario: {
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
        tableName: 'comentarios',
        timestamps: true,
        underscored: true
    }

    let Comentario = sequelize.define(alias, cols, config)
    return Comentario
}