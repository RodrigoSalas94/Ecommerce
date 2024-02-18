import { createClient } from 'redis'

export const clientRedis = createClient()

clientRedis.connect()

clientRedis.on('error', err => console.log('Redis Client Error', err))