import {sequelize} from '../util/db';
import { Model, DataTypes, InferCreationAttributes, CreationOptional, InferAttributes } from "sequelize";

export class Profile extends Model<InferCreationAttributes<Profile>, InferAttributes<Profile> > {
    declare id: CreationOptional<number>;
    declare username: string;
    declare firstname: string | null;
    declare lastname: string | null;
    declare age: number | null;
    declare discord: string | null;
    declare joiningDate: string;
    declare email: string;
    
}

Profile.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false
    },
    firstname:{
        type: DataTypes.STRING,
        allowNull: true
    },
    lastname:{
        type: DataTypes.STRING,
        allowNull: true
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    discord: {
        type: DataTypes.STRING,
        allowNull: true
    },
    joiningDate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'profile'
})