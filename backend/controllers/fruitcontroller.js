import Fruit from "../models/Fruit.js";
import { v2 as cloudinary } from "cloudinary";


//  Add Fruit (Admin)
export const addFruit = async (req, res) => {
  try {
    const { name, price, stock } = req.body;

    if (!name || !price || !stock) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Fruit image is required"
      });
    }

    // Upload image to Cloudinary (convert to WEBP)
    const uploadedImage = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: "fruits",
        format: "webp"
      }
    );

    const fruit = await Fruit.create({
      name,
      price,
      stock,
      image: uploadedImage.secure_url
    });

    res.status(201).json({
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



//  Update Fruit (Admin)
export const updateFruit = async (req, res) => {
  try {
    const fruit = await Fruit.findById(req.params.id);

    if (!fruit) {
      return res.status(404).json({
        success: false,
        message: "Fruit not found"
      });
    }

    let imageUrl = fruit.image;

    // If new image uploaded
    if (req.file) {
      const uploadedImage = await cloudinary.uploader.upload(
        req.file.path,
        {
          folder: "fruits",
          format: "webp"
        }
      );

      imageUrl = uploadedImage.secure_url;
    }

    fruit.name = req.body.name || fruit.name;
    fruit.price = req.body.price || fruit.price;
    fruit.stock = req.body.stock || fruit.stock;
    fruit.image = imageUrl;

    await fruit.save();

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