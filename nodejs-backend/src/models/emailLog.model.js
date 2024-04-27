    // See http://mongoosejs.com/docs/models.html
    // for more of what you can do here.
    module.exports = function (app) {
        const modelName = 'emailLog';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
                   fromUserId: { type: String, unique: false, lowercase: false, default: '' },
       toff: { type: String, unique: false, lowercase: false, default: '' },
       ccff: { type: String, unique: false, lowercase: false, default: '' },
       bcc: { type: String, unique: false, lowercase: false, default: '' },
       content: { type: String, unique: false, lowercase: false, default: '' },
       subject: { type: String, unique: false, lowercase: false, default: '' },
       attachmentCount: { type: String, unique: false, lowercase: false, default: '' },

            
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