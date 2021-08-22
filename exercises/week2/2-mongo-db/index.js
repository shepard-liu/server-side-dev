const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');

mongoClient.connect('mongodb://localhost:27017')
    .then((client) => {
        console.log('Connected to mongodb server');

        var db = client.db('confusion');

        db.dropCollection('dishes')
            .then(() => {
                const collection = db.collection('dishes');
                return collection.insertOne({
                    name: 'testname',
                    description: 'test'
                });
            })
            .then(() => {
                console.log('inserted');
                return db.collection('dishes').find({}).toArray();
            })
            .then((docs) => {
                console.log(docs);
            });

    })