const mongoose = require('mongoose');
const option = {
    useNewUrlParser: true
};
mongoose.connect('mongodb://localhost:27017/event-react-node', option ).then(success=>{
    console.log('Successfuly connected to database');
}).catch(error=>{
    console.log(error);
    console.log('error connecting to database');
})