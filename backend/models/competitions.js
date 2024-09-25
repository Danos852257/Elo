import { sequelize } from "../config.js";
import DataTypes from 'sequelize';

const Competitions = sequelize.define(
    'Competitions',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
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