function getNextSequence(name) {
  const ret = db.counters.findOneAndUpdate(
    { _id: name },
    { $inc: { value: 1 } },
    {
      upsert: true,
      returnDocument: "after"
    }
  );
  return ret.value;
}