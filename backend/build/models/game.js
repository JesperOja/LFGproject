"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const db_1 = require("../util/db");
const sequelize_1 = require("sequelize");
class Game extends sequelize_1.Model {
}
exports.Game = Game;
Game.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    nicknameIngame: {
        type: sequelize_1.DataTypes.STRING
    },
    hoursPlayes: {
        type: sequelize_1.DataTypes.STRING
    },
    rank: {
        type: sequelize_1.DataTypes.STRING
    },
    server: {
        type: sequelize_1.DataTypes.STRING
    },
    comment: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    sequelize: db_1.sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'game'
});
