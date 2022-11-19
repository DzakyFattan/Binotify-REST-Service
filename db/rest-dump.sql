--
-- PostgreSQL database dump
--

-- Dumped from database version 15.0
-- Dumped by pg_dump version 15.0

-- Started on 2022-11-19 21:47:55

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 217 (class 1259 OID 52506)
-- Name: binotify_songs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.binotify_songs (
    id_song integer NOT NULL,
    judul character varying(64) NOT NULL,
    id_penyanyi integer NOT NULL,
    audio_path character varying(256) NOT NULL
);


ALTER TABLE public.binotify_songs OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 52505)
-- Name: binotify_songs_id_song_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.binotify_songs_id_song_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.binotify_songs_id_song_seq OWNER TO postgres;

--
-- TOC entry 3338 (class 0 OID 0)
-- Dependencies: 216
-- Name: binotify_songs_id_song_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.binotify_songs_id_song_seq OWNED BY public.binotify_songs.id_song;


--
-- TOC entry 215 (class 1259 OID 52490)
-- Name: binotify_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.binotify_user (
    id_user integer NOT NULL,
    email character varying(256) NOT NULL,
    pass_user character varying(256) NOT NULL,
    username character varying(256) NOT NULL,
    name_user character varying(256) NOT NULL,
    isadmin boolean NOT NULL
);


ALTER TABLE public.binotify_user OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 52489)
-- Name: binotify_user_id_user_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.binotify_user_id_user_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.binotify_user_id_user_seq OWNER TO postgres;

--
-- TOC entry 3339 (class 0 OID 0)
-- Dependencies: 214
-- Name: binotify_user_id_user_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.binotify_user_id_user_seq OWNED BY public.binotify_user.id_user;


--
-- TOC entry 3179 (class 2604 OID 52509)
-- Name: binotify_songs id_song; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.binotify_songs ALTER COLUMN id_song SET DEFAULT nextval('public.binotify_songs_id_song_seq'::regclass);


--
-- TOC entry 3178 (class 2604 OID 52493)
-- Name: binotify_user id_user; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.binotify_user ALTER COLUMN id_user SET DEFAULT nextval('public.binotify_user_id_user_seq'::regclass);


--
-- TOC entry 3330 (class 0 OID 52506)
-- Dependencies: 217
-- Data for Name: binotify_songs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.binotify_songs (id_song, judul, id_penyanyi, audio_path) FROM stdin;
1	Umapyoi	1	/assets/Umapyoi.txt
\.


--
-- TOC entry 3328 (class 0 OID 52490)
-- Dependencies: 215
-- Data for Name: binotify_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.binotify_user (id_user, email, pass_user, username, name_user, isadmin) FROM stdin;
1	mayano@top.gun	topgunmaverick	Mayano	Mayano Top Gun	t
2	eishin@fla.sh	meisterschaft	Eishin	Eishin Flash	f
3	kitasan@bla.ck	omikoshi	Kitasan	Kitasan Black	f
\.


--
-- TOC entry 3340 (class 0 OID 0)
-- Dependencies: 216
-- Name: binotify_songs_id_song_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.binotify_songs_id_song_seq', 1, true);


--
-- TOC entry 3341 (class 0 OID 0)
-- Dependencies: 214
-- Name: binotify_user_id_user_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.binotify_user_id_user_seq', 3, true);


--
-- TOC entry 3183 (class 2606 OID 52511)
-- Name: binotify_songs binotify_songs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.binotify_songs
    ADD CONSTRAINT binotify_songs_pkey PRIMARY KEY (id_song);


--
-- TOC entry 3181 (class 2606 OID 52497)
-- Name: binotify_user binotify_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.binotify_user
    ADD CONSTRAINT binotify_user_pkey PRIMARY KEY (id_user);


--
-- TOC entry 3184 (class 2606 OID 52512)
-- Name: binotify_songs fk_penyanyi; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.binotify_songs
    ADD CONSTRAINT fk_penyanyi FOREIGN KEY (id_penyanyi) REFERENCES public.binotify_user(id_user) ON DELETE CASCADE;


-- Completed on 2022-11-19 21:47:55

--
-- PostgreSQL database dump complete
--

