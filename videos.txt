db.raw_trending.aggregate([
  {
    $group: {
      _id: "$video_id",
      title: { $first: "$title" },
      publishedAt: { $first: "$publishedAt" },
      channelId: { $first: "$channelId" },
      channelTitle: { $first: "$channelTitle" },
      categoryId: { $first: "$categoryId" },
      tagsRaw: { $first: "$tags" },
      comments_disabled_raw: { $first: "$comments_disabled" },
      ratings_disabled_raw: { $first: "$ratings_disabled" },
      thumbnail_link: { $first: "$thumbnail_link" },
      description: { $first: "$description" },

      max_views: { $max: "$view_count" },
      max_likes: { $max: "$likes" },
      max_dislikes: { $max: "$dislikes" },
      max_comment_count: { $max: "$comment_count" },
      total_trending_days: { $sum: 1 }
    }
  },

  {
    $project: {
      _id: 0,
      video_id: "$_id",
      title: 1,
      description: 1,

      channel: {
        id: "$channelId",
        title: "$channelTitle"
      },

      categoryId: 1,

      publishedAt: {
        $toDate: "$publishedAt"
      },

      tags: {
        $cond: [
          {
            $eq: [ { $type: "$tagsRaw" }, "string" ]
          },
          { $split: ["$tagsRaw", "|"] },
          []
        ]
      },

      status: {
        comments_disabled: { $eq: ["$comments_disabled_raw", "True"] },
        ratings_disabled: { $eq: ["$ratings_disabled_raw", "True"] }
      },

      thumbnails: {
        default: "$thumbnail_link"
      },

      stats_summary: {
        max_views: "$max_views",
        max_likes: "$max_likes",
        max_dislikes: "$max_dislikes",
        max_comment_count: "$max_comment_count",
        total_trending_days: "$total_trending_days"
      }
    }
  },

  {
    $out: "videos"
  }
]);
