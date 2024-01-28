import { Restaurant } from "../models/Restaurant.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asynchandler } from "../utils/asynchendller.js"; // Fix the typo in import
import { Rating } from "../models/rating.model.js";

const createRating = asynchandler(async (req, res) => {
    try {
        const userId = req.user._id;
        if (!userId) {
            throw new ApiError(200, "user id not found");
        }
        const { rating, ResturentId } = req.body;
        console.log(rating, ResturentId);
        const restaurant = await Restaurant.findById(ResturentId);

        if (!restaurant) {
            throw new ApiError(200, "restaurant not found");
        }
        const restaurantname = restaurant.Restaurantname;

        if (!restaurantname) {
            throw new ApiError(200, "restaurant name not found");
        }
        const newRating = new Rating({
            Rating: rating,
            Restaurantname: restaurant.Restaurantname,
            RestaurantId: restaurant._id
        });
       
        const ratingdata = await newRating.save();
        
        console.log(ratingdata);
        return res.status(200).json(ratingdata);
    } catch (error) {
        throw new ApiError(500, "server not response");
    }
});

const calculateAverageRating = asynchandler(async (req, res) => {
    try {
        // Group ratings by restaurant name and calculate average
        const averageRatings = await Rating.aggregate([
            {
                $group: {
                    _id: "$Restaurantname",
                    averageRating: { $avg: "$Rating" }
                }
            }
        ]);
        console.log(averageRatings); // Fix the typo in the log statement
        return res.status(200).json(averageRatings);
    } catch (error) {
        throw new ApiError(500, "server not response");
    }
});

export { createRating, calculateAverageRating };
