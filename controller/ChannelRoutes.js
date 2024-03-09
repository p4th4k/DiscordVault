const express = require("express");
const ChannelRouter = express.Router();

let channel;
const getInstanceOfChannel = (instance) => (channel = instance);

getInstanceOfChannel();

ChannelRouter.get("/getChannels", async (req, res) => {
  let channels = await channel.getChannels()
  res.json(channels);
});

ChannelRouter.post("/createChannel", async (req, res) => {
  const channelName = req.body["channelName"];
  const categoryID = req.body["cateogryID"];

  let newC = await channel.addChannel(channelName, categoryID);
  if (newC) res.json({ err: newC });

  res.json({ msg: "Channel successfully created!" });
});

ChannelRouter.post("/createCategory", async (req, res) => {
  const categoryName = req.body["categoryName"];

  let newC = await channel.addCategory(categoryName);
  if (newC) res.json({ err: newC });

  res.json({ msg: "Category successfully created!" });
});

ChannelRouter.delete("/deleteChannel", async (req, res) => {
  const channelName = req.body["channelName"];
  let delC = await channel.deleteChannel(channelName);

  if (delC) res.json({ err: delC });
  res.json({ msg: "Channel successfully deleted!" });
});

ChannelRouter.delete("/deleteCategory", async (req, res) => {
    const categoryId = req.body["categoryID"]
    let delCt = await channel.deleteCategory(categoryId);

    if(delCt) res.json({err: delCt})
    res.json({msg: "Category successfully deleted!"})
})

module.exports = { getInstanceOfChannel, ChannelRouter };
