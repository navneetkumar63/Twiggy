import userModel from "../models/userModel.js"


 // Add items to user cart
    const addToCart = async (req, res) => {
        try {
            let userData = await userModel.findById(req.userId);
            if (!userData) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }
    
            let cartData = userData.cartData || {};
    
            cartData[req.body.itemId] = (cartData[req.body.itemId] || 0) + 1;
    
            await userModel.findByIdAndUpdate(req.userId, { $set: { cartData } }, { new: true });
    
            return res.json({
                success: true,
                message: "Added to cart",
            });
        } catch (error) {
            console.error("Error in addToCart:", error);
            return res.status(500).json({
                success: false,
                message: "Server error",
            });
        }
    };
     
    
//remove items from user cart

const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.userId);
        
        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                cartData
            });
        }

        let cartData = userData.cartData || {}; // Ensure cartData exists
        
        if (!cartData[req.body.itemId]) {
            return res.status(400).json({
                success: false,
                message: "Item not found in cart",
            });
        }

        if (cartData[req.body.itemId] > 1) {
            cartData[req.body.itemId] -= 1; // Decrease quantity
        } else {
            delete cartData[req.body.itemId]; // Remove item when count reaches 0
        }

        // Update in database with $set
        await userModel.findByIdAndUpdate(req.userId, { $set: { cartData } }, { new: true });

        return res.json({
            success: true,
            message: "Removed from cart",
            cartData,
        });
    } catch (error) {
        console.error("Error in removeFromCart:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};


//fetch user cart data

const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.userId); 
        
        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        let cartData = userData.cartData ;

        return res.json({
            success: true,
            cartData
        });
    } catch (error) {
        console.error("Error in getCart:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};


export {addToCart,removeFromCart,getCart}
