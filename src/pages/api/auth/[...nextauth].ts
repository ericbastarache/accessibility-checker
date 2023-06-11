import NextAuth, { NextAuthOptions } from "next-auth"
import SequelizeAdapter from "@next-auth/sequelize-adapter";
import { Sequelize } from "sequelize";
import EmailProvider from "next-auth/providers/email";
import User from '@/models/user';
import Account from '@/models/account';
import Session from '@/models/session';
import VerificationRequest from '@/models/verificationrequest';

const sequelize = new Sequelize(`postgres://${process.env.POSTGRES_USERNAME}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB_NAME}`);

export const authOptions: NextAuthOptions = {
  providers: [
    EmailProvider({
      server: {
      host: process.env.EMAIL_SERVER_HOST,
      port: process.env.EMAIL_SERVER_PORT,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD
      }
    },
    from: process.env.EMAIL_FROM
    }),
  ],
  adapter: SequelizeAdapter(sequelize, {
    id: false,
    modelMapping: {
      User,
      Account,
      Session,
      VerificationRequest
    }
  }),
  session: {
    strategy: "database",

    maxAge: 30 * 24 * 60 * 60, // 30 days

    updateAge: 24 * 60 * 60, // 24 hours
    
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex")
    }
  },
  callbacks: {
    async session(session, user) {
      session.user.id = user.id;
      return session;
    }
  },
}

export default NextAuth(authOptions)
