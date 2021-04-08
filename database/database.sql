CREATE TABLE mission (
    id SERIAL PRIMARY KEY,
    start_time numeric NOT NULL,
    end_time numeric NOT NULL,
    creation_time numeric NOT NULL
);

CREATE TABLE mission_pokemon (
    id SERIAL PRIMARY KEY,
    mission_id integer,
    pokemon_id integer,
    UNIQUE (mission_id, pokemon_id)
);

CREATE TABLE trainer_mission (
    id SERIAL PRIMARY KEY,
    mission_id integer,
    trainer_id text,
    trainer_name text,
    creation_time numeric,
    UNIQUE (mission_id, trainer_id)
);

CREATE TABLE trainer_pokemon (
    id SERIAL PRIMARY KEY,
    trainer_id text,
    pokemon_id integer,
    catch_time numeric,
    status text DEFAULT 'caught',
    UNIQUE (trainer_id, pokemon_id, catch_time)
);

CREATE TABLE mission_trainer_pokemon (
    id SERIAL PRIMARY KEY,
    mission_id integer,
    trainer_pokemon_id integer,
    received_time numeric,
    UNIQUE (mission_id, trainer_pokemon_id)
);