import {sequelize} from '../util/db';
import { Model, DataTypes, InferCreationAttributes, CreationOptional, InferAttributes } from "sequelize";

export class Post extends Model<InferAttributes<Post>, InferCreationAttributes<Post>>{
    declare id: CreationOptional<number>;
    declare title: string;
    declare createDate: string;
    declare content: string;
}

Post.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title:{
        type: DataTypes.STRING
    },
    createDate: {
        type: DataTypes.STRING
    },
    content:{
        type: DataTypes.STRING
    }
},{
    sequelize,
    modelName: 'post',
    underscored: true,
    timestamps: false
})