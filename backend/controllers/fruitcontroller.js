import Fruit from "../models/Fruit.js";
import cloudinary from "../config/cloudinary.js";


export const addFruit = async (req, res) => {
  try {
    const { name, price, stock, type, available } = req.body;

    // ✅ Fix: use explicit undefined check, not falsy check
    // stock=0 and price=0 are valid values — don't reject them
    if (!name || price === undefined || price === "") {
      return res.status(400).json({ success: false, message: "Name and price are required" });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Fruit image is required" });
    }

    const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
      folder: "fruits",
      format: "webp"
    });

    const fruit = await Fruit.create({
      name,
      price: Number(price),
      stock: stock !== undefined ? Number(stock) : 0,
      image: uploadedImage.secure_url,
      type: type || "Free",
      available: available === "false" ? false : true, // ✅ FormData sends strings, not booleans
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
    if (req.file) {
      const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
        folder: "fruits",
        format: "webp"
      });
      imageUrl = uploadedImage.secure_url;
    }

    fruit.name = req.body.name ?? fruit.name;
    fruit.price = req.body.price !== undefined ? Number(req.body.price) : fruit.price;
    fruit.stock = req.body.stock !== undefined ? Number(req.body.stock) : fruit.stock;
    fruit.image = imageUrl;
    fruit.type = req.body.type ?? fruit.type;

    // ✅ FormData sends "true"/"false" as strings — parse correctly
    if (req.body.available !== undefined) {
      fruit.available = req.body.available === "false" ? false : Boolean(req.body.available);
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