const {workerData, parentPort } = require('worker_threads');

let message;

try {
    // Check if a document with the email exists in the database
    const existingDocument = await notification.findOne({ email: workerData });
    if (existingDocument) {
      await notification.deleteOne({ email:input.email });
      message = "Email successfully sent. Document has been deleted from the";
    }
  } catch (err) {
    message = "No action needed"
    console.log("Error",err);
  }
 
  parentPort.postMessage(message);