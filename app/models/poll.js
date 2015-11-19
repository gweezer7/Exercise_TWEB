// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PollSchema = new Schema({
  title: String,
  labels: Array,
  data: Array
});

PollSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Poll', PollSchema);

