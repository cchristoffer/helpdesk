const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Note = require("../models/noteModel");
const Ticket = require("../models/ticketModel");

// @desc    Get notes for a ticket
// @http    GET
// @route   /api/tickets/:ticketId/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
  //get user using id in JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("Var vänlig logga in");
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Ej behörig att läsa anteckningar för detta ärende.");
  }

  const notes = await Note.find({ ticket: req.params.ticketId });

  res.status(200).json(notes);
});

// @desc    Create note for ticket
// @http    POST
// @route   /api/tickets/:ticketId/notes
// @access  Private
const addNote = asyncHandler(async (req, res) => {
  //get user using id in JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("Var vänlig logga in");
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Ej behörig att läsa anteckningar för detta ärende.");
  }

  const note = await Note.create({
    text: req.body.text,
    isStaff: false,
    user: req.user.id,
    ticket: req.params.ticketId,
  });

  res.status(200).json(note);
});

module.exports = {
  getNotes,
  addNote,
};
