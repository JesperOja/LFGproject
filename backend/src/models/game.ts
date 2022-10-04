import {sequelize} from '../util/db';
import { Model, DataTypes, InferCreationAttributes, CreationOptional, InferAttributes } from "sequelize";

export class Game extends Model<InferAttributes<Game>, InferCreationAttributes<Game>>{
    declare id: CreationOptional<number>;
    declare name: string;
    declare nicknameIngame: string | null;
    declare hoursPlayes: number | null;
    declare rank: string | null;
    declare server: string | null;
    declare comment: string | null;
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
    hoursPlayes:{
        type: DataTypes.STRING
    },
    rank: {
        type: DataTypes.STRING
    },
    server:{
        type: DataTypes.STRING
    },
    comment:{
        type: DataTypes.STRING
    } 
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'game'
})