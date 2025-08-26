import app from './src/app.ts';
import config from './src/config/config.ts';
import connectDB from './src/db/db.ts';

const port = config.PORT;

connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
