const Queue = require("bee-queue");

const opts = {
  redis: {
    host: "redis"
  },
  isWorker: false
};
const queue = new Queue("some-queue-identifier", opts);

const createRandomJob = async () => {
  const x = Math.floor(Math.random() * 10);
  const y = Math.floor(Math.random() * 10);
  const data = { x, y };

  const job = await queue.createJob(data).save();
  console.log(`CREATED    #${job.id}: ${x} + ${y}`);

  job.on("succeeded", result => {
  console.log(`RESULT     #${job.id}: ${x} + ${y} =`, result);
  });
};

const createJobs = () => {
  setTimeout(async () => {
    await createRandomJob();
    createJobs();
  }, 2000);
};

// Create jobs every two seconds
createJobs();
