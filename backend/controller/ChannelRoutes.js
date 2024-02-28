const express = require("express");
const ChannelRouter = express.Router();

let channel;
const getInstanceOfChannel = (instance) => (channel = instance);

getInstanceOfChannel();

ChannelRouter.get("/channels", (req, res) => {
  res.json(channel.getChannels());
});

ChannelRouter.post("/createChannel", (req, res) => {
  const channelName = req.body["channelName"];
  const categoryID = req.body["cateogryID"];

  let newC = channel.addChannel(channelName, categoryID);
  if (newC) res.json({ err: newC });

  res.json({ msg: "Channel successfully created!" });
});

ChannelRouter.post("/createCategory", (req, res) => {
  const categoryName = req.body["categoryName"];

  let newC = channel.addCategory(categoryName);
  if (newC) res.json({ err: newC });

  res.json({ msg: "Category successfully created!" });
});

ChannelRouter.delete("/deleteChannel", (req, res) => {
  const channelName = req.body["channelName"];
  let delC = channel.deleteChannel(channelName);

  if (delC) res.json({ err: delC });
  res.json({ msg: "Channel successfully deleted!" });
});

ChannelRouter.delete("/deleteCategory", (req, res) => {
    const categoryId = req.body["categoryID"]
    let delCt = channel.deleteCategory(categoryId);

    if(delCt) res.json({err: delCt})
    res.json({msg: "Category successfully deleted!"})
})

module.exports = { getInstanceOfChannel, ChannelRouter };
