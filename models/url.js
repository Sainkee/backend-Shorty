import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      require: true,
      unique: true,
    },

    redirecturl: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

 const urldata = mongoose.model("urldata", urlSchema);
 export default urldata

