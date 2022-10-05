"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const db_1 = require("../util/db");
const sequelize_1 = require("sequelize");
class Post extends sequelize_1.Model {
}
exports.Post = Post;
Post.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: sequelize_1.DataTypes.STRING
    },
    createDate: {
        type: sequelize_1.DataTypes.STRING
    },
    content: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    sequelize: db_1.sequelize,
    modelName: 'post',
    underscored: true,
    timestamps: false
});
