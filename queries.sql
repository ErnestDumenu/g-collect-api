-- Create Database

-- Database: gcollect_db

-- DROP DATABASE IF EXISTS gcollect_db;

CREATE DATABASE gcollect_db
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

CREATE EXTENSION POSTGIS;
-- Create Table Users
-- Table: public.user

-- DROP TABLE IF EXISTS public."user";

CREATE TABLE IF NOT EXISTS public."user"
(
    user_id bigint NOT NULL DEFAULT nextval('users_user_id_seq'::regclass),
    first_name character varying(60) COLLATE pg_catalog."default",
    last_name character varying(60) COLLATE pg_catalog."default",
    dob date,
    sex character varying(7) COLLATE pg_catalog."default",
    email character varying(60) COLLATE pg_catalog."default",
    contact character varying(20) COLLATE pg_catalog."default",
    location point,
    password character varying(120) COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (user_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."user"
    OWNER to postgres;
--Create Table Routes
-- Table: public.routes

-- DROP TABLE IF EXISTS public.orders;

CREATE TABLE IF NOT EXISTS public.orders
(
    order_no bigint NOT NULL DEFAULT nextval('orders_order_no_seq'::regclass),
    user_id character varying(10) COLLATE pg_catalog."default",
    date date,
    bin_size character varying(10) COLLATE pg_catalog."default",
    bin_colour character varying(10) COLLATE pg_catalog."default",
    label character varying(40) COLLATE pg_catalog."default",
    location point,
    payment_method character varying(10) COLLATE pg_catalog."default",
    payment_received character varying(10) COLLATE pg_catalog."default",
    cost numeric(7,0),
    status character varying(10) COLLATE pg_catalog."default",
    CONSTRAINT routes_pkey PRIMARY KEY (order_no)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.orders

    OWNER to postgres;







-- Create Table Routes
-- Table: public.routes

-- DROP TABLE IF EXISTS public.routes;

CREATE TABLE IF NOT EXISTS public.routes
(
    route_no bigint NOT NULL DEFAULT nextval('routes_route_no_seq'::regclass),
    issue_date date,
    checkpoints point[],
    start_date date,
    start_time time without time zone,
    eta time without time zone,
    area character varying(30) COLLATE pg_catalog."default",
    distance numeric,
    truck_id character varying(10) COLLATE pg_catalog."default",
    status character varying(10) COLLATE pg_catalog."default",
    CONSTRAINT routes_pkey1 PRIMARY KEY (route_no)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.routes
    OWNER to postgres;    


    -- id integer NOT NULL DEFAULT nextval('ppp_id_seq'::regclass),
    -- CONSTRAINT ppp_pkey PRIMARY KEY (id)
