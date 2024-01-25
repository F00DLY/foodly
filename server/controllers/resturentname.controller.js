
import { asynchandler } from "../utils/asynchendller.js";
import { Restaurant } from '../models/Restaurant.model.js'; 


const getResturantname=asynchandler(async(req,res)=>{
    try {
        const restaurants = await Restaurant.find({}, '_id Restaurantname');
        const restaurantData = restaurants.map((restaurant) => ({
          id: restaurant._id,
          name: restaurant.Restaurantname,
        }));
        res.json({ restaurants: restaurantData });
      } catch (error) {
        console.error('Error fetching restaurants:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
})


export{
    getResturantname
}