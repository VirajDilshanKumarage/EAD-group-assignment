const axios = require('axios');

// inventory service url
const inventoryServiceBaseURL = 'http://external-inventory-service.com'; 

class InventoryService {
    // Function to check if a product is available in the inventory service
    async isProductAvailable(productId, quantity) {
        try {
            const response = await axios.get(
                `${inventoryServiceBaseURL}/check-availability/${productId}/${quantity}`
            );

            if (response.data.available) {
                return true; // Product is available
            } else {
                return false; // Product is not available
            }
        } catch (error) {
            console.error(error);
            throw new Error('Error communicating with the external inventory service');
        }
    }

}

module.exports = new InventoryService();
