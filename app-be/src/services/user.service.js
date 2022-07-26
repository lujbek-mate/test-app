const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }

  const newUseBody = {
    ...userBody,
    thumbnail: 'https://picsum.photos/200',
    hoppies: ['design', 'dogs', 'travel', 'music', 'books', 'movies', 'food', 'games'],
    bio: "A disadvantage of using -openssl-legacy-provider is that it is not supported by older Node versions. Older Node versions simply don't run when this flag is provided.But I still want to be compatible with Node v16 and older.",
    photos: [
      'https://picsum.photos/200',
      'https://picsum.photos/200',
      'https://picsum.photos/200',
      'https://picsum.photos/200',
      'https://picsum.photos/200',
      'https://picsum.photos/200',
      'https://picsum.photos/200',
      'https://picsum.photos/200',
      'https://picsum.photos/200',
      'https://picsum.photos/200',
    ],
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
    },
    tweets: [
      "VueJS uses the md4 algorithm to generate hashes (wel actually it's WebPack under the hood). md4 can be easily replaced by md5 for these kind of purposes. The type of algorithm used, is on most places hard coded, so there's no way to configure another algorithm.",
    ],
  };

  return User.create(newUseBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
