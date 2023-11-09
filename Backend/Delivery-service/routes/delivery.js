const express = require('express');
const { updateDelivery, getAllDelivery, getDeliveryBy, modifyOrder, deleteDelivery } = require('../functions/delivery.js');


const router = express.Router();


// router.post('/create', async (req, res, next) => {


//     let { data } = req.body;

//     let resObj = await createDelivery(data);

//     console.log("data obj : " + resObj);

//     res.json({ data: resObj });

// });

router.put('/update/:order_id', async (req, res, next) => {
    const { order_id } = req.params; // Extract order_id from route parameters
    const data = req.body; // Use the entire request body as data

    let resObj = await updateDelivery(order_id, data);

    console.log("data obj : ", resObj);

    res.json({ data: resObj });
});


router.get('/', async (req, res, next) => {

    let resObj = await getAllDelivery();

    console.log("data obj : " + resObj);

    res.json({ data: resObj });

});

router.get('/filter', async (req, res, next) => {

    let { params } = req.body;

    let resObj = await getDeliveryBy(params);

    console.log("data obj : " + resObj);

    res.json({ data: resObj });

});

router.post('/modify-order', async (req, res) => {
    const orderDetails = req.body.orderDetails;
    const result = await modifyOrder(orderDetails);
    res.json(result);
  });

  router.delete('/:order_id', async (req, res) => {
    const order_id = req.params.order_id;
    const result = await deleteDelivery(order_id);
    res.json(result);
});


module.exports = router;