import { loadEnv, defineConfig } from '@medusajs/framework/utils'
import { requireSecret } from './src/lib/secrets'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: requireSecret('JWT_SECRET'),
      cookieSecret: requireSecret('COOKIE_SECRET'),
    }
  }
})
