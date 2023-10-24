const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shopController");

router.post("/shops", async (req, res) => {
  try {
    const shop = await shopController.createShop(req.body);
    res.status(201).json(shop);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la création du shop" });
  }
});

router.get("/shops", async (req, res) => {
  try {
    const shops = await shopController.getAllShops();
    res.json(shops);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des shops" });
  }
});

router.get("/shops/:id", async (req, res) => {
  try {
    const shop = await shopController.getShopById(req.params.id);
    if (!shop) {
      res.status(404).json({ error: "Aucun shop trouvé avec l'ID spécifié" });
    } else {
      res.json(shop);
    }
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération du shop par ID" });
  }
});

router.put("/shops/:id", async (req, res) => {
  try {
    const shop = await shopController.updateShop(req.params.id, req.body);
    if (!shop) {
      res.status(404).json({ error: "Aucun shop trouvé avec l'ID spécifié" });
    } else {
      res.json(shop);
    }
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la mise à jour du shop" });
  }
});

router.delete("/shops/:id", async (req, res) => {
  try {
    const shop = await shopController.deleteShop(req.params.id);
    if (!shop) {
      res.status(404).json({ error: "Aucun shop trouvé avec l'ID spécifié" });
    } else {
      res.json(shop);
    }
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la suppression du shop" });
  }
});

module.exports = router;
