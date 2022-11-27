--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1
-- Dumped by pg_dump version 15.0

-- Started on 2022-11-27 16:36:01

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

-- DROP DATABASE binotify_rest;
--
-- TOC entry 3351 (class 1262 OID 16384)
-- Name: binotify_rest; Type: DATABASE; Schema: -; Owner: postgres
--

-- CREATE DATABASE binotify_rest WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE binotify_rest OWNER TO postgres;

\connect binotify_rest

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
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

-- CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 3352 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 214 (class 1259 OID 16385)
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
-- TOC entry 215 (class 1259 OID 16388)
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
-- TOC entry 3353 (class 0 OID 0)
-- Dependencies: 215
-- Name: binotify_songs_id_song_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.binotify_songs_id_song_seq OWNED BY public.binotify_songs.id_song;


--
-- TOC entry 216 (class 1259 OID 16389)
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
-- TOC entry 217 (class 1259 OID 16394)
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
-- TOC entry 3354 (class 0 OID 0)
-- Dependencies: 217
-- Name: binotify_user_id_user_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.binotify_user_id_user_seq OWNED BY public.binotify_user.id_user;


--
-- TOC entry 3193 (class 2604 OID 16395)
-- Name: binotify_songs id_song; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.binotify_songs ALTER COLUMN id_song SET DEFAULT nextval('public.binotify_songs_id_song_seq'::regclass);


--
-- TOC entry 3194 (class 2604 OID 16396)
-- Name: binotify_user id_user; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.binotify_user ALTER COLUMN id_user SET DEFAULT nextval('public.binotify_user_id_user_seq'::regclass);


--
-- TOC entry 3342 (class 0 OID 16385)
-- Dependencies: 214
-- Data for Name: binotify_songs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.binotify_songs (id_song, judul, id_penyanyi, audio_path) FROM stdin;
1	Umapyoi Mayano	1	/src/assets/Umapyoi.txt
2	Umapyoi Eishin	2	/src/assets/Umapyoi.txt
3	Umapyoi Eishin Megamix	2	/src/assets/Umapyoi.txt
4	Umapyoi Eishin Ultra	2	/src/assets/Umapyoi.txt
\.


--
-- TOC entry 3344 (class 0 OID 16389)
-- Dependencies: 216
-- Data for Name: binotify_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.binotify_user (id_user, email, pass_user, username, name_user, isadmin) FROM stdin;
2	eishin@fla.sh	U2FsdGVkX1+ti+Vl6q6W+eGCjUINiSSNF0EBz6pw2rM=	Eishin	Eishin Flash	f
3	kitasan@bla.ck	U2FsdGVkX18i/+eibpfLxovYy7SIrI25C1nfFEAdZys=	Kitasan	Kitasan Black	f
1	mayano@top.gun	U2FsdGVkX1+u5UWlCnNLKU6p8GTs/ioxvDkOC5Nkc5o=	Mayano	Mayano Top Gun	t
\.


--
-- TOC entry 3355 (class 0 OID 0)
-- Dependencies: 215
-- Name: binotify_songs_id_song_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.binotify_songs_id_song_seq', 4, true);


--
-- TOC entry 3356 (class 0 OID 0)
-- Dependencies: 217
-- Name: binotify_user_id_user_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.binotify_user_id_user_seq', 3, true);


--
-- TOC entry 3196 (class 2606 OID 16398)
-- Name: binotify_songs binotify_songs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.binotify_songs
    ADD CONSTRAINT binotify_songs_pkey PRIMARY KEY (id_song);


--
-- TOC entry 3198 (class 2606 OID 16400)
-- Name: binotify_user binotify_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.binotify_user
    ADD CONSTRAINT binotify_user_pkey PRIMARY KEY (id_user);


--
-- TOC entry 3199 (class 2606 OID 16401)
-- Name: binotify_songs fk_penyanyi; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.binotify_songs
    ADD CONSTRAINT fk_penyanyi FOREIGN KEY (id_penyanyi) REFERENCES public.binotify_user(id_user) ON DELETE CASCADE;


-- Completed on 2022-11-27 16:36:01

--
-- PostgreSQL database dump complete
--

