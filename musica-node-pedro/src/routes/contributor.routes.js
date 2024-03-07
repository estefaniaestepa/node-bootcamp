const express = require('express');
const contributorRouter = express.Router();
const { getContributor, getContributors, createContributor, updateContributor, deleteContributor } = require('../controller/contributor.controller');

const { isAuth } = require('../middlewares/auth.middleware');

contributorRouter.get('/:id', getContributor);
contributorRouter.get('/', getContributors);
contributorRouter.post('/', [isAuth], createContributor);
contributorRouter.patch('/:id', [isAuth], updateContributor);
contributorRouter.delete('/:id', [isAuth], deleteContributor);


module.exports = contributorRouter;