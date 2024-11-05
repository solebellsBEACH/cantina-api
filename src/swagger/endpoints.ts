module.exports = function (app: any) {

    app.get('/users/:id', (req: any, res: any) => {
        const filter = req.query.filter;

        const version = req.headers.version;

        return res.status(200).send("some data");
    });

    app.post('/users', (req: any, res: any) => {
        const { name, age } = req.body;

        return res.status(201).send();
    });

};