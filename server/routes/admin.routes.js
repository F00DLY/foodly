import { Router } from 'express';
import {
  adminlogin,
  logoutadmin,
  registeradmin,
} from '../controllers/admindashbord.controller.js';
import { resturentstatuschange } from '../controllers/resturentname.controller.js';
import { verifyjwt } from '../midlewere/admin.middlewere.js';

const router = Router();

router.route('/resister').post(registeradmin);
router.route('/login').post(adminlogin);
router.route('/verify').post(resturentstatuschange);
router.route('/logout').post(verifyjwt, logoutadmin);

export default router;
