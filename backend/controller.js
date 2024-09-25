import { Users } from './models/users.js';
import { Competitions } from './models/competitions.js';


export async function createUser(username, password) {
    return await Users.create({ uName: username, password: password });
}

export async function createComp(name, isPublic) {
    return await Competitions.create({ name: name, isPublic: isPublic });
}

export async function assignUser(userName, compName) {
    const comp = await Competitions.findByPk(compName)
    const user = await Users.findByPk(userName)
    await user.addCompetitions(comp)
}

export async function getUser(name) {
    return await Users.findByPk(name);
}

export async function getCompetitionsWithUser(name) {
    const data = await Users.findAll({
        name,
        include: {
            model: Competitions
        },
    });

    return (data[0].Competitions)
}

export async function addPlayersToComp(competitionName, newPlayerData) {
    try {
        const [updatedRows] = await Competitions.update(
            { playerData: newPlayerData },
            {
                where: { name: competitionName },
            }
        );
    } catch (error) {
        console.error('Error updating competition:', error);
        throw error; // Re-throw the error to handle it in the route
    }
    return;
}