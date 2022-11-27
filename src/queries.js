const getUsers = "SELECT * FROM binotify_user ORDER BY username ASC";
const getUserByUsername = "SELECT * FROM binotify_user WHERE username = $1";
const checkEmailExists = "SELECT u FROM binotify_user u WHERE u.email = $1";
const checkUsernameExists = "SELECT u FROM binotify_user u WHERE u.username = $1";
const addUser = "INSERT INTO binotify_user (email, pass_user, username, name_user, isadmin) VALUES ($1, $2, $3, $4, $5)";


const getSongsFromUsers = "SELECT * FROM binotify_songs WHERE id_penyanyi = $1 ORDER BY judul ASC";
const addSong = "INSERT INTO binotify_songs(judul, id_penyanyi, audio_path) VALUES ($1, $2, $3)";
const getSongId = "SELECT id_song FROM binotify_songs WHERE judul = $1 AND id_penyanyi = $2";
const removeSong = "DELETE FROM binotify_songs WHERE id_song = $1";

module.exports = {
    getUsers,
    getUserByUsername,
    checkEmailExists,
    checkUsernameExists,
    addUser,
    getSongsFromUsers,
    addSong,
    getSongId,
    removeSong
};