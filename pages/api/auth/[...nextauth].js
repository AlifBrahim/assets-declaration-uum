import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { TypeORMAdapter } from "@auth/typeorm-adapter"
import { createConnection } from "typeorm";

export default NextAuth({
    adapter: TypeORMAdapter({
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        synchronize: true,
        logging: false,
        entities: [
            // Your entities here
        ],
    }),
    providers: [
        // OAuth authentication providers...
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
    ],
    pages: {
        signIn: "/auth/signin",
    },
    secret: process.env.JWT_SECRET,
    allowDangerousEmailAccountLinking: true
})
