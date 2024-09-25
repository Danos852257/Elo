import { sequelize } from "../config.js";
import { Competitions } from "./competitions.js";
import DataTypes from 'sequelize';

const Users = sequelize.define(
    'Users',
    {
        uName: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }

);

Users.hasMany(Competitions);
Competitions.belongsTo(Users);

export { Users }