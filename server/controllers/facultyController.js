const Faculty = require('../models/Faculty');

// Create a faculty
exports.createFaculty = async (req, res) => {
  console.log("Incoming Faculty Data:", req.body); // 👀 Debug log
  try {
    const { fname, Branch, Salary, designation, qualification } = req.body;

    // Simple backend validation
    if (!fname || !Branch || !Salary || !designation || !qualification) {
      return res.status(400).json({
        message: "All fields (fname, Branch, Salary, designation, qualification) are required.",
      });
    }

    const faculty = await Faculty.create({
      fname,
      Branch,
      Salary,
      designation,
      qualification,
    });

    res.status(201).json(faculty);
  } catch (error) {
    console.error("Faculty creation error:", error.message);
    res.status(400).json({ message: error.message });
  }
};

// Read all faculty
exports.getFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.find();
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a faculty
exports.updateFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(faculty);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a faculty
exports.deleteFaculty = async (req, res) => {
  try {
    await Faculty.findByIdAndDelete(req.params.id);
    res.json({ message: 'Faculty deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
