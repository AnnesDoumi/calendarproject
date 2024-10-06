const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export default async function handler(req, res) {
    if (req.method === 'POST') {
        upload.single('image')(req, res, function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            // Hier kannst du das Bild weiter verarbeiten oder in einen Cloud-Speicher hochladen
            console.log('Received file', req.file.originalname);
            res.status(200).json({ message: 'Bild erfolgreich hochgeladen!' });
        });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
