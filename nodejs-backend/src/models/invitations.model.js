    // See http://mongoosejs.com/docs/models.html
    // for more of what you can do here.
    module.exports = function (app) {
        const modelName = 'invitations';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
                   email: { type: String, unique: false, lowercase: false, default: '' },
       accepted: { type: String, unique: false, lowercase: false, default: '' },
       sentStatus: { type: String, unique: false, lowercase: false, default: '' },
       content: { type: String, unique: false, lowercase: false, default: '' },

            
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