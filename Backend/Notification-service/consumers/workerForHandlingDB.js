const {workerData, parentPort } = require('worker_threads');
const notification = require('../models/notification');
const database = require('../databaseConnection');

database.connect();

let message;

const dataBaseWorker = async () => {
  try {
    // Check if a document with the email exists in the database
    const existingDocument = await notification.findOne({ email: workerData });
    if (existingDocument) {
      await notification.deleteOne({ email:input.email });
      message = "Email successfully sent. Document has been deleted from the DB";
    }else{
      message = "Email successfully sent. Document is not available in the DB"
    }
  } catch (err) {
    message = "No action needed"
    console.log("Error",err);
  }
}

dataBaseWorker();
 
parentPort.postMessage(message);