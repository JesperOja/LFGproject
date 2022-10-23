import {sequelize} from '../util/db';
import { Model, DataTypes, InferCreationAttributes, CreationOptional, InferAttributes } from "sequelize";

export class Comment extends Model<InferAttributes<Comment>, InferCreationAttributes<Comment>>{
    declare id: CreationOptional<number>;
    declare comment: string;
    declare posterId: number;
    declare postId: number;
    
}

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false
    },
    posterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: 'profiles', key: 'id'}
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: 'posts', key: 'id'}
    }
}, {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'comment'
})
