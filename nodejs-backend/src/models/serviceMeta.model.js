    // See http://mongoosejs.com/docs/models.html
    // for more of what you can do here.
    module.exports = function (app) {
        const modelName = 'serviceMeta';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
                   serviceId: { type: String, unique: false, lowercase: false, default: '' },
       descriptive: { type: String, unique: false, lowercase: false, default: '' },
       structural: { type: String, unique: false, lowercase: false, default: '' },
       administrative: { type: String, unique: false, lowercase: false, default: '' },
       reference: { type: String, unique: false, lowercase: false, default: '' },
       statistical: { type: String, unique: false, lowercase: false, default: '' },
       legal: { type: String, unique: false, lowercase: false, default: '' },

            
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