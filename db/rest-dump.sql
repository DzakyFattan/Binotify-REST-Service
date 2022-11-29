create table if not exists binotify_user (
    id_user serial primary key not null,
    email varchar(256) not null,
    pass_user varchar(256) not null,
    username varchar(256) not null,
    name_user varchar(256) not null,
    isadmin boolean not null default false
);

create table if not exists binotify_songs (
    id_song serial primary key not null,
    judul varchar(64) not null,
    id_penyanyi integer not null,
    audio_path varchar(256) not null
)