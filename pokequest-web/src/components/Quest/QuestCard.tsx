import React, { useMemo } from 'react';
import { IQuest } from '../../interfaces';
import { Card } from './styled';

interface Props {
  quest: IQuest;
  setCurrentQuest?: (quest: IQuest) => void | undefined;
}

const QuestCard: React.FC<Props> = (props) => {
  const { quest, setCurrentQuest } = props;
  const { end_time, pokemon: pokemonList } = quest;

  const endTime = useMemo(() => {
    const date = new Date(parseInt(end_time));
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const mins = date.getMinutes();

    return `${day}/${month}/${year} ${hour}:${mins}`;
  }, [end_time]);

  const selectQuest = () => {
    if (setCurrentQuest) {
      setCurrentQuest(quest);
    }
  };

  return (
    <Card onClick={() => selectQuest()}>
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
