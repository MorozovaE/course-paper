export const config = {
    db: {
        name: 'db',
        user: 'liza',
        password: '1234',

        dialect: 'sqlite',
        path: 'db/database.sqlite'
    },
    app: {
        port: '3001',
        clientHost: 'http://localhost:5173'
    },
};
