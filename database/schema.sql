--
-- PostgreSQL database dump
--

\restrict cDVuttgfjkRZtxVgsii4OhXZl9DVWObUbwiF0wkGrROuZ8yKXJLkr3zcEva2MOf

-- Dumped from database version 18.6 (Debian 18.6-1.pgdg13+2)
-- Dumped by pg_dump version 18.6 (Ubuntu 18.6-0ubuntu0.26.04.1)

-- Started on 2026-09-01 20:54:03 -03

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE postgres;
--
-- TOC entry 3464 (class 1262 OID 5)
-- Name: postgres; Type: DATABASE; Schema: -; Owner: investimentes_app
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO investimentes_app;

\unrestrict cDVuttgfjkRZtxVgsii4OhXZl9DVWObUbwiF0wkGrROuZ8yKXJLkr3zcEva2MOf
\connect postgres
\restrict cDVuttgfjkRZtxVgsii4OhXZl9DVWObUbwiF0wkGrROuZ8yKXJLkr3zcEva2MOf

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3465 (class 0 OID 0)
-- Dependencies: 3464
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: investimentes_app
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 16413)
-- Name: questoes; Type: TABLE; Schema: public; Owner: investimentes_app
--

CREATE TABLE public.questoes (
    id bigint NOT NULL,
    enunciado text NOT NULL,
    resposta_correta text NOT NULL,
    modulo smallint NOT NULL,
    CONSTRAINT chk_questoes_modulo CHECK ((modulo = ANY (ARRAY[1, 2])))
);


ALTER TABLE public.questoes OWNER TO investimentes_app;

--
-- TOC entry 221 (class 1259 OID 16412)
-- Name: questoes_id_seq; Type: SEQUENCE; Schema: public; Owner: investimentes_app
--

ALTER TABLE public.questoes ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.questoes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 220 (class 1259 OID 16402)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: investimentes_app
--

CREATE TABLE public.usuarios (
    id bigint NOT NULL,
    nome character varying(100) NOT NULL,
    senha_hash text NOT NULL
);


ALTER TABLE public.usuarios OWNER TO investimentes_app;

--
-- TOC entry 219 (class 1259 OID 16401)
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: investimentes_app
--

ALTER TABLE public.usuarios ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.usuarios_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 223 (class 1259 OID 16427)
-- Name: usuarios_questoes; Type: TABLE; Schema: public; Owner: investimentes_app
--

CREATE TABLE public.usuarios_questoes (
    usuario_id bigint NOT NULL,
    questao_id bigint NOT NULL,
    resposta_usuario text NOT NULL,
    data_conclusao timestamp with time zone,
    acertou boolean NOT NULL
);


ALTER TABLE public.usuarios_questoes OWNER TO investimentes_app;

--
-- TOC entry 3457 (class 0 OID 16413)
-- Dependencies: 222
-- Data for Name: questoes; Type: TABLE DATA; Schema: public; Owner: investimentes_app
--

INSERT INTO public.questoes OVERRIDING SYSTEM VALUE VALUES (1, 'enunciado teste', 'resposta_teste', 1);
INSERT INTO public.questoes OVERRIDING SYSTEM VALUE VALUES (2, 'teste_2', 'resposta2', 1);
INSERT INTO public.questoes OVERRIDING SYSTEM VALUE VALUES (3, 'teste_3', 'resposta3', 2);
INSERT INTO public.questoes OVERRIDING SYSTEM VALUE VALUES (4, 'teste 4', 'REsPOsTa4$%$%$', 2);


--
-- TOC entry 3455 (class 0 OID 16402)
-- Dependencies: 220
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: investimentes_app
--

INSERT INTO public.usuarios OVERRIDING SYSTEM VALUE VALUES (1, 'Usuario Teste', 'hash_de_teste');
INSERT INTO public.usuarios OVERRIDING SYSTEM VALUE VALUES (3, 'Kleber', 'hash_teste_123');
INSERT INTO public.usuarios OVERRIDING SYSTEM VALUE VALUES (4, 'Jiraya', 'hash_teste_456');


--
-- TOC entry 3458 (class 0 OID 16427)
-- Dependencies: 223
-- Data for Name: usuarios_questoes; Type: TABLE DATA; Schema: public; Owner: investimentes_app
--

INSERT INTO public.usuarios_questoes VALUES (1, 1, 'Planejamento financeiro', NULL, true);
INSERT INTO public.usuarios_questoes VALUES (1, 2, 'merda', NULL, true);
INSERT INTO public.usuarios_questoes VALUES (3, 2, 'merda', NULL, true);
INSERT INTO public.usuarios_questoes VALUES (4, 2, 'merda', NULL, true);
INSERT INTO public.usuarios_questoes VALUES (1, 3, 'merda', NULL, true);
INSERT INTO public.usuarios_questoes VALUES (1, 4, 'merda', NULL, false);
INSERT INTO public.usuarios_questoes VALUES (3, 4, 'resposta_correta', NULL, true);


--
-- TOC entry 3466 (class 0 OID 0)
-- Dependencies: 221
-- Name: questoes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: investimentes_app
--

SELECT pg_catalog.setval('public.questoes_id_seq', 4, true);


--
-- TOC entry 3467 (class 0 OID 0)
-- Dependencies: 219
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: investimentes_app
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 4, true);


--
-- TOC entry 3302 (class 2606 OID 16422)
-- Name: questoes pk_questoes; Type: CONSTRAINT; Schema: public; Owner: investimentes_app
--

ALTER TABLE ONLY public.questoes
    ADD CONSTRAINT pk_questoes PRIMARY KEY (id);


--
-- TOC entry 3304 (class 2606 OID 16437)
-- Name: usuarios_questoes pk_usuario_questoes; Type: CONSTRAINT; Schema: public; Owner: investimentes_app
--

ALTER TABLE ONLY public.usuarios_questoes
    ADD CONSTRAINT pk_usuario_questoes PRIMARY KEY (usuario_id, questao_id);


--
-- TOC entry 3300 (class 2606 OID 16411)
-- Name: usuarios pk_usuarios; Type: CONSTRAINT; Schema: public; Owner: investimentes_app
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT pk_usuarios PRIMARY KEY (id);


--
-- TOC entry 3305 (class 2606 OID 16443)
-- Name: usuarios_questoes fk_usuarios_questoes_questoes; Type: FK CONSTRAINT; Schema: public; Owner: investimentes_app
--

ALTER TABLE ONLY public.usuarios_questoes
    ADD CONSTRAINT fk_usuarios_questoes_questoes FOREIGN KEY (questao_id) REFERENCES public.questoes(id);


--
-- TOC entry 3306 (class 2606 OID 16438)
-- Name: usuarios_questoes fk_usuarios_questoes_usuarios; Type: FK CONSTRAINT; Schema: public; Owner: investimentes_app
--

ALTER TABLE ONLY public.usuarios_questoes
    ADD CONSTRAINT fk_usuarios_questoes_usuarios FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);


-- Completed on 2026-09-01 20:54:03 -03

--
-- PostgreSQL database dump complete
--

\unrestrict cDVuttgfjkRZtxVgsii4OhXZl9DVWObUbwiF0wkGrROuZ8yKXJLkr3zcEva2MOf
