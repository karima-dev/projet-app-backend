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
    ean: "9782221255629",
    titre: "LES BONNES ONDES",
    auteur: "FABRICE MIDAL",
    src: "https://lisez6.cdnstatics.com/usuaris/libros/fotos/9782221256/m_libros/9782221255629ORI.jpg",
    nbre: 20,
    date: "14/10/2021",
    emplacement:"Couloir:5 Range:12 ",
    description:
    "La musique déclenche dans notre cerveau et notre corps des réactions complexes, qui n’ont pas encore livré tous leurs secrets. Ce que commencent néanmoins à découvrir neuroscientifiques et psychologues, c’est qu’elle aurait des effets insoupçonnés jusque-là sur, entre autres, le développement de l’intelligence et l’acquisition du langage chez l’enfant, certains troubles neurologiques dus au vieillissement…"  });
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
