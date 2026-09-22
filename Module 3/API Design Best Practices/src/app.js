const express = require('express');
const postRoutes = require('./routes/postRoutes');
const { resetData } = require('./data/postStore');
const controller = require('./controllers/postController');

function createApp() {
  const app = express();
  app.use(express.json());

  // Resource-oriented routes
  app.use('/posts', postRoutes);

  // Safe internal failure route
  app.get('/internal/fail', (req, res) => {
    res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_DEMO_FAILURE",
        message: "This is a simulated failure for testing."
      }
    });
  });

  return app;
}

if (require.main === module) {
  const app = createApp();
  const port = 3000;
  app.listen(port, () => {
    console.log(`Starter API listening on port ${port}`);
  });
}

module.exports = {
  createApp,
  resetData
};
