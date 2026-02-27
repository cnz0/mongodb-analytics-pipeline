db.trending_stats.createIndex({video_id: 1});
db.trending_stats.createIndex({channel_id: 1});
db.trending_stats.createIndex({video_id: 1, trending_date: 1});

db.videos.createIndex({video_id: 1}, {unique: true});
db.videos.createIndex({"channel_id": 1});
db.videos.createIndex({tags: 1});
db.videos.createIndex({categoryId: 1, "stats_summary.max_views": -1});

db.channels.createIndex({channel_id: 1}, {unique: true});
db.channels.createIndex({"stats_summary.max_views": -1});