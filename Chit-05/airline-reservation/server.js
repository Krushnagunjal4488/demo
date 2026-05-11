const express = require('express');

const app = express();

const PORT = 3000;

// Serve Static Files
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});