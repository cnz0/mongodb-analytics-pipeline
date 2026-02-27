db.videos.aggregate([
  {
    $match: {
      tags: "Music",
      "status.comments_disabled": false
    }
  },
  {
    $sort: {
      "stats_summary.max_views": -1
    }
  },
  {
    $limit: 10
  },
  {
    $project: {
      _id: 0,
      video_id: 1,
      title: 1,
      "channel.title": 1,
      publishedAt: 1,
      tags: 1,
      "stats_summary.max_views": 1,
      "stats_summary.total_trending_days": 1
    }
  }
]);