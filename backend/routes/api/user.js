const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/user-controller');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middlewares/verifyRoles');

router.route('/')
// verifyRoles(ROLES_LIST.Admin), 
    .get(usersController.getAllUsers)
    .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);
router.route("/address").patch(usersController.saveAddress)    
router.route("/userstats").get(usersController.getStats)
router.route("/stats").get(usersController.stats)

router.route('/:id')
    .get(verifyRoles(ROLES_LIST.Admin), usersController.getUser);

 



module.exports = router;