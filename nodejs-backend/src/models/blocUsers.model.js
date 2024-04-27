    // See http://mongoosejs.com/docs/models.html
    // for more of what you can do here.
    module.exports = function (app) {
        const modelName = 'blocUsers';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
                   type: { type: String, unique: false, lowercase: false, default: '' },
       pattern: { type: String, unique: false, lowercase: false, default: '' },
       detail: { type: String, unique: false, lowercase: false, default: '' },

            
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