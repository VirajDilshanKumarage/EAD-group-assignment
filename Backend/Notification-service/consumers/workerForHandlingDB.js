const { workerData, parentPort } = require('worker_threads');

// Define a Factory function for creating workers
function createWorker(email) {
  return {
    handleDB: async () => {
      try {
        // Check if a document with the email exists in the database
        const existingDocument = await notification.findOne({ email });
        if (existingDocument) {
          await notification.deleteOne({ email });
          return "Email successfully sent. Document has been deleted from the database.";
        } else {
          return "No action needed";
        }
      } catch (err) {
        console.log("Error", err);
        return "An error occurred while processing the request.";
      }
    },
  };
}

// Create a worker with the provided email
const worker = createWorker(workerData);

// Perform the database handling and post the result to the parent thread
(async () => {
  const message = await worker.handleDB();
  parentPort.postMessage(message);
})();
