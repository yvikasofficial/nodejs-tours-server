const app = require('./app');

const port = 3333;
app.listen(port, () => {
  console.log(`App running on port ${port}....`);
});
