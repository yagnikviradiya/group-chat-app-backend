const Message = require("../models/messageModel");

// get all messages by group and shorted created date 
async function getAllMessages(group) {
  try {
    const filterQuery = {
      group: group
    }
    const data = await Message.aggregate([
      {
        $match: filterQuery
      },
      {
        $project: {
          _id: 0 // Exclude the _id field
        }
      },
      {
        $sort: {
          createdAt: 1
        }
      }
    ])
    return data
  } catch (error) {
    console.log('error :>> ', error);
  }
}

module.exports = getAllMessages
