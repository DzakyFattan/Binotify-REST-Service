const pool = require('./db');
const queries = require('./queries');
const config = require('./config/default.js');

const getSongs = async (req, res) => {
    // console.log('getting song list..');
    //console.log(req.user.name);
    try {
        if (req.user == config.admin_token) {
            let results = await pool.query("SELECT * FROM binotify_songs");
            res.status(200).json(results.rows);
        } else {
            let results = await pool.query(queries.getSongsFromUsers, [req.user_id]);
            res.status(200).json(results.rows);
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
        let checkSong = await pool.query(queries.getSongId, [judul, req.user_id]);
        if (checkSong.rows.length > 0) {
            res.status(409).json({ message: 'Song already exists' });
        } else {
            let _ = pool.query(queries.addSong, [judul, req.user_id, audio_path]);
            res.status(201).json({ message: 'Song added Successfully' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateSong = async (req, res) => {
    // console.log('updating a song..');
    const { id_song, judul, audio_path } = req.body;
    // console.log(req.user);
    try {
        if (judul == null && audio_path == null) {
            res.status(400).json({ message: 'No data to update' });
        } else {
            let checkSong = await pool.query(queries.getSong, [id_song, req.user_id]);
            if (checkSong.rows.length > 0) {
                let query = "UPDATE binotify_songs SET ";
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
                let _ = pool.query(query);
                res.status(200).json({ message: 'Song updated' });
            } else {
                res.status(404).json({ message: 'Song does not exist' });
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const removeSong = async (req, res) => {
    // console.log('removing a song..');
    // console.log(req.user);
    try {
        let checkSong = await pool.query(queries.getSong, [req.body.id_song, req.user_id]);
        if (checkSong.rows.length > 0) {
            let _ = pool.query(queries.removeSong, [req.body.id_song]);
            res.status(200).json({ message: 'Song removed' });
        } else {
            res.status(404).json({ message: 'Song does not exist' });
        }
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