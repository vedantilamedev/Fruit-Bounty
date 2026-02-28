import Fruit from "../models/Fruit.js";
import cloudinary from "../config/cloudinary.js";


export const addFruit = async (req, res) => {
  try {
    const { name, price, stock, type, available, isBowl, description, ingredients, weight } = req.body;

    // ✅ Fix: use explicit undefined check, not falsy check
    // stock=0 and price=0 are valid values — don't reject them
    if (!name || price === undefined || price === "") {
      return res.status(400).json({ success: false, message: "Name and price are required" });
    }

    let imageUrl = "";
    let images = [];

    // Handle single image upload (for fruits)
    if (req.file) {
      const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
        folder: "fruits",
        format: "webp"
      });
      imageUrl = uploadedImage.secure_url;
    }

    // Handle multiple images (for bowls)
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploadedImage = await cloudinary.uploader.upload(file.path, {
          folder: "bowls",
          format: "webp"
        });
        images.push(uploadedImage.secure_url);
      }
    }

    // Parse ingredients if it's a string
    let parsedIngredients = [];
    if (ingredients) {
      if (Array.isArray(ingredients)) {
        parsedIngredients = ingredients;
      } else if (typeof ingredients === 'string') {
        parsedIngredients = ingredients.split(',').map(i => i.trim()).filter(i => i);
      }
    }

    const fruit = await Fruit.create({
      name,
      price: Number(price),
      stock: stock !== undefined ? Number(stock) : 0,
      image: imageUrl,
      images: images.length > 0 ? images : (imageUrl ? [imageUrl] : []),
      type: type || "Free",
      available: available === "false" ? false : true,
      isBowl: isBowl === "true" || isBowl === true,
      description: description || "",
      ingredients: parsedIngredients,
      salesCount: 0,
      weight: weight ? Number(weight) : null
    });

    res.status(201).json({ success: true, data: fruit });

  } catch (error) {
    console.log("FRUIT ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const updateFruit = async (req, res) => {
  try {
    const fruit = await Fruit.findById(req.params.id);
    if (!fruit) {
      return res.status(404).json({ success: false, message: "Fruit not found" });
    }

    let imageUrl = fruit.image;
    let images = fruit.images || [];

    // Handle single image upload (for fruits)
    if (req.file) {
      const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
        folder: "fruits",
        format: "webp"
      });
      imageUrl = uploadedImage.secure_url;
    }

    // Handle multiple images (for bowls)
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploadedImage = await cloudinary.uploader.upload(file.path, {
          folder: "bowls",
          format: "webp"
        });
        images.push(uploadedImage.secure_url);
      }
    }

    fruit.name = req.body.name ?? fruit.name;
    fruit.price = req.body.price !== undefined ? Number(req.body.price) : fruit.price;
    fruit.stock = req.body.stock !== undefined ? Number(req.body.stock) : fruit.stock;
    fruit.image = imageUrl;
    fruit.images = images.length > 0 ? images : fruit.images;
    fruit.type = req.body.type ?? fruit.type;

    // ✅ FormData sends "true"/"false" as strings — parse correctly
    if (req.body.available !== undefined) {
      fruit.available = req.body.available === "false" ? false : Boolean(req.body.available);
    }

    // Bowl-specific fields
    if (req.body.isBowl !== undefined) {
      fruit.isBowl = req.body.isBowl === "false" ? false : Boolean(req.body.isBowl);
    }
    if (req.body.description !== undefined) {
      fruit.description = req.body.description;
    }
    if (req.body.ingredients !== undefined) {
      if (Array.isArray(req.body.ingredients)) {
        fruit.ingredients = req.body.ingredients;
      } else if (typeof req.body.ingredients === 'string') {
        fruit.ingredients = req.body.ingredients.split(',').map(i => i.trim()).filter(i => i);
      }
    }
    if (req.body.salesCount !== undefined) {
      fruit.salesCount = Number(req.body.salesCount);
    }
    if (req.body.weight !== undefined) {
      fruit.weight = req.body.weight ? Number(req.body.weight) : null;
    }

    await fruit.save();
    res.status(200).json({ success: true, data: fruit });

  } catch (error) {
    console.log("FRUIT ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//  Get All Fruits
export const getAllFruits = async (req, res) => {
  try {
    const fruits = await Fruit.find();

    res.status(200).json({
      success: true,
      data: fruits
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



//  Get Single Fruit
export const getSingleFruit = async (req, res) => {
  try {
    const fruit = await Fruit.findById(req.params.id);

    if (!fruit) {
      return res.status(404).json({
        success: false,
        message: "Fruit not found"
      });
    }

    res.status(200).json({
      success: true,
      data: fruit
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


//  Delete Fruit (Admin)
export const deleteFruit = async (req, res) => {
  try {
    const fruit = await Fruit.findById(req.params.id);

    if (!fruit) {
      return res.status(404).json({
        success: false,
        message: "Fruit not found"
      });
    }

    await fruit.deleteOne();

    res.status(200).json({
      success: true,
      message: "Fruit deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};