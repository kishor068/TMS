import { Router } from "express";

// const { loginAdmin } = require('../controllers/adminController');

export const AdminLoginRouter = Router();

AdminLoginRouter.post('/login', (req,res)=>{
 console.log("heelo gurudat");
 res.send("hello wolrdddd ")
});

// module.exports = router;sss
