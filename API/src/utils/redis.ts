import connectRedis from "@/config/redis";

async function saveRedis(obj: Obj) {
  try {
    for (const key in obj) {
      await (await connectRedis()).set(key, JSON.stringify(obj[key]));
    }
  } catch (error) {
    return error;
  }
}

async function getRedis(key: string) {
  const redisJson =  await (await connectRedis()).get(key);
  return JSON.parse(redisJson);
}

export {
  saveRedis,
  getRedis
};

interface Obj {
  [key: string]: string;
}
