const vid = "3C66w5Z0ixs";

db.trending_stats.find({
  video_id: vid,
  trending_date: {
    $gte: ISODate("2020-01-01T00:00:00Z"),
    $lte: IDODate("2021-12-31T23:59:59Z")
  }
}).explain("executionStats");


db.videos.find)
  {tags: "Music"}
).sort({
  "stats_summary.max_views": -1
}).limit(20).explain("executionStats");

