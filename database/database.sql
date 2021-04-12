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


-- INSERT DATABASE CONTENTS --

-- MISSION
INSERT INTO mission (start_time, end_time, creation_time) 
    VALUES (1617811200000, 1617983999999, 1617893072563);
INSERT INTO mission (start_time, end_time, creation_time) 
    VALUES (1618070400000, 1620489599999, 1618243618022);

-- MISSION_POKEMON
INSERT INTO mission_pokemon (mission_id, pokemon_id) 
    VALUES (1, 1);
INSERT INTO mission_pokemon (mission_id, pokemon_id) 
    VALUES (1, 7);
INSERT INTO mission_pokemon (mission_id, pokemon_id) 
    VALUES (1, 21);
INSERT INTO mission_pokemon (mission_id, pokemon_id) 
    VALUES (2, 7);
INSERT INTO mission_pokemon (mission_id, pokemon_id) 
    VALUES (2, 41);
INSERT INTO mission_pokemon (mission_id, pokemon_id) 
    VALUES (2, 90);

-- TRAINER_MISSION
INSERT INTO trainer_mission (mission_id, trainer_id, trainer_name,creation_time) 
    VALUES (1, '100', 'Lays Chip', 1617902553794);
INSERT INTO trainer_mission (mission_id, trainer_id, trainer_name,creation_time) 
    VALUES (2, '100', 'Lays Chip', 1618139012979);
INSERT INTO trainer_mission (mission_id, trainer_id, trainer_name,creation_time) 
    VALUES (2, '101', 'Diana Prince', 1618140118461);

-- TRAINER_POKEMON
INSERT INTO trainer_pokemon(trainer_id, pokemon_id, catch_time, status) 
    VALUES ('101', 41, 1618024608214, 'mission');
INSERT INTO trainer_pokemon(trainer_id, pokemon_id, catch_time, status) 
    VALUES ('101', 41, 1618024608212, 'mission');
INSERT INTO trainer_pokemon(trainer_id, pokemon_id, catch_time, status) 
    VALUES ('101', 41, 1618024608216, 'mission');
INSERT INTO trainer_pokemon(trainer_id, pokemon_id, catch_time, status) 
    VALUES ('101', 41, 1618024608211, 'caught');
INSERT INTO trainer_pokemon(trainer_id, pokemon_id, catch_time, status) 
    VALUES ('101', 41, 1618024608215, 'caught');
INSERT INTO trainer_pokemon(trainer_id, pokemon_id, catch_time, status) 
    VALUES ('101', 41, 1618024642608, 'caught');

-- MISSION_TRAINER_POKEMON
INSERT INTO mission_trainer_pokemon (mission_id, trainer_pokemon_id, received_time)
    VALUES (2, 1, 1618025819493);
INSERT INTO mission_trainer_pokemon (mission_id, trainer_pokemon_id, received_time)
    VALUES (2, 2, 1618025990458);
INSERT INTO mission_trainer_pokemon (mission_id, trainer_pokemon_id, received_time)
    VALUES (2, 3, 1618139959096);
