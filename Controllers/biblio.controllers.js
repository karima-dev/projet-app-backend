var firebaseService = require("../Services/firebase-service");
var firebaseUtils = require("../Utils/firebase.utils");

const getAllLivres = (req, response) => {
  return firebaseService.getAllLivres().then(res => {
      response.status(200).send(firebaseUtils.childsToArray(res.val()));
      
  }) 

}
const getid = (req, response) => {
  return firebaseService.postListLivre().then((res) => {
    response.status(200).send(res);
  });
};
const postEmprunt = (req, response) => {
  return firebaseService
    .infoEmprunt(
      req.body.nameUser,
      req.body.cinUser,
      req.body.dateEmprunt,
      req.body.dateRetour,
      req.body.moyen,
      req.body.etatemprunt,
      req.body.livre
    )
    .then((res) => {
      response.status(200).send(res);
    })
    .catch((err) => response.status(400).send(err));
};
const updateListLecture = async (req, response) => {
  await firebaseService
    .updateListLivre(req.body.id, req.body.idEmprunt)
    .then((res) => {
      response.status(200).send(res);
    })
    .catch((err) => response.status(400).send(err));
};

const updateRetourLivre = (req, response) => {
  firebaseService
    .updateRetourLivre(req.body.id)
    .then((res) => {
      response.status(200).send(res);
    })
    .catch((err) => response.status(400).send(err));
};

const updateValiderEmp = (req, response) => {
  firebaseService
    .updateValiderEmprunt(req.body.id, req.body.idEmprunt)
    .then((res) => {
      response.status(200).send(res);
    })
    .catch((err) => response.status(400).send(err));
};
const getAllEmprunts = async (req, response) => {
  return firebaseService
    .getAllEmprunts()
    .then((res) => {
      if (res.error) response.status(400).send(res);
      response.status(200).send(firebaseUtils.childsToArray(res.val()));
    })
    .catch((err) => response.status(400).send(err));
};
const removeEmprunt = async (req, response) => {
  return firebaseService
    .remove(req.body.id)
    .then((res) => {
      response.status(200).send(res);
    })
    .catch((err) => response.status(400).send(err));
};

module.exports = {
  getid,
  postEmprunt,
  updateListLecture,
  getAllEmprunts,
  updateRetourLivre,
  removeEmprunt,
  updateValiderEmp,
  getAllLivres,
};
