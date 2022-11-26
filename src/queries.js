const getUsers = "SELECT * FROM binotify_user";
const getUserById = "SELECT * FROM binotify_user WHERE id_user = $1";
const checkEmailExists = "SELECT u FROM binotify_user u WHERE u.email = $1";
const addUser = "INSERT INTO binotify_user (email, pass_user, username, name_user, isadmin) VALUES ($1, $2, $3, $4, $5)";
const getSongsFromUsers = "SELECT s FROM binotify_songs s WHERE s.id_penyanyi = $1";

module.exports = {
    getUsers,
    getUserById,
    checkEmailExists,
    addUser,
    getSongsFromUsers,
};