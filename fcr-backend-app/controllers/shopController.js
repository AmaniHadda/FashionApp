const Shop = require("../models/shop"); 
const createShop = async (data) => {
  try {
    const shop = await Shop.create(data);
    console.log("Nouveau shop créé :", shop);
    return shop;
  } catch (error) {
    console.error("Erreur lors de la création du shop :", error);
    throw error;
  }
};

const getAllShops = async () => {
  try {
    const shops = await Shop.find();
    console.log("Liste des shops :", shops);
    return shops;
  } catch (error) {
    console.error("Erreur lors de la récupération des shops :", error);
    throw error;
  }
};

const getShopById = async (id) => {
  try {
    const shop = await Shop.findById(id);
    if (!shop) {
      console.log("Aucun shop trouvé avec l'ID :", id);
      return null;
    }
    console.log("Shop trouvé :", shop);
    return shop;
  } catch (error) {
    console.error("Erreur lors de la récupération du shop par ID :", error);
    throw error;
  }
};

const updateShop = async (id, data) => {
  try {
    const shop = await Shop.findByIdAndUpdate(id, data, { new: true });
    if (!shop) {
      console.log("Aucun shop trouvé avec l'ID :", id);
      return null;
    }
    console.log("Shop mis à jour :", shop);
    return shop;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du shop :", error);
    throw error;
  }
};

const deleteShop = async (id) => {
  try {
    const shop = await Shop.findByIdAndDelete(id);
    if (!shop) {
      console.log("Aucun shop trouvé avec l'ID :", id);
      return null;
    }
    console.log("Shop supprimé :", shop);
    return shop;
  } catch (error) {
    console.error("Erreur lors de la suppression du shop :", error);
    throw error;
  }
};

module.exports = {
  createShop,
  getAllShops,
  getShopById,
  updateShop,
  deleteShop,
};
