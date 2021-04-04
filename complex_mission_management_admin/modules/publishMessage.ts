import amqplib from 'amqplib';

const exchange_name = 'notification_topic';
const routing_key = 'test.notification';

const sendNotification = (mission_id: number, pokemon_names: string[]) => {
  const amqp = amqplib.connect('amqp://localhost');

  const last_index = pokemon_names.length - 1;
  const first_names = pokemon_names.slice(0, last_index).join(', ');

  const msg = `[New Quest] Looking for ${first_names} and ${pokemon_names[last_index]} (${mission_id})`;

  amqp
    .then((conn) => conn.createChannel())
    .then((channel) => {
      return channel
        .assertExchange(exchange_name, 'topic', {
          durable: true,
        })
        .then((ok) => {
          channel.publish(exchange_name, routing_key, Buffer.from(msg), {
            persistent: true,
          });

          console.log(`Sent`, exchange_name, msg);
        });
    })
    .catch(console.warn);
};

export default sendNotification;
