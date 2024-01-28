import { Order } from "../models/Order.model.js";
import { asynchandler } from "../utils/asynchendller.js";
import { ApiError } from "../utils/ApiError.js";

const resturantshoworder = asynchandler(async (req, res) => {
    try {
        const restaurantName = req.restaurant.Restaurantname;
        console.log("Retrieving orders for restaurant: " + restaurantName);

        const orders = await Order.find({ 'Resturantname': restaurantName });
console.log(orders)
        if (!orders) {
            throw new ApiError(404, "Orders not found for the specified restaurant");
        }

        return res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        throw new ApiError(500, "Failed to retrieve orders");
    }
});

const orderstatuschange = asynchandler(async (req, res) => {
    try {
        const { status, orderid } = req.body;
        console.log('Request Data:', { status, orderid });

        const order = await Order.findById(orderid);
        console.log(order)
        if (!order) {
            throw new ApiError(400, "Order not found");
        }

        order.status = status;
        await order.save();

        return res.status(200).json({ success: true, message: "Status changed successfully" });
    } catch (error) {
        console.error(error);
        throw new ApiError(500, "Failed to update order status");
    }
});

















export {
    resturantshoworder,
    orderstatuschange
};
