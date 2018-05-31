const schema = `
    type Painting {
        id: ID
        name: String
        url: String
        techniques: [String]
    }

    type Technique {
        id: String
        name: String
        isActive: Boolean
    }

    type Query {
        painting: [Painting]
        getPaintingById(id: ID!): Painting
        getPaintingByName(name: String!): Painting
        technique: [Technique]
    }

    type Mutation {
        createPainting(name: String!, url: String!, techniques: [String!]!): Painting
        createTechnique(id: String, name: String): Technique
        disableTechnique(id: ID): Technique
        enableTechnique(id: ID): Technique
    }

    schema {
        query: Query
        mutation: Mutation
    }
`;

module.exports = schema;