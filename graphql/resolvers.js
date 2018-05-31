const mongoose = require('mongoose');

const resolvers = (models) => ({
    Query: {
        painting(root){
            return models.Painting.find();
        },

        getPaintingById(root, { id }){
            return models.Painting.findById(id);
        },

        getPaintingByName(root,{ name }){
            return models.Painting.findOne({ name });
        },

        technique(root){
            return models.Technique.find();
        }
    },
    Mutation: {
        createPainting(root, { name, url, techniques }){
            let painting = new models.Painting({ name, url, techniques } );
            return painting.save().then(response => response);
        },

        createTechnique(root, { id, name }){
            let technique = new models.Technique({ id, name, isActive: true });
            return technique.save();
        },

        disableTechnique(root, { id }){
            return models.Technique.findByIdAndUpdate(id, { $set: { isActive: false } });
        },

        enableTechnique(root, { id }){
            return models.Technique.findByIdAndUpdate(id, { $set: { isActive: true } });
        }
    },
    Painting: {
        techniques(Painting){
            return models.Technique.find( { id: { $in: Painting.techniques }, isActive: true }, `-_id name` )
            .then((techniques) => techniques.map((obj) => obj.name));
        }
    }
});

module.exports = resolvers;