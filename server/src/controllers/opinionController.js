const Opinion = require("../models/Opinion");

// Създаване на мнение
exports.createOpinion = async (req, res) => {
  try {
    const { text } = req.body;
    const opinion = new Opinion({
      text,
      author: req.user._id, // req.user._id идва от мидълуера за аутентикация
    });

    await opinion.save();

    // Попълваме полето за автора, за да върнем username
    await opinion.populate("author", "username").execPopulate();

    res.status(201).json(opinion);
  } catch (error) {
    res.status(400).json({ message: "Error creating opinion", error });
  }
};

// Извличане на всички мнения
exports.getAllOpinions = async (req, res) => {
  try {
    const opinions = await Opinion.find().populate("author", "username");
    res.json(opinions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching opinions", error });
  }
};

exports.deleteOpinion = async (req, res) => {
  try {
    const opinion = await Opinion.findById(req.params.id);

    if (!opinion) {
      return res.status(404).json({ message: "Opinion not found" });
    }

    if (opinion.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this opinion" });
    }

    await Opinion.deleteOne({ _id: req.params.id });
    res.json({ message: "Opinion deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting opinion", error });
  }
};


exports.updateOpinion = async (req, res) => {
    try {
      const { text } = req.body;

  
      if (!text) {
        return res.status(400).json({ message: "Text is required" });
      }
  
      const opinion = await Opinion.findById(req.params.id);
      if (!opinion) {
        return res.status(404).json({ message: "Opinion not found" });
      }
  
      if (opinion.author.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "You are not authorized to edit this opinion" });
      }
  
      opinion.text = text;
      opinion.updatedAt = Date.now();
      await opinion.save();
  
      
      const populatedOpinion = await Opinion.findById(req.params.id).populate("author", "username").exec();
  
      res.json(populatedOpinion);
    } catch (error) {
      console.error("Error updating opinion:", error); // Лог на грешката
      res.status(500).json({ message: "Error updating opinion", error });
    }
  };
  
