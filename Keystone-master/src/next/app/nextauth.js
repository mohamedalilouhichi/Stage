import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

export default NextAuth({
    providers: [
        Google({
            clientId: '788455509519-qc4526aot6rlfooho4quoc3olgp5q1s8.apps.googleusercontent.com',
            clientSecret: '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',
        }),
    ],
    callbacks: {
        async jwt(token, user, account, profile, isNewUser   ) {
            // Save the user to your database here
            // For example, using a MySQL database
            const db = await import('../lib/db');
            const userDoc = await db.createUser(user);
            return {
                ...token,
                userId: userDoc.id,
            };
        },
    },
});