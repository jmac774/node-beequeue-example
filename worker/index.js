const Queue = require("bee-queue");

const opts = {
  redis: {
    host: "redis"
  }
};
const queue = new Queue("some-queue-identifier", opts);

const timeout = ms => new Promise(res => setTimeout(res, ms));
const randomDelay = () => Math.floor(Math.random() * 100) * 100;

queue.process(async job => {
  const delay = randomDelay();
  console.log(`PROCESSING #${job.id} with arbitrary delay of ${delay / 1000} seconds.`);
  await timeout(delay);
  return job.data.x + job.data.y;
});
