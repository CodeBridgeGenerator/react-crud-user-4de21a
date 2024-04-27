    // See http://mongoosejs.com/docs/models.html
    // for more of what you can do here.
    module.exports = function (app) {
        const modelName = 'addresses';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
                   morphid: { type: String, unique: false, lowercase: false, default: '' },
       morphname: { type: String, unique: false, lowercase: false, default: '' },
       street: { type: String, unique: false, lowercase: false, default: '' },
       street2: { type: String, unique: false, lowercase: false, default: '' },
       city: { type: String, unique: false, lowercase: false, default: '' },
       postcode: { type: String, unique: false, lowercase: false, default: '' },
       state: { type: String, unique: false, lowercase: false, default: '' },
       country: { type: String, unique: false, lowercase: false, default: '' },

            
          },
          {
            timestamps: true
        });
      
        // This is necessary to avoid model compilation errors in watch mode
        // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };