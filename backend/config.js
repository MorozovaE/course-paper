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
        serverHost: 'http://localhost:3001',
        clientHost: 'http://localhost:5173',
        imagesUploads: "D:\\react\\course-paper\\backend\\image\\"
    },
};