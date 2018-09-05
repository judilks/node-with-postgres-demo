var express = require('express');
var router = express.Router();
const db = require('../db')

/* GET employees listing. */
router.get('/', async (req, res, next) => {
    try{
        const result =  await db.query('SELECT * from EMP_DTL')
        if(result.rowCount === 0){
            throw 'No employees available'
        }
        else{
            res.status(200)
            .json({
                status:'Success',
                message:'recieved employees',
                data: result.rows
            })
        }
        
    }
    catch(e) {
        res.status(201)
        .json({
            status:'Failue',
            error:e
        })
    }
    
});

router.post('/', async (req, res, next) => {
    try{
        const result = await db.query("INSERT INTO EMP_DTL(name, email) values($1, $2)", [req.body.name, req.body.email])
        console.log(result)
        res.status(200)
        .json({
            status:'Success',
            message:'added employee'
        })
    }
    
    catch(e) {
        res.status(201)
        .json({
            status:'Failue',
            error:e
        })
    }
})

router.post('/:id', async (req, res, next) => {
    try{
        const result = await db.query("DELETE FROM EMP_DTL WHERE ID=$1", [req.params.id])
        console.log(result)
        res.status(200)
        .json({
            status:'Success',
            message:'deleted employee'
        })
    }
    catch(e) {
        res.status(201)
        .json({
            status:'Failue',
            error:e
        })
    }
})

router.get('/:id', async (req, res, next) => {
    try{
        const result = await db.query("SELECT * FROM EMP_DTL WHERE ID=$1", [req.params.id]);
        if(result.rowCount === 0){
            throw "No user with that id"
        }
        res.status(200)
        .json({
            status:'Success',
            message:'recieved employee',
            data: result.rows
        })
    }
    catch(e) {
        res.status(201)
        .json({
            status:'Failue',
            error:e
        })
    }
})

router.put('/:id', async (req, res, next) => {
    try{
        const result = await db.query("UPDATE EMP_DTL SET name=$2, email=$3 WHERE ID=$1", [req.params.id, req.body.name, req.body.email])
        console.log(result)
        res.status(200)
        .json({
            status:'Success',
            message:'updated employee',
        })
    }
    catch(e) {
        res.status(201)
        .json({
            status:'Failue',
            error:e
        })
    }
})

module.exports = router;
