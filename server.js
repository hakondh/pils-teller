const express = require('express');
const app = express();
const port = 5000;

app.get('/api/customers', (req, res) => {
    const customers = [
        {id: 1, firstName: 'John', lastName: 'Doe'},
        {id: 2, firstName: 'Per', lastName: 'Hansen'},
        {id: 3, firstName: 'Joe', lastName: 'Swanson'}
    ];
    
    res.json(customers);
});

app.get('/middle-earth/locations', (req, res) => {
    
});

app.listen(port, () => console.log('Server started on port ' + port));
