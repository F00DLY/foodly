import { Router } from 'express';
import { verifyjwt } from '../midlewere/auth.midlewere.js';
import {
  additem,
  creatcart,
  removecartitem,
} from '../controllers/cart.controller.js';

const router = Router();

router.route('/create-cart').post(verifyjwt, creatcart);
router.route('/add-cart').post(verifyjwt, additem);
router.route('/remove-cartitem').post(verifyjwt, removecartitem);

export default router;
