import { Users } from './models/users.js';
import { Competitions } from './models/competitions.js';


export async function createUser(username, password) {
    try{
        return await Users.create({ uName: username, password: password });
    }
    catch(error){
        throw new Error("Username already taken. Please use a different username.");
    }
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

export async function loginFunction(username, pWord){
    try{
        let x = await Users.findByPk(username);
        if (x.password == pWord){
            return {success: true};
        }
        else{
            return  {success: false};
        }
    }
    catch{
        return {success: false};
    }
}

export async function signUpFunction(username, password){
    try{
        await createUser(username, password);
    }
    catch(error){
        console.log("User creation failed. Username is already taken (probably)");
        throw error;
    }
    return {sucsess: true};
}