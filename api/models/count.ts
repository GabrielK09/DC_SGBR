const { DataTypes } = require('sequelize');
const sequelize = require('../db/db.ts');

const Counter = sequelize.define('counters', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },

    count: {
        type: DataTypes.INTEGER,
        primaryKey: false
    }
}, {
    tableName: 'counters',
    timestamps: false
});

module.exports = Counter;