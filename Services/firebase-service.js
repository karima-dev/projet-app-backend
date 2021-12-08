var firebaseConfig = require("../Configs/firebase");
const db = firebaseConfig.firebaseDb;
var livreRef = db.ref("/livres");
var empruntRef = db.ref("/emprunts");

const getAllLivres = async () => {
  return await livreRef.once("value");
  
};
const infoEmprunt = async (
  nameUser,
  cinUser,
  dateEmprunt,
  dateRetour,
  moyen,
  etatemprunt,
  livre
) => {
  const thekey = empruntRef.child("emprunts").push().key;

  return await empruntRef
    .child(thekey)
    .set({
      id: thekey,
      nameUser: nameUser,
      cinUser: cinUser,
      dateEmprunt: dateEmprunt,
      dateRetour: dateRetour,
      moyen: moyen,
      etatemprunt: etatemprunt,
      livre: livre,
    })
    .then((res) => {
      return {
        error: false,
        message: "",
        data: {
          form: {
            id: thekey,
            nameUser: nameUser,
            cinUser: cinUser,
            dateEmprunt: dateEmprunt,
            dateRetour: dateRetour,
            moyen: moyen,
            etatemprunt: etatemprunt,
            livre: livre,
          },
        },
      };
    })
    .catch((err) => {
      return {
        error: true,
        message: err.message,
        data: null,
      };
    });
};
const updateRetourLivre = async (idlivre) => {
  await livreRef
    .child(idlivre)
    .child("nbre")
    .once("value")
    .then((res) => {
      var updates = {};
      updates["/" + idlivre + "/" + "nbre"] = Number(res.val()) + 1;
      return livreRef.update(updates);
    })
    .catch((err) => {
      return {
        error: true,
        message: err.message,
        data: null,
      };
    });
};
const updateListLivre = async (idlivre, empruntId) => {
  await livreRef
    .child(idlivre)
    .child("nbre")
    .once("value")
    .then((res) => {
      var updates = {};
      var updatesEtat = {};
      updates["/" + idlivre + "/" + "nbre"] = Number(res.val()) - 1;
      updatesEtat["/" + empruntId + "/" + "etatemprunt"] = "en cours";
      return livreRef.update(updates), empruntRef.update(updatesEtat);
    })
    .catch((err) => {
      return {
        error: true,
        message: err.message,
        data: null,
      };
    });
};
const postListLivre = async () => {
  const thekey = livreRef.child("livres").push().key;
  return await livreRef.child(thekey).set({
    id: thekey,
    ean: "9782263175008",
    titre: "MON CAHIER HAPPY AT WORK",
    auteur: "Fabienne Broucaret",
    src: "https://lisez6.cdnstatics.com/usuaris/libros/fotos/9782263176/m_libros/9782263175008ORI.jpg",
    nbre: 20,
    date: "14/01/2021",
    emplacement:"Couloir:5 Range:12",
    description:
    "Le rêve ultime : travailler dans un lieu qui ressemble à la maison, dans une atmosphère calme et pleine de bonnes ondes, l’esprit serein, en se sentant en phase avec son job, avec des temps de bien-être prévus au cours de la journée… Le travail good mood, c’est possible ! Toutes les techniques pour trouver sa place dans son job, se ressourcer au travail, s’organiser, être au top de son potentiel et trouver le temps de prendre soin de soi !"  });
};
const getAllEmprunts = async () => {
  return empruntRef.once("value");
};
const remove = async (ref) => {
  return empruntRef.child(ref).remove();
};
const updateValiderEmprunt = async (idlivre, idemprunt) => {
  await livreRef
    .child(idlivre)
    .child("nbre")
    .once("value")
    .then((res) => {
      var updates = {};
      var updatesEtat = {};
      updates["/" + idlivre + "/" + "nbre"] = Number(res.val()) - 1;
      updatesEtat["/" + idemprunt + "/" + "etatemprunt"] = "en cours";
      return livreRef.update(updates, updatesEtat);
    })
    .catch((err) => {
      return {
        error: true,
        message: err.message,
        data: null,
      };
    });
};
module.exports = {
  updateRetourLivre,
  getAllEmprunts,
  postListLivre,
  infoEmprunt,
  updateListLivre,
  remove,
  updateValiderEmprunt,
  getAllLivres,
};
