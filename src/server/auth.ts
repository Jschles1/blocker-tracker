import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
  type DefaultUser,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AtlassianProvider from "next-auth/providers/atlassian";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";
import { type UserRole } from "~/lib/interfaces";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      // ...other properties
      role: UserRole;
    };
  }

  interface User extends DefaultUser {
    // ...other properties
    role: UserRole;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        role: user.role,
      },
    }),
  },
  events: {
    createUser({ user }) {
      console.log("New User Created: ", user);
    },
    async signIn({ user, account, profile: _, isNewUser }) {
      if (
        isNewUser &&
        !!account &&
        account.provider === "atlassian" &&
        user.role === "USER"
      ) {
        // TODO: Figure out more optimal way to do this
        console.log("New Admin User detected: Updating user role to ADMIN");
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            role: "ADMIN",
          },
        });
        user.role = "ADMIN";
      } else if (user.role === "USER") {
        console.log("Regular User detected: ", user);
      }
      console.log("Signed in user: ", user);
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    AtlassianProvider({
      clientId: env.ATLASSIAN_CLIENT_ID,
      clientSecret: env.ATLASSIAN_CLIENT_SECRET,
      authorization: {
        params: {
          scope:
            "write:jira-work read:jira-work read:jira-user offline_access read:me",
          redirect_uri: env.ATLASSIAN_REDIRECT_URI,
        },
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
