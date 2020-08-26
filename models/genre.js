let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let Genre = new Schema(
    {
        name: {type: String, required: true, minlength: 3, maxlength: 100}
    }
);

Genre
.virtual('url')
.get(function(){
    return ('/catalog/genre/' + this._id);
})

module.exports = mongoose.model('Genre', Genre);
