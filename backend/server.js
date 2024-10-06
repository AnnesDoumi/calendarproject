// Importiere notwendige Module
const express = require('express');
const multer = require('multer');
const cors = require('cors');

// Konfiguriere Multer für die Dateispeicherung
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Generiere einen einzigartigen Dateinamen
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Erstelle eine neue Express-Anwendung
const app = express();
const PORT = 3000;

// Aktiviere CORS für alle eingehenden Anfragen
app.use(cors());

// Definiere die Route für den Hauptzugriffspunkt
app.get('/', (req, res) => {
    res.send('public/index.html');
});

// Definiere die Route für das Hochladen von Dateien
app.post('/upload', upload.single('image'), (req, res) => {
    console.log('Received file', req.file.originalname);
    res.json({ message: 'Datei erfolgreich hochgeladen!' });
});

// Starte den Server
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
