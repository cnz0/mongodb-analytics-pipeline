db.raw.aggregate([
  {
    $project: {
      _id: 0,

      video_id: "$video_id",
      channel_id: "$channelId",

      trending_date: { $toDate: "$trending_date" },

      daily_stats: {
        views: "$view_count",
        likes: "$likes",
        dislikes: "$dislikes",
        comments: "$comment_count"
      }
    }
  },

  {
    $out: "trending_stats"
  }
]);