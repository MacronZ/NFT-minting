import express from 'express';
import { documentController } from '../controllers';

const router = express.Router();

router.post('/upload', documentController.uploadDocument);
router.put('/update', documentController.updateDocument);
router.get('/get-docs', documentController.getDocumentsByUserId);
router.post('/create', documentController.createDocument);
router.get('/check', documentController.checkDocumentsStatus);
router.delete('/delete', documentController.deleteDocument);

export = router;
