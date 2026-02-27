db.raw.aggregate([
  {
    $group: {
      _id: "$channelId",
      title: { $first: "$channelTitle" },

      total_trending_entries: { $sum: 1 },

      videos_set: { $addToSet: "$video_id" },

      max_views: { $max: "$view_count" }
    }
  },

  {
    $project: {
      _id: 0,
      channel_id: "$_id",
      title: 1,
      stats_summary: {
        total_trending_entries: "$total_trending_entries",
        total_trending_videos: { $size: "$videos_set" },
        max_views: "$max_views"
      }
    }
  },

  {
    $out: "channels"
  }
]);