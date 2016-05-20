'use strict';

import mongoose from 'mongoose';

var FileSchema = new mongoose.Schema({
  name: String,
  userid: String,
  file:
});

export default mongoose.model('Files', FileSchema);
