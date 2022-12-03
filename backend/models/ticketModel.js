const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    category: {
      type: String,
      required: [true, "Var vänlig välj kategori"],
      enum: ["M3", "Drift", "M3 drift", "Nätverk", "Hårdvara", "Annat"],
    },
    description: {
      type: String,
      required: [true, "Var vänlig ange en beskrivning av problemet"],
    },
    status: {
      type: String,
      required: true,
      enum: ["Ny", "Öppen", "Inväntande", "Stängd"],
      default: "Ny",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);
