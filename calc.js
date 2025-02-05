const { calculateMean, calculateMode, calculateMedian } = require('./math-functions')
const express = require('express')
const app = express();
const ExpressError = require('./expressError')
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


/////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/mean', (req, res, next) => {
    const { numbers } = req.query;
    if (!numbers || typeof numbers !== 'string') {
        throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400);
    }
    const numArray = numbers.split(',').map(number => parseFloat(number.trim()));

    if (numArray.some(isNaN)) {
        throw new ExpressError('All elements must be valid numbers.');
    }

    let mean = calculateMean(numArray);
     return res.json({ mean });
});

////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/median', (req, res, next) => {
    const { numbers } = req.query;
    if (!numbers || typeof numbers !== 'string') {
        throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400);
    }
    const numArray = numbers.split(',').map(number => parseFloat(number.trim()));

    if (numArray.some(isNaN)) {
        throw new ExpressError('All elements must be valid numbers.');
    }

    let median = calculateMedian(numArray);

    return res.json({ median });
});

/////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/mode', (req, res, next) => {
    const { numbers } = req.query;

    // Check if numbers is provided and is a string
    if (!numbers || typeof numbers !== 'string') {
        throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400);
    }

    // Convert the string of numbers into an actual array of numbers
    const numArray = numbers.split(',').map(number => parseFloat(number.trim()));

    // Check if any of the elements in the array are NaN (not a valid number)
    if (numArray.some(isNaN)) {
        throw new ExpressError('All elements must be valid numbers.');
    }

    // Calculate the mode using the numArray (not the original string)
    let mode = calculateMode(numArray);

    // Return the result
    return res.json({ mode });
});


// If no other route matches, respond with a 404
// this should be before the error handler
app.use((req, res, next) => {
    const e = new ExpressError("Page Not Found", 404)
    next(e)
  });

// Error handler


app.use(function (error, req, res, next) {
    let status = error.status || 500;
    let message = error.message;

    return res.status(status).json({ error: { message, status }
    });
});


app.listen(3000, () => {
    console.log('server running!')
})