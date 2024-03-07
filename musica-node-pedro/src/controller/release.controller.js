const Release = require('../model/release.model');
const HTTPSTATUSCODE = require("../../utils/httpStatusCode");

const getRelease = async (req, res, next) => {
    try {
        const id = req.params.id;
        const release = await Release.findById(id);
        res.status(200).json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            data: release
        });
    } catch (error) {
        next(error)
    }
}

// -- TODAS LAS CANCIONES
const getReleases = async (req, res, next) => {
    try {

        const release = await Release.find()
        res.status(200).json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            data: release
        });
    } catch (error) {
        next(error)
    }
}

const createRelease = async (req, res, next) => {
    try {
        const { upc, name, tracks } = req.body;
        const cover = req.file ? req.file.filename : null;
        const release = new Release({
            upc,
            name,
            tracks,
            cover: cover
        });
        await release.save();
        res.status(201).json({
            status: 201,
            message: HTTPSTATUSCODE[201],
            data: release
        });
    } catch (error) {
        next(error);
    }
}


const updateRelease = async (req, res, next) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const release = await Release.findByIdAndUpdate(id, body, { new: true });
        if (!release) {
            return res.status(404).json({
                status: 404,
                message: HTTPSTATUSCODE[404],
            });
        }
        res.status(200).json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            data: release
        });
    } catch (error) {
        next(error);
    }
}


const deleteRelease = async (req, res, next) => {
    try {
        const id = req.params.id;
        const release = await Release.findByIdAndDelete(id);

        if (!release) {
            return res.status(404).json({
                status: 404,
                message: HTTPSTATUSCODE[404],
                data: release
            });
        }

        res.status(200).json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            data: release
        });

    } catch (error) {
        next(error);
    }
};



module.exports = { getRelease, getReleases, createRelease, updateRelease, deleteRelease }