const amqp = require("amqplib/callback_api");

const sendToQueue = async (filePath) => {
  amqp.connect("amqp://localhost", function (error0, connection) {
    if (error0) throw error0;

    connection.createChannel(function (error1, channel) {
      if (error1) throw error1;

      const queue = "compress";
      channel.assertQueue(queue, { durable: true });
      channel.sendToQueue(queue, Buffer.from(filePath), { persistent: true });
      console.log(" [x] Sent to queue:", filePath);

      setTimeout(() => {
        connection.close();
      }, 500);
    });
  });
};

module.exports = sendToQueue;
