import newsModal from "../models/news.js";
const createNews = async (req, res) => {
  try {
    let news = await newsModal.findOne({ title: req.body.title });
    if (!news) {
      await newsModal.create(req.body);
      res.status(201).send({
        message: "News Created successfully",
      });
    } else {
      res.status(400).send({
        message: "News Already Exists",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
      error,
    });
  }
};

const getTopic = async (req, res) => {
  try {
    let { topic } = req.params;
    let news = await newsModal.find({ topic: topic });
    res.status(200).send({
      message: `Data Fetched Successfully for this ${topic}`,
      news,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
      error,
    });
  }
};

const getBreakingNews = async (req, res) => {
  try {
    let news = await newsModal.find();
    if (news) {
      res.status(200).send({
        message: "Data Fetched Successfully",
        news,
      });
    } else {
      res.status(400).send({
        message: "No News Available",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
      error,
    });
  }
};

const getNewsById = async (req, res) => {
  try {
    let {id} = req.params;
    let news = await newsModal.findOne({ _id: id });
    res.status(200).send({
        message: `Data Fetched Successfully for this ${id}`,
        news,
      });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
      error,
    });
  }
};

export default {
  createNews,
  getTopic,
  getBreakingNews,
  getNewsById
};
