const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/user-controller');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middlewares/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), usersController.getAllUsers)
    .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);
router.route("/address").patch(usersController.saveAddress)    

router.route('/:id')
    .get(verifyRoles(ROLES_LIST.Admin), usersController.getUser);



module.exports = router;