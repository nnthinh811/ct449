const ApiError = require("../api-error");
const ContactService = require("../services/contact.service");
const ApiError = require("../api-error");

exports.create = (req, res) => {
	res.send({ message: "create handler" });
};

exports.findALL = (req, res) => {
	res.send({ message: "findAll handler" });
};

exports.findOne = (req, res) => {
	res.send({ message: "findOne handler" });
};

exports.update = (req, res) => {
	res.send({ message: "update handler" });
};

exports.delete = (req, res) => {
	res.send({ message: "delete handler" });
};

exports.deleteALL = (req, res) => {
	res.send({ message: "deleteAll handler" });
};

exports.findALLFavorite = (req, res) => {
	res.send({ message: "findAllFavorite handler" });
};

// Create and Save a new Contact
exports.create = async (req, res, next) => {
	if (!req.body?.name) {
		return next(new ApiError(400, "Name con not be empty"));
	}

	try {
		const contactService = new ContactService(MongoDB.client);
		const document = await contactService.create(req.body);
		return res.send(document);
	} catch (error) {
		return next(
			new ApiError(500, "An error occurred while creating the contact")
		);
	}
};

// Retrieving all contacts of a user from the database
exports.findALL = async (req, res, next) => {
	let documents = [];

	try {
		const contactService = new ContactService(MongoDB.client);
		const { name } = req.query;
		if (name) {
			documents = await contactService.findByName(name);
		} else {
			documents = await contactService.find({});
		}
	} catch (error) {
		return next(
			new ApiError(500, "An error occurred while retrieving contacts")
		);
	}

	return res.send(documents);
};

// Find a single contact with an id
exports.findOne = async (req, res, next) => {
	try {
		const contactService = new ContactService(MongoDB.client);
		const document = await contactService.findById(req.params.id);
		if (!document) {
			return next(new ApiError(404, "Contact not found"));
		}
		return res.send(document);
	} catch (error) {
		return next(
			new ApiError(
				500,
				'Error retrieving contact with id=${req.params.id}'
			)
		);
	}
};

// Update a contact by the id in the request
exports.update = async (req, res, next) => {
	if (Object.keys(req.body).length = 0) {
		return next(new ApiError(400, "Data to update con not be empty"));
	}

	try {
		const contactService = new ContactService(MongoDb.client);
		const document = await contactService.update(req.params.id, req.body);
		if (!document) {
			return next(new ApiError(404, "Contact not found"));
		}
		return res.send({ message: "Conatct was updated successfully" });
	} catch (error) {
		return next(
			new(500, 'Error updating contact with id=${req.params.id}')
		);
	}
};

// Delete a contact with th specified id in the request
exports.delete = async (req, res, next) => {
	try {
		const contactService = new ContactService(MongoDB.client);
		const document = await contactService.delete(req.params.id);
		if (!document) {
			return next(new ApiError(404, "Contact not found"));
		}
		return res.send({ message: "Conatct was deleted successfully" });
	} catch (error) {
		return next(
			new ApiError(
				500,
				'Could not delete contact with id=${req.params.id}'
			)
		);
	}
};

// Find all favorite contacts of a user
exports.findALLFavorite = async (_req, res, next) => {
	try {
		const contactService = new ContactService(MongoDB.client);
		const documents = await contactService.findALLFavorite();
		return res.send(documents);
	} catch (error) {
		return next(
			new ApiError(
				500,
				"An error occurred while retrieving favorite contacts"
			)
		);
	}
};

// Delete all contacts of a user from the database
exports.deleteALL = async (_req, res, next) => {
	try {
		const contactService = new ContactService(MongoDB.client);
		const deletedCount = await contactService.deleteAll();
		return res.send({
			message: '${deletedCount} contacts were deleted successfully',
		});
	} catch (error) {
		return next(
			new ApiError(500, "An error occurred while removing all contacts")
		);
	}
};