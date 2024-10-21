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

export async function createCompetition(username, compName, isPublic, playerData) {
    try{
        let compPK = (username+"-"+compName);
        await Competitions.create({ PK:compPK, name: compName, isPublic: isPublic, playerData: playerData });
        await assignUser(username, compPK);
        return {success: true};
    }
    catch(error){
        console.log("Ranking already exists. Pick a unique name for ranking");
        throw error;
    }
}

export async function sendRankingResults(PK, playerData){
    console.log("bbbbbbbbbbbbbbbbbbbbbb");
    console.log(PK);
    try {
        // Update the playerData for the competition identified by PK
        await Competitions.update(
            { playerData },
            {
                where: {
                    PK: PK
                },
                returning: true
            }
        );
        return {
            success: true,
            message: 'Player data updated successfully.',
        };

    } catch (error) {
        console.error('Error updating player data:', error);
        // Return an error message
        throw new Error('Unable to update data');
    }
}

export async function assignUser(userName, compName) {
    const comp = await Competitions.findByPk(compName)
    const user = await Users.findByPk(userName)
    await user.addCompetitions(comp)
}

export async function getUser(name) {
    return await Users.findByPk(name);
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
    return {success: true};
}

export async function getCompetitions(username){
    let comps = [];
    var i = 0;
    const allComps = await Competitions.findAll(); //gets the list of all competitions, regardless of user
    while(i < allComps.length){
        if(allComps[i].UserUName === username){
            comps.push(allComps[i]);
        }
        i++
    }
    return comps;
}

