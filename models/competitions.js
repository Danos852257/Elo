import { sequelize } from "../config.js";
import DataTypes from 'sequelize';

const Competitions = sequelize.define(
    'Competitions',
    {
        PK:{
            type:DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        playerData: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        isPublic: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }

    }
);


export { Competitions }