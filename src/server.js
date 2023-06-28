const app = require('./app');

app.listen(process.env.PORT, () => console.log(`JWT server running on port ${process.env.PORT}`));
