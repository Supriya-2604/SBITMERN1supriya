const Student = require('../models/Student');

// ✅ Create a student
exports.createStudent = async (req, res) => {
  console.log("📩 Incoming request to CREATE student:", req.body); // Debug log
  try {
    const student = new Student(req.body);
    await student.save();
    console.log("✅ Student created successfully:", student);
    res.status(201).json(student);
  } catch (error) {
    console.error("❌ Error creating student:", error.message);
    res.status(400).json({ message: error.message });
  }
};

// ✅ Read all students
exports.getStudents = async (req, res) => {
  console.log("📥 Fetching all students...");
  try {
    const students = await Student.find();
    console.log(`✅ ${students.length} students found`);
    res.json(students);
  } catch (error) {
    console.error("❌ Error fetching students:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update a student
exports.updateStudent = async (req, res) => {
  console.log("✏️ Updating student with ID:", req.params.id);
  console.log("New data:", req.body);
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!student) {
      console.log("⚠️ Student not found!");
      return res.status(404).json({ message: "Student not found" });
    }
    console.log("✅ Student updated successfully:", student);
    res.json(student);
  } catch (error) {
    console.error("❌ Error updating student:", error.message);
    res.status(400).json({ message: error.message });
  }
};

// ✅ Delete a student
exports.deleteStudent = async (req, res) => {
  console.log("🗑️ Deleting student with ID:", req.params.id);
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) {
      console.log("⚠️ Student not found for deletion");
      return res.status(404).json({ message: "Student not found" });
    }
    console.log("✅ Student deleted successfully:", deleted);
    res.json({ message: "Student deleted" });
  } catch (error) {
    console.error("❌ Error deleting student:", error.message);
    res.status(500).json({ message: error.message });
  }
};
