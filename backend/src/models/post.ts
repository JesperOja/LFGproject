import {sequelize} from '../util/db';
import { Model, DataTypes, InferCreationAttributes, CreationOptional, InferAttributes } from "sequelize";

export class Post extends Model<InferAttributes<Post>, InferCreationAttributes<Post>>{
    declare id: CreationOptional<number>;
    declare title: string;
    
    declare content: string;
    declare likes: number;
    declare dislikes: number;
}

Post.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false
    },
    
    content:{
        type: DataTypes.STRING,
        allowNull: false
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    dislikes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
},{
    sequelize,
    modelName: 'post',
    underscored: true,
    timestamps: true,
})