require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const moment = require('moment'); // Add moment.js for date formatting

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ensure `uploads` folder exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use('/uploads', express.static(uploadDir));

// MySQL Connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Error connecting to database:', err.message);
    process.exit(1);
  }
  console.log('✅ Connected to MySQL database');
});

// Configure Multer for File Uploads
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, `product_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Only JPEG, PNG, and GIF files are allowed'));
    }
    cb(null, true);
  }
});

// API to Add Product with Image Upload
app.post('/api/products', upload.single('productImage'), (req, res) => {
  const {
    hsnCode, Product, ProductCategory, uom, binLocation,
    unitPrice, landingChargesPercent, landingCharges, costOfProduct,
    profitPercent, targetedSellingPrice, gstApplicable,
    igstPercent, cgstPercent, sgstPercent, stockKeepingUnit,
    latestUnitPrice, latestPODate, latestPONumber,
    openingStock, currentQuantity, thresholdQuantity,
    stockLevelAlert, productDescription, unitOfMeasurement, locationId
  } = req.body;

  // Handle image upload
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  // Validate required fields
  if (!Product || !hsnCode || !ProductCategory) {
    return res.status(400).json({ error: 'Required fields are missing' });
  }

  // Ensure latestPODate is in valid date format (YYYY-MM-DD)
  const formattedLatestPODate = moment(latestPODate, 'YYYY-MM-DD', true).isValid()
    ? moment(latestPODate).format('YYYY-MM-DD') 
    : null;

  console.log('Formatted latestPODate:', formattedLatestPODate);

  // Prepare SQL query for inserting product
  const query = `
    INSERT INTO products (
      materialCode, materialName, materialCategory, 
      unitOfMeasurement, locationId, 
      unitPrice, landingChargesPercent, landingCharges, costOfProduct,
      profitPercent, targetedSellingPrice, 
      gstApplicable, gstRate, 
      cgstPercent, sgstPercent, igstPercent,
      stockKeepingUnit, 
      latestUnitPrice, latestPODate, latestPONumber,
      openingStock, quantity, thresholdQuantity,
      stockLevelAlert, description,
      imageUrl, dateAdded
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
  `;

  const values = [
    hsnCode, Product, ProductCategory, 
    uom, binLocation,
    parseFloat(unitPrice || 0), parseFloat(landingChargesPercent || 0), parseFloat(landingCharges || 0), parseFloat(costOfProduct || 0),
    parseFloat(profitPercent || 0), parseFloat(targetedSellingPrice || 0),
    gstApplicable, parseFloat(igstPercent || 0), 
    parseFloat(cgstPercent || 0), parseFloat(sgstPercent || 0), parseFloat(igstPercent || 0),
    stockKeepingUnit,
    parseFloat(latestUnitPrice || 0), formattedLatestPODate, latestPONumber,
    parseInt(openingStock || 0), parseInt(currentQuantity || 0), parseInt(thresholdQuantity || 0),
    stockLevelAlert, productDescription,
    imageUrl
  ];

  // Log query and values
  console.log('SQL Query:', query);
  console.log('Values:', values);

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('❌ Error adding product:', err);
      return res.status(500).json({ error: 'Error adding product', details: err.message });
    }

    // If sub-products exist, insert them
    if (req.body.subProducts) {
      try {
        const subProducts = JSON.parse(req.body.subProducts);
        if (subProducts && subProducts.length > 0) {
          const subProductQuery = `
            INSERT INTO sub_products (
              productId, masterName, materialName, description
            ) VALUES ?
          `;

          const subProductValues = subProducts.map(sub => [
            result.insertId, 
            sub.masterName, 
            sub.materialName, 
            sub.description
          ]);

          connection.query(subProductQuery, [subProductValues], (subErr) => {
            if (subErr) {
              console.error('❌ Error adding sub-products:', subErr);
            }
          });
        }
      } catch (parseError) {
        console.error('❌ Error parsing sub-products:', parseError);
      }
    }

    res.status(201).json({ 
      id: result.insertId, 
      message: '✅ Product added successfully' 
    });
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!', 
    message: err.message 
  });
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

module.exports = connection;
