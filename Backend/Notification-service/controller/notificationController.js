// const express = require('express');
// const notification = require('../models/notification');

// const router = express.Router();

// let notificationIdCounter = 1; // Initialize the counter

// // Save, update, or delete notification
// const failedMailHandler = async (req, res) => {
//     const email = req.body.email;

//     try {
//         // Check if a document with the email exists in the database
//         const existingDocument = await notification.findOne({ email });

//         if (existingDocument) {
//             // If it exists, update the sendError field by incrementing it by 1
//             existingDocument.sendError += 1;

//             if (existingDocument.sendError >= 3) {
//                 // If sendError reaches 3 or more, delete the document
//                 await notification.deleteOne({ email });
//                 return res.status(200).json({
//                     success: "Document deleted due to sendError reaching 3 or more."
//                 });
//             } else {
//                 // Save the updated document
//                 await existingDocument.save();
//                 return res.status(200).json({
//                     success: "sendError updated successfully"
//                 });
//             }
//         } else {
//             // If it doesn't exist, create a new document with auto-incremented notificationId
//             const newPost = new notification({
//                 email,
//                 sendError: 0,
//                 notificationId: notificationIdCounter++
//             });
//             await newPost.save();
//             return res.status(200).json({
//                 success: "New document created successfully"
//             });
//         }
//     } catch (err) {
//         return res.status(400).json({
//             error: err.message
//         });
//     }
// }

// exports.failedMailHandler=failedMailHandler;

