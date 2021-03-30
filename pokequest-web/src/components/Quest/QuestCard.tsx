import React, { useMemo } from 'react';
import styled from 'styled-components';

interface Props {
  quest: {
    id: number;
    start_time: string;
    end_time: string;
    creation_time: string;
    is_complete: boolean;
    pokemon: Pokemon[];
  };
}

interface Pokemon {
  id: number;
  name: string;
  sprite: string;
  official_artwork: string;
}

const Card = styled.button`
  width: 100%;
  padding: 12px 30px 12px 12px;
  margin: 12px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center;

  border-radius: 8px;
  border: 1px solid #00000012;
  background-color: #e3e3e3;

  .time {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: 300;
    letter-spacing: 0.5px;
    text-align: right;

    p {
      font-weight: 500;
      margin: 0;
      margin-bottom: 8px;
    }
  }
`;

const QuestCard: React.FC<Props> = (props) => {
  const {
    quest: { end_time, pokemon: pokemonList },
  } = props;

  const endTime = useMemo(() => {
    const date = new Date(parseInt(end_time));
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const mins = date.getMinutes();

    return `${day}/${month}/${year} ${hour}:${mins}`;
  }, [end_time]);

  console.log(pokemonList);

  return (
    <Card>
      <div className="pokemon">
        {pokemonList.map((pokemon) => (
          <img key={pokemon.id} src={pokemon.sprite} />
        ))}
      </div>
      <div className="time">
        <p>End Time</p>
        {endTime}
      </div>
    </Card>
  );
};

export default QuestCard;
