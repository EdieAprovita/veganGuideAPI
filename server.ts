const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

//CORS
app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	})
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
