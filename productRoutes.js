const express = require('express');
const router = express.Router();
const db = require('../db');

// Add Product
router.post('/', async (req, res) => {
  const product = req.body;

  try {
    const sql = `
      INSERT INTO products (
        materialCode, materialName, materialCategory, 
        unitOfMeasurement, locationId, unitPrice, 
        landingChargesPercent, landingCharges, costOfProduct,
        profitPercent, targetedSellingPrice, 
        gstApplicable, gstRate, cgstPercent, sgstPercent, igstPercent,
        stockKeepingUnit, latestUnitPrice, latestPODate, latestPONumber,
        openingStock, quantity, thresholdQuantity,
        stockLevelAlert, description, imageUrl
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      product.materialCode, product.materialName, product.materialCategory,
      product.unitOfMeasurement, product.locationId, product.unitPrice,
      product.landingChargesPercent, product.landingCharges, product.costOfProduct,
      product.profitPercent, product.targetedSellingPrice,
      product.gstApplicable, product.gstRate, product.cgstPercent, product.sgstPercent, product.igstPercent,
      product.stockKeepingUnit, product.latestUnitPrice, product.latestPODate, product.latestPONumber,
      product.openingStock, product.quantity, product.thresholdQuantity,
      product.stockLevelAlert, product.description, product.imageUrl
    ];

    await db.execute(sql, values);
    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// Get All Products
router.get('/', async (req, res) => {
  try {
    const [products] = await db.execute('SELECT * FROM products');
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

module.exports = router;
