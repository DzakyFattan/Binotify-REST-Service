const pool = require('./db');
const queries = require('./queries');
const config = require('./config/default.js');

const getSongs = async (req, res) => {
    // console.log('getting song list..');
    //console.log(req.user.name);
    try {
        if (req.user == 'admin') {
            pool.query("SELECT * FROM binotify_songs", (error, results) => {
                if (error) {
                    throw error;
                }
                res.status(200).json(results.rows);
            });
        } else {
            pool.query(queries.getUserByUsername, [req.user.name], (error, results) => {
                if (error) {
                    throw error;
                }
                if (results.rows.length > 0) {
                    pool.query(queries.getSongsFromUsers, [results.rows[0].id_user], (error, results1) => {
                        if (error) {
                            throw error;
                        }
                        res.status(200).json(results1.rows);
                    });
                } else {
                    res.status(404).json({ message: 'User does not exist' });
                }
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addSong = async (req, res) => {
    // console.log('adding a song..');
    const { judul, audio_path } = req.body;
    //console.log(req.user.name);
    try {
        pool.query(queries.getUserByUsername, [req.user.name], (error, results) => {
            if (error) {
                throw error;
            }
            if (results.rows.length > 0) {
                console.log(results.rows[0]);
                pool.query(queries.getSongId, [judul, results.rows[0].id_user], (error, results1) => {
                    if (error) {
                        throw error;
                    }
                    if (results1.rows.length > 0) {
                        res.status(409).json({ message: 'Song already exists' });
                    } else {
                        pool.query(queries.addSong, [judul, results.rows[0].id_user, audio_path], (error, results) => {
                            if (error) {
                                throw error;
                            }
                            res.status(201).json({ message: 'Song added' });
                        });
                    }
                });
            } else {
                res.status(404).json({ message: 'User does not exist' });
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateSong = async (req, res) => {
    // console.log('updating a song..');
    const { id_song, judul, audio_path } = req.body;
    console.log(req.user.name);
    try {
        if (judul == null && audio_path == null) {
            res.status(400).json({ message: 'No data to update' });
        } else {
            pool.query(queries.getUserByUsername, [req.user.name], (error, results) => {
                if (error) {
                    throw error;
                }
                if (results.rows.length > 0) {
                    var query = "UPDATE binotify_songs SET ";
                    if (judul != null) {
                        query += "judul = '" + judul + "'";
                    }
                    if (audio_path != null) {
                        if (judul != null) {
                            query += ", ";
                        }
                        query += "audio_path = '" + audio_path + "'";
                    }
                    query += " WHERE id_song = " + id_song;
                    pool.query(query, (error, results) => {
                        if (error) {
                            throw error;
                        }
                        res.status(200).json({ message: 'Song updated' });
                    });
                } else {
                    res.status(404).json({ message: 'User does not exist' });
                }
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const removeSong = async (req, res) => {
    // console.log('removing a song..');
    const { id_song } = req.body;
    console.log(req.user.name);
    try {
        pool.query(queries.getUserByUsername, [req.user.name], (error, results) => {
            if (error) {
                throw error;
            }
            if (results.rows.length > 0) {
                pool.query(`SELECT id_song FROM binotify_songs WHERE id_song = ${id_song} AND id_penyanyi = ${results.rows[0].id_user}`, (error, results1) => {
                    if (error) {
                        throw error;
                    }
                    if (results1.rows.length > 0) {
                        pool.query(queries.removeSong, [id_song], (error, results) => {
                            if (error) {
                                throw error;
                            }
                            res.status(200).json({ message: 'Song removed' });
                        });
                    } else {
                        res.status(404).json({ message: 'Song does not exist' });
                    }
                });
            } else {
                res.status(404).json({ message: 'User does not exist' });
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getSongs,
    addSong,
    updateSong,
    removeSong,
};