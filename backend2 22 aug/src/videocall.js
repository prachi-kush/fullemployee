// videoCall.js

const express = require('express');
const router = express.Router();
const { ZegoUIKitPrebuilt } = require('@zegocloud/zego-uikit-prebuilt');

// const { ZegoUIKitPrebuilt } = require('@zegocloud/zego-uikit-prebuilt');
const { ZegoSDK } = require('zego-sdk'); // Replace 'zego-sdk' with the actual SDK import

router.post('/join', async (req, res) => {
    try {
      // Extract relevant information from the request body
      const { roomId, userId } = req.body;
  
      // Initialize the Zego SDK with your credentials
      const appId = 351359231; // Replace with your Zego App ID
      const serverSecret = "abdbc282d9d8f923de12119e34841ab1"; // Replace with your Zego Server Secret
      const zegoClient = new ZegoSDK();
      
      // Initialize the SDK with your credentials
      await zegoClient.init({
        appId,
        serverSecret,
      });
  
      // Join the room
      const joinResult = await zegoClient.joinRoom(roomId, userId);
  
      if (joinResult) {
        // Handle successful join (e.g., send a success response)
        res.status(200).json({ message: 'Joined video call successfully' });
      } else {
        // Handle join failure (e.g., send an error response)
        res.status(500).json({ error: 'Failed to join video call' });
      }
    } catch (error) {
      // Handle any errors that may occur during the process
      console.error('Error joining video call:', error);
      res.status(500).json({ error: 'Failed to join video call' });
    }
  });

  
// Route to leave a video call
router.post('/leave', async (req, res) => {
    try {
      // Extract relevant information from the request body
      const { roomId, userId } = req.body;
  
      // Initialize the Zego SDK with your credentials (if not initialized already)
      const appId = 351359231; // Replace with your Zego App ID
      const serverSecret = "abdbc282d9d8f923de12119e34841ab1"; // Replace with your Zego Server Secret
      const zegoClient = new ZegoSDK();
  
      // Initialize the SDK with your credentials (if not initialized already)
      await zegoClient.init({
        appId,
        serverSecret,
      });
  
      // Leave the room
      const leaveResult = await zegoClient.leaveRoom(roomId, userId);
  
      if (leaveResult) {
        // Handle successful leave (e.g., send a success response)
        res.status(200).json({ message: 'Left video call successfully' });
      } else {
        // Handle leave failure (e.g., send an error response)
        res.status(500).json({ error: 'Failed to leave video call' });
      }
    } catch (error) {
      // Handle any errors that may occur during the process
      console.error('Error leaving video call:', error);
      res.status(500).json({ error: 'Failed to leave video call' });
    }
  });


// Route to generate kit tokens
router.post('/generateToken', async (req, res) => {
    try {
      const { roomId, userId } = req.body;
      const appId = 351359231;
      const serverSecret = "abdbc282d9d8f923de12119e34841ab1";
  
      // Generate the Zego video call token
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appId,
        serverSecret,
        roomId,
        Date.now().toString(),
        userId
      );
  
      // Return the generated token
      res.status(200).json({ kitToken });
    } catch (error) {
      console.error('Error generating video call token:', error);
      res.status(500).json({ error: 'Failed to generate video call token' });
    }
  });

module.exports = router;
