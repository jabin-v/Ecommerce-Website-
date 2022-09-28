const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/user-controller');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middlewares/verifyRoles');
const verifyToken = require('../../middlewares/verifyToken');

router.route('/')

    .get(verifyToken,verifyRoles(ROLES_LIST.Admin), usersController.getAllUsers)
    .delete(verifyToken,verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);
router.route("/address").patch(verifyToken,usersController.saveAddress)    
router.route("/userstats").get(verifyToken,verifyRoles(ROLES_LIST.Admin), usersController.getStats)
router.route("/stats").get(verifyToken,verifyRoles(ROLES_LIST.Admin), usersController.stats)

router.route('/:id')
    .get(verifyToken,verifyRoles(ROLES_LIST.Admin), usersController.getUser);

 



module.exports = router;