const sequelize = require('../sqlite_db');
const { DataTypes } = require('sequelize')

const List = sequelize.define("List", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    keywords: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: []
    },
    last_synced_at: {
        type: DataTypes.DATE,
    }
});

module.exports = List