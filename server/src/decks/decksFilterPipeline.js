const decksFilterPipeline = ({
  search,
  language,
  minCards,
  maxCards,
  sortBy,
}) => {
  const escapeRegExp = (s = "") => {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  const pipeline = [];

  // Only show public decks
  pipeline.push({
    $match: {
      isPublic: true,
    },
  });

  // Join the cards collection
  pipeline.push({
    $lookup: {
      from: "cards",
      localField: "_id",
      foreignField: "deckId",
      as: "cards",
    },
  });

  // Search filter
  if (search && search.trim() !== "") {
    const regex = new RegExp(escapeRegExp(search.trim()), "i");
    pipeline.push({
      $match: {
        $or: [
          { title: { $regex: regex } },
          { description: { $regex: regex } },
          { "cards.question": { $regex: regex } },
          { "cards.answer": { $regex: regex } },
        ],
      },
    });
  }

  // Language filter (deck.language is now an array of strings)
  if (language && language.trim() !== "") {
    pipeline.push({
      $match: {
        language: { $in: [language.trim()] },
      },
    });
  }

  // Add card count field
  pipeline.push({
    $addFields: {
      cardsCount: { $size: "$cards" },
    },
  });

  // Cards count filter
  pipeline.push({
    $match: {
      cardsCount: { $gte: minCards, $lte: maxCards },
    },
  });

  // Join the user collection
  pipeline.push({
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "userInfo",
    },
  });
  pipeline.push({ $unwind: "$userInfo" });

  // Show decks of active accounts only
  pipeline.push({
    $match: {
      "userInfo.isDeleted": false,
    },
  });

  pipeline.push({
    $project: {
      cards: 0,
      userId: 0,
      "userInfo.email": 0,
      "userInfo.password": 0,
      "userInfo.isDeleted": 0,
      "userInfo.createdAt": 0,
      "userInfo.updatedAt": 0,
    },
  });

  // Sort by
  const sortOptions = {
    mostRecent: { createdAt: -1 },
    oldest: { createdAt: 1 },
    numCardsAsc: { cardsCount: -1 },
    numCardsDesc: { cardsCount: 1 },
  };

  pipeline.push({
    $sort: sortOptions[sortBy] || sortOptions.mostRecent,
  });

  return pipeline;
};

export default decksFilterPipeline;
