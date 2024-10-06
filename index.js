const express = require('express');
const path = require('path');
const app = express();

// Stelle den public Ordner für statische Dateien zur Verfügung
app.use(express.static('public'));

app.get('/', (req, res) => {
    // Sende die index.html an den Client
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
