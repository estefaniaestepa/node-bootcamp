const express = require('express');
const releaseRouter = express.Router();
const { getRelease, getReleases, createRelease, updateRelease, deleteRelease } = require('../controller/release.controller');

const { upload } = require('../middlewares/file.middleware');
const { isAuth } = require('../middlewares/auth.middleware');

releaseRouter.get('/:id', getRelease);
releaseRouter.get('/', getReleases);
releaseRouter.post('/', [upload.single('cover')], createRelease);
releaseRouter.patch('/:id', [isAuth], updateRelease);
releaseRouter.delete('/:id', [isAuth], deleteRelease);


module.exports = releaseRouter;