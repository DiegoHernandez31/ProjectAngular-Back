import Person from "../models/personModel.js";
import errorHandler from "../utils/errorHandler.js";

async function list(req, res) {
    try {
        const personList = await Person.find({deletedAt: null});
        res.json(personList);
    } catch(err) {
        errorHandler.error500ServerError(res, err);
    }
}

async function findPersonById(req, res) {
    try {
        const personId = req.params.id;
        const person = await Person.findById(personId).populate("addresses").populate("creditCard");
        if(!person || person.deletedAt) {
            return errorHandler.error404NotFound(res, Person.modelName)
        }
        return res.status(200).json(person);
    } catch(err) {
        errorHandler.error500ServerError(res, err);
    }
}

async function createNewPerson(req, res) {
    try {
        const newPerson = await Person.create({
            name: req.body.name,
            lastname: req.body.lastname,
            document: req.body.document,
            cellphone: req.body.cellphone,
        });
        res.status(200).json(newPerson);
    } catch (err) {
        if(err.code == 11000) {
            errorHandler.error400Database(res, err);
        } else {
        errorHandler.error500ServerError(res, err);
        }
        
    }
}

async function updatePerson(req, res) {
    try {
        const person = await Person.findById(req.params.id);

        person.name = req.body.name || person.name;
        person.lastname = req.body.lastname || person.lastname;
        person.document = req.body.document || person.document;
        person.cellphone = req.body.cellphone || person.cellphone;
        await person.save();
        res.status(200).json(person);
    } catch(err) {
        if(err.code == 11000) {
            errorHandler.error400Database(res, err);
        }   else {
            errorHandler.error500ServerError(res, err);
        }
    }
}


async function deletePerson(req, res) {
    try {
        const person = await Person.findById(req.params.id);
        if(!person || person.deletedAt) {
            return errorHandler.error404NotFound(res, Person.modelName);
        }
        person.deletedAt = new Date();
        await person.save(person);
        res.status(200).json("Person deleted successfully");
    } catch(err) {
        errorHandler.error500ServerError(res, err);
    }
}


export default {
    list,
    findPersonById,
    createNewPerson,
    updatePerson,
    deletePerson
};