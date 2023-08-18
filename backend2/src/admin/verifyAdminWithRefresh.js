const jwt = require('jsonwebtoken');
const AdminModel = require('../database/adminSchema');
const secretKey = 'hewfehfhbgbshfbeheheh22122hhgfkdvbpdmgdnAfhcgdfd';

const verifyAdminWithRefresh = async (req, res, next) => {
  try {

    const accessToken = req.headers.authorization?.split(' ')[1];
    console.log('accessToken: ', accessToken);
   
    const refreshToken = req.headers.refreshtoken; // Assume the refresh token is stored in a cookie
    console.log('refreshToken: ', refreshToken);
   

    if (!accessToken && !refreshToken) {
      console.log('refreshToken: notttttttttttttt', refreshToken);
      console.log('accessToken: if check ', accessToken);
      return res.status(401).json({ error: 'Unauthorized. Tokens not provided.' });
    }
   
    try {
      console.log('verify with old access token: ');
      // Verify the access token
      const decodedToken = jwt.verify(accessToken, secretKey);
      console.log('decodedToken: ', decodedToken);
      console.log('accessToken: ', accessToken);
      console.log('decodedToken: ', decodedToken);
      const admin = await AdminModel.findOne({ email: decodedToken.email });
      console.log('admin: ', admin);

      if (admin) {
        req.admin = admin;
        return next();
      }
    } catch (accessTokenError) {
      // Access token verification failed
      console.log('Access token verification failed: ');

      if (!refreshToken) {
        return res.status(401).json({ error: 'Unauthorized. Invalid tokens.' });
      }

      try {
        // Verify the refresh token
        const decodedRefreshToken = jwt.verify(refreshToken, secretKey);
        console.log('decodedRefreshToken: ', decodedRefreshToken);

        // Retrieve the admin based on the refresh token's email
        const admin = await AdminModel.findOne({ email: decodedRefreshToken.email });

        if (admin) {
          // Generate a new access token
          console.log('Generate a new access token: ');
          const newAccessToken = jwt.sign({ email: admin.email }, secretKey, {
            expiresIn: '1h',
          });

          // Store the new access token in the request
          req.admin = admin;
          req.newAccessToken = newAccessToken;
          return next();
        }
      } catch (refreshTokenError) {
        // Refresh token verification failed
        return res.status(401).json({ error: 'Unauthorized. Invalid tokens.' });
      }
    }
 // No valid tokens found
    return res.status(401).json({ error: 'Unauthorized. Invalid tokens.' });
  } catch (error) {
    console.error('Error during admin authentication:', error);
    res.status(401).json({ error: 'Unauthorized. Invalid tokens.' });
  }
};

module.exports = verifyAdminWithRefresh;
