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

// Изтриване на мнение
exports.deleteOpinion = async (req, res) => {
  try {
    const opinion = await Opinion.findById(req.params.id);

    if (!opinion) {
      return res.status(404).json({ message: "Opinion not found" });
    }

    // Проверка дали потребителят е автор на мнението
    if (opinion.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this opinion" });
    }

    await opinion.remove();
    res.json({ message: "Opinion deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting opinion", error });
  }
};

// Редактиране на мнение
exports.updateOpinion = async (req, res) => {
  try {
    const { text } = req.body;
    const opinion = await Opinion.findById(req.params.id);

    if (!opinion) {
      return res.status(404).json({ message: "Opinion not found" });
    }

    // Проверка дали потребителят е автор на мнението
    if (opinion.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this opinion" });
    }

    opinion.text = text;
    await opinion.save();
    res.json(opinion);
  } catch (error) {
    res.status(500).json({ message: "Error updating opinion", error });
  }
};
