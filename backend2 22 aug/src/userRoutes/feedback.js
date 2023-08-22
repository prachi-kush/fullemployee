const express = require('express');
const router = express.Router();
const Feedback = require('../database/feedbackSchema'); // Import the feedback model

// Endpoint to handle form submissions
router.post('/feedback', async (req, res) => {
  try {
    const { feedbackType, issue, solution, myname, department } = req.body;

    // Basic input validation
    if (!feedbackType || !issue || !solution) {
      return res.status(400).json({ error: 'Feedback type, issue, and solution are required.' });
    }

    // Create a new feedback object using the Mongoose model and save it to the database
    const feedback = new Feedback({
      feedbackType,
      issue,
      solution,
      myname,
      department,
    });

    const savedFeedback = await feedback.save();
    console.log('Feedback saved:', savedFeedback);
    res.status(200).json({ message: 'Feedback submitted successfully!', feedback: savedFeedback });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ error: 'An error occurred while saving the feedback.' });
  }
});

router.get('/feedback/:key',async(req,res)=>{
  
  try{
      let feedbackData=await Feedback.find(
        
             {"feedbackType":req.params.key}
           
      )
     
      res.send(feedbackData).status(200)
 }catch(errr){
      console.log("errrr",errr)
      res.send(errr)
  }
})


module.exports = router;
