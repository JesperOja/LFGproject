"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const db_1 = require("../util/db");
const sequelize_1 = require("sequelize");
class Profile extends sequelize_1.Model {
}
exports.Profile = Profile;
Profile.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    firstname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    lastname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    age: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    discord: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    joiningDate: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    sequelize: db_1.sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'profile'
});
