const express = require('express');
const router = express.Router();
const RawMaterials = require('../models/Raw');



router.post('/', async(req, res)=>{

   let numberRemaining = Number(req.body.numberIn) - Number(req.body.numberOut)

    const data = new RawMaterials({
        name:  req.body.name,
        numberIn: req.body.numberIn,
        numberOut: req.body.numberOut,
        comments: req.body.comments,
        numberRemaining: numberRemaining
         })
 
    try { 
    
        if (req.body.numberIn < req.body.numberOut){
            res.json({
                status: 400,
                message: 'no more goods'
            })
        }
        await data.save();
        res.status(200).json({
            data: data
        })
        console.log(data);
    } catch (ex) {
        res.send(ex.message);
        console.log(ex.message);
    }

});

//Get a particular item from the inventory
router.get('/:id', async(req, res)=>{
  try {
     let data = await RawMaterials.findById(req.params.id, {isDeleted: false});
        res.status(200).json({data: data})
    } catch (ex) {
        res.status(400).send(ex.message);
        console.log(ex.message);
    }
});

//Get all items from the inventory
router.get('/', async(req, res)=>{
    try {
        let data = await RawMaterials.find({ isDeleted: false });
        res.status(200).json({data: data})
    } catch (ex) {
        res.status(400).send(ex.message);
        console.log(ex.message);
    }
});

//update a particular field in the inventory
router.patch('/:id', async(req, res)=>{
try {
    let data = await RawMaterials.findByIdAndUpdate( req.params.id, {
        name:  req.body.name,
        numberOut: req.body.numberOut,
        numberIn: req.body.numberIn
    });
    if(!data){
        return res.send('data does not exist')
    }
    res.status(200).json({data: data})
} catch (ex) {
    res.status(400).send(ex.message);
    console.log(ex.message);
}

});

//Delete a particular item from the inventory
router.delete('/:id', async(req, res)=>{
    const data = await RawMaterials.findByIdAndUpdate(req.params.id, {
        comments: req.body.comments,
        isDeleted: true
    });
   
    try {
        if(data.isDeleted == true){
            return res.status(400).json({
                message:"data does not exist"
            })
        };
        console.log(data);
        res.status(200).json({
            data: 'entry has been deleted'
        });
    } catch (ex) {
        console.log(ex.message);
    
    }
});

//Restore a deletd item back into the inventory
router.put('/:id/restore', async(req, res)=>{
    try {
        const data = await RawMaterials.findByIdAndUpdate( req.params.id, {
            comments: req.body.comments,
            isDeleted: false
        });
        if(!data){
            return res.status(400).send('data does not exist')
        }
        res.status(200).json({
            message: 'data is restored',
            data: data})
    } catch (ex) {
        res.status(400).send(ex.message);
        console.log(ex.message);
    }
    
    });




module.exports = router;