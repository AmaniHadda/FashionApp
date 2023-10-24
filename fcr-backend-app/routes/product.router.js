const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png':'png'
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      const destinationPath = path.join(__dirname, "../uploads/products/");
      callback(null, destinationPath);
    },
    filename: (req, file, callback) => {
      const name = file.originalname.split(' ').join('_');
      const extension = MIME_TYPES[file.mimetype];
      callback(null, name  );
    }
  });
const upload = multer({storage:storage}).single("photo");
const product_controller = require("../controllers/products.controller");

router.post("/create", upload, product_controller.create);
router.put("/update/:id", product_controller.updateProduit);
router.put("/update/click/:id", product_controller.updateProductByClic);
router.get("/all",product_controller.fetchProducts);
router.get("/lastSeen",product_controller.fetchProductByLastSeen);
router.get("/lastBrand",product_controller.fetchProductsByLastBrand);
router.put("/product/:id", product_controller.fetchById);

module.exports = router;