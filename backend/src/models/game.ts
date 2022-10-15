import {sequelize} from '../util/db';
import { Model, DataTypes, InferCreationAttributes, CreationOptional, InferAttributes } from "sequelize";

export class Game extends Model<InferAttributes<Game>, InferCreationAttributes<Game>>{
    declare id: CreationOptional<number>;
    declare name: string;
    declare nicknameIngame: string | null;
    declare hours: number | null;
    declare rank: string | null;
    declare server: string | null;
    declare comments: string | null;
}

Game.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nicknameIngame:{
        type: DataTypes.STRING
    },
    hours:{
        type: DataTypes.STRING
    },
    rank: {
        type: DataTypes.STRING
    },
    server:{
        type: DataTypes.STRING
    },
    comments:{
        type: DataTypes.STRING
    } 
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'game'
})