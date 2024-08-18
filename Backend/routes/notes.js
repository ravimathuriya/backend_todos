const express = require('express')
const router = express.Router();
const Notes = require("../models/Notes")
const { body, validationResult } = require('express-validator');
const fetchuser = require("../middleware/fetchuser")


//Router 1 - fetch user notes by get request. logged in required
router.get('/fetchnotes',
    fetchuser,
     async(req, res)=>{
        
        try {
            const notes = await Notes.find({user:req.user.id})

            res.send(notes); 
        } 
        
        catch (error) {
          console.log({error:"internal server error"})  
        }
        

     })   

//Router 2 - create notes for existed user by post request. logged in required
router.post('/createnote', fetchuser,
    body('title').isLength({min:3}).withMessage('must be at least 3 chars long'),
    body('description').isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
     async(req, res)=>{
    
    try{
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    //creating a note
    const user = await Notes.create({
        user:req.user.id, //(id fetched from fetchuser function)
        title: req.body.title,
        description: req.body.description,})

    //save to database
    res.json(user)
    }

    catch (error) {
        console.log({error:"internal server error"})  
      }

})

//Router 3 - update the note for existed user by put request. logged in required
router.put(`/updatenote/:id`, fetchuser, async(req, res)=>{

    try{
    const{title, description} = req.body;

    //create a note when it not found
    const newnote = {};
    if(title){newnote.title = title};
    if(description){newnote.description = description};

    //find the note to be updated and update it
    let note = await Notes.findById(req.params.id);

    if(!note){
        return res.status(404).send("note not found")
    }

    if(note.user.toString() != req.user.id){
        return res.status(404).send("not allowed")
    }

    note = await Notes.findByIdAndUpdate(req.params.id, {$set:newnote}, {new:true})

    res.json({note});
}

catch (error) {
    console.log({error:"internal server error"})  
  }

     })


//Router 4 - delete the note for existed user by delete request. logged in required
router.delete(`/deletenote/:id`, fetchuser, async(req, res)=>{

    try{
    //find the note to be updated and update it
    let note = await Notes.findById(req.params.id);

    if(!note){
        return res.status(404).send("note not found")
    }

    if(note.user.toString() != req.user.id){
        return res.status(404).send("not allowed")
    }

    note = await Notes.findByIdAndDelete(req.params.id)

    res.status(200).json("Success:Note deleted")

}

catch (error) {
    console.log({error:"internal server delete error"})  
  }
     })     

module.exports = router;