import Package from "../models/Package.js";

//  Create Package
export const createPackage = async (req, res) => {
  try {
    const pkg = await Package.create(req.body);

    res.status(201).json({
      success: true,
      data: pkg
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//  Get All Packages
export const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();

    res.status(200).json({
      success: true,
      data: packages
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//  Update Package
export const updatePackage = async (req, res) => {
  try {
    const pkg = await Package.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: pkg
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//  Delete Package
export const deletePackage = async (req, res) => {
  try {
    await Package.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Package deleted"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};