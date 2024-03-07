const Contributor = require('../model/contributor.model');
const HTTPSTATUSCODE = require("../../utils/httpStatusCode");


const getContributor = async (req, res, next) => {
    try {
        const id = req.params.id;
        const contributor = await Contributor.findById(id);
        res.status(200).json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            data: contributor
        });
    } catch (error) {
        next(error)
    }
}

// -- TODAS LAS CANCIONES
const getContributors = async (req, res, next) => {
    try {

        const contributors = await Contributor.find()
        res.status(200).json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            data: contributors
        });
    } catch (error) {
        next(error)
    }
}

const createContributor = async (req, res, next) => {
    try {
        const contributor = new Contributor(req.body);
        await contributor.save();
        res.status(201).json({
            status: 201,
            message: HTTPSTATUSCODE[201],
            data: contributor
        });
    } catch (error) {
        next(error);
    }
}


// - MODIFICAR

const updateContributor = async (req, res, next) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const contributor = await Contributor.findByIdAndUpdate(id, body, { new: true });
        if (!contributor) {
            return res.status(404).json({
                status: 404,
                message: HTTPSTATUSCODE[404],
            });
        }
        res.status(200).json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            data: contributor
        });
    } catch (error) {
        next(error);
    }
}

// - DELETE

const deleteContributor = async (req, res, next) => {
    try {
        const id = req.params.id;
        const contributor = await Contributor.findByIdAndDelete(id);

        if (!contributor) {
            return res.status(404).json({
                status: 404,
                message: HTTPSTATUSCODE[404],
                data: contributor
            });
        }

        res.status(200).json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            data: contributor
        });

    } catch (error) {
        next(error);
    }
};



module.exports = { getContributor, getContributors, createContributor, updateContributor, deleteContributor }