### MongoDB Analytics Pipeline – YouTube Trending Dataset ###

This project implements a document-oriented data transformation pipeline in MongoDB using the YouTube Trending Video Dataset (Kaggle).<br>
Dataset: https://www.kaggle.com/datasets/rsrishav/youtube-trending-video-dataset<br><br>
The goal was to transform denormalized CSV data into structured analytical collections and evaluate modeling and indexing strategies.<br>
Example collections elements can be found under /data_examples

### Scope ###
- Raw CSV ingestion into MongoDB
- Aggregation-based transformation (ELT inside Mongo)
- Document reshaping and normalization
- Embedded vs reference modeling comparison
- Index design based on access patterns
- Query plan analysis using explain("executionStats")
- SQL-style auto-increment pattern implementation

### Project Structure ###
mongodb-analytics-pipeline/<br>
|--- ingestion/<br>
|--- transformations/<br>
|--- modeling/<br>
|--- performance/<br>
|--- examples/<br>
|--- README.md


### Transformation Pipeline ###
- Data was imported into a raw collection and transformed using aggregation pipelines:
- **raw -> videos**
- Group by video_id
- Normalize types
- Split tags into arrays
- Reshape document structure

- **raw -> channels**
- Aggregate channel-level metrics
- Collect related video references

- **raw -> trending_stats**
- Normalize date fields
- Create time-series-like structure

This models a ELT workflow fully inside MongoDB.

### Modeling Strategy ###

Two approaches were evaluated:

- Embedded
- Trending data embedded in video documents.
- Faster reads, larger documents.

- Reference
- Trending data stored separately with video_id reference.
- Smaller documents, requires $lookup.

Trade-offs were evaluated using real query plans.

### Performance & Indexing ###

Indexes were created based on filtering:
```
db.videos.createIndex({video_id: 1}, {unique: true});
db.videos.createIndex({"channel_id": 1});
db.videos.createIndex({tags: 1});
db.videos.createIndex({categoryId: 1, "stats_summary.max_views": -1});
```

Query plans analyzed with:
```
.explain("executionStats")
```
Their results can be found under /performance/explain_summary.md

### Auto-Incrementation ###
Sequences were implemented using a "counters" collection
```
function getNextSequence(name) {
  return db.counters.findOneAndUpdate(
    { _id: name },
    { $inc: { value: 1 } },
    { upsert: true, returnDocument: "after" }
  ).value;
}
```

### Key problems and things i learned ###
- Modeling documents based on query access patterns
- Using aggregation pipelines as transformation workflows
- Evaluating embedded vs reference trade-offs
- Designing indexes using execution plan analysis
- Applying ETL thinking in a NoSQL environment
