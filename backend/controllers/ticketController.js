const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");

// @desc    Get user tickets
// @http    GET
// @route   /api/tickets
// @access  Private
const getTickets = asyncHandler(async (req, res) => {
  //get user using id in JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("Var vänlig logga in");
  }

  const tickets = await Ticket.find({ user: req.user.id });

  //Om inga tickets?

  res.status(200).json(tickets);
});

// @desc    Get user ticket
// @http    GET
// @route   /api/tickets/:id
// @access  Private
const getTicket = asyncHandler(async (req, res) => {
  //get user using id in JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("Var vänlig logga in");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Fann inget ärende med detta id");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Du är ej ägare av detta ärende");
  }

  res.status(200).json(ticket);
});

// @desc    Create new tickets
// @http    POST
// @route   /api/tickets
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
  const { category, description, title } = req.body;

  if (!category || !description || !title) {
    res.status(400);
    throw new Error("Var fyll i alla fält");
  }

  //get user using id in JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("Var vänlig logga in");
  }

  const ticket = await Ticket.create({
    category,
    description,
    title,
    user: req.user.id,
    status: "Ny",
  });

  res.status(201).json({ ticket });
});

// @desc    Delete user ticket
// @http    DELETE
// @route   /api/tickets/:id
// @access  Private
const deleteTicket = asyncHandler(async (req, res) => {
  //get user using id in JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("Var vänlig logga in");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Fann inget ärende med detta id");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Du är ej ägare av detta ärende");
  }

  await ticket.remove();

  res.status(204).json({ success: true });
});

// @desc    Update user ticket
// @http    PUT
// @route   /api/tickets/:id
// @access  Private
const updateTicket = asyncHandler(async (req, res) => {
  //get user using id in JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("Var vänlig logga in");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Fann inget ärende med detta id");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Du är ej ägare av detta ärende");
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json({ updatedTicket });
});

module.exports = {
  getTickets,
  getTicket,
  createTicket,
  deleteTicket,
  updateTicket,
};
