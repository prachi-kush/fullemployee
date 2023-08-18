const express = require('express');
const jwt =require('jsonwebtoken');
const EmployeeModel =require('../database/schema')
const router =express.Router();
const secretKey = 'hewfehfhbgbshfbeheheh22122hhgfkdvbpdmgdnAfhcgdfd';

app.post('/refresh', (req, res) => {
    const refreshToken = req.headers.refreshtoken;
  
    if (!refreshToken) {
      return res.status(401).json({ error: 'Refresh token not provided.' });
    }
  
    try {
      jwt.verify(refreshToken, secretKey);
  
      // In a real scenario, you would fetch user data from the database
      // and generate a new access token for the user
      const newAccessToken = jwt.sign({ email: 'user@example.com' }, secretKey, {
        expiresIn: '1h',
      });
  
      res.json({ newAccessToken });
    } catch (error) {
      res.status(401).json({ error: 'Invalid refresh token.' });
    }
  });



router.post('/',async (req,res)=>{
  try{
const refreshToken=req.body;
const decodedRefreshToken =jwt.verify(refreshToken,secretKey);
const user = await EmployeeModel.findOne({email : decodedRefreshToken.email}) 
const newAccessToken = jwt.sign({email:user.email},secretKey,{
  expiresIn:'1m'
});
res.status(200).json({accessToken:newAccessToken})
}catch(error){
    res.status(500).json({error:'Internal server error'})
  }
})


// Endpoint to refresh the access token using a refresh token
// router.post('/', async (req, res) => {
//   try {
//     const { refreshToken } = req.body;

//     // Verify the refresh token
//     const decodedRefreshToken = jwt.verify(refreshToken, secretKey);

//     // Find the admin based on the decoded refresh token data
//     const admin = await AdminModel.findOne({ email: decodedRefreshToken.email });

//     // Generate a new access token
//     const newAccessToken = jwt.sign({ email: admin.email }, secretKey, {
//       expiresIn: '1m', // Set an appropriate expiration for the new access token
//     });

//     // Return the new access token
//     res.status(200).json({ accessToken: newAccessToken });
//   } catch (error) {
//     console.error('Error during token refresh:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

module.exports = router;

  