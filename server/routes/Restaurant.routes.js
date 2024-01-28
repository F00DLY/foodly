import { Router } from 'express';
import {
  loginRestaurant,
  logoutRestaurant,
  registerRestaurant,
  refreshAccessToken,
  deletresturentaccount,
} from '../controllers/Restaurant.controller.js';
import { verifyjwt } from '../midlewere/Restaurant.midlewere.js';
import { changeCurrentPassword } from '../controllers/Restaurant.controller.js';
import {
  removeMenuItem,
  showMenu,
  updateManu,
} from '../controllers/menu.controller.js';
import { getResturantname } from '../controllers/resturentname.controller.js';
import { getresturentprofile } from '../controllers/profileResturent.controller.js';
import {
  openorcloseresturent,
  orderstatuschange,
  resturantshoworder,
} from '../controllers/resturantOrder.controller.js';

const router = Router();

router.route('/register').post(registerRestaurant);
router.route('/login').post(loginRestaurant);
// secured routes
router.route('/logOut').post(verifyjwt, logoutRestaurant);
router.route('/refresh-token').post(refreshAccessToken);
router.route('/password-change').post(verifyjwt, changeCurrentPassword);
router.route('/menu-update').post(verifyjwt, updateManu);
router.route('/menu-remove').post(verifyjwt, removeMenuItem);
router.route('/show-menu').post(showMenu);
router.route('/get-names').post(getResturantname);
router.route('/profile-delet').post(verifyjwt, deletresturentaccount);
router.route('/account').post(verifyjwt, getresturentprofile);
router.route('/resturent-show-order').post(verifyjwt, resturantshoworder);
router.route('/order-status-change').post(verifyjwt, orderstatuschange);
router.route('/close-open').post(verifyjwt, openorcloseresturent);

export default router;
