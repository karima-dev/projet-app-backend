const express = require('express');
const router = express.Router();
const biblioController = require("../Controllers/biblio.controllers")
 
 
 
router.post('/id', biblioController.getid)
router.get('/all', biblioController.getAllLivres)
router.post('/decouvrir', biblioController.postEmprunt)
router.put('/decouvrir', biblioController.updateListLecture)
router.put('/lecture', biblioController.updateRetourLivre)
router.put('/emprunt/validate', biblioController.updateValiderEmp)
router.get('/emprunts/all', biblioController.getAllEmprunts)
router.delete('/emprunts', biblioController.removeEmprunt)
module.exports = router