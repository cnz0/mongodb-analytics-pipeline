db.channels.aggregate([
  {
    $match: {
      title: "MigosVEVO"
    }
  },
  {
    $lookup: {
      from: "videos",
      localField: "channel_id",
      foreignField: "channel.id",
      as: "videos"
    }
  },
  {
    $unwind: "$videos"
  },
  {
    $lookup: {
      from: "trending_stats",
      localField: "videos.video_id",
      foreignField: "video_id",
      as: "trending_entries"
    }
  },
  {
    $unwind: "$trending_entries"
  },
  {
    $group: {
      _id: "$videos.video_id",
      title: { $first: "$videos.title" },
      channel_title: { $first: "$title" },
      total_days_trending: { $sum: 1 },
      avg_views_per_day: { $avg: "$trending_entries.daily_stats.views" }
    }
  },
  {
    $sort: {
      avg_views_per_day: -1
    }
  },
  {
    $limit: 5
  }
]);