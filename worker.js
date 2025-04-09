const amqp = require("amqplib/callback_api");
const path = require("path");
const fs = require("fs");
const { compress } = require("compress-pdf");

const compressPDF = () => {
  amqp.connect("amqp://localhost", function (error0, connection) {
    if (error0) throw error0;

    connection.createChannel(function (error1, channel) {
      if (error1) throw error1;

      const queue = "compress";

      channel.assertQueue(queue, { durable: true });
      channel.prefetch(1);

      console.log(" [*] Waiting for messages...");

      channel.consume(queue, async (file) => {
        const filePath = file.content.toString();
        console.log(" [x] Received:", filePath);

        try {
          const buffer = await compress(filePath);
          const compressedPath = path.join(
            path.dirname(filePath),
            "compressed_" + path.basename(filePath)
          );

          await fs.promises.writeFile(compressedPath, buffer);
          console.log(" [✔] Compressed and saved to:", compressedPath);
          channel.ack(file);
        } catch (err) {
          console.error("Compression failed:", err);
          channel.nack(file, false, false);
        }
      });
    });
  });
};

module.exports = compressPDF;
