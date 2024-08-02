const Stats = require("../models/stats");

exports.saveResponse = async (req, res, next) => {
  try {
    const { formId } = req.body;

    const statsdata = new Stats({
      formId,
    });

    const savedStats = await statsdata.save();
    res.status(201).json({ _id: savedStats._id });
  } catch (error) {
    console.error("Error saving response:", error);
    res.status(500).json({ message: "Error saving response" });
  }
};

exports.incrementViewCount = async (req, res, next) => {
  try {
    const { formId } = req.body;

    const updateView = await Stats.findByIdAndUpdate(
      formId,
      { $inc: { totalViews: 1 } },
      { new: true }
    );

    if (!updateView) {
      console.log("formid is = ", formId);
      return res.status(404).json({ error: "Form not found" });
    }

    res.status(200).json(updateView);
  } catch (error) {
    console.error("Error updating view count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
