    // See http://mongoosejs.com/docs/models.html
    // for more of what you can do here.
    module.exports = function (app) {
        const modelName = 'ipLoginAccess';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
                   userId: { type: String, unique: false, lowercase: false, default: '' },
       roleId: { type: String, unique: false, lowercase: false, default: '' },
       startIp: { type: String, unique: false, lowercase: false, default: '' },
       endIp: { type: String, unique: false, lowercase: false, default: '' },
       allowedStartTime: { type: String, unique: false, lowercase: false, default: '' },
       allowedEndTime: { type: String, unique: false, lowercase: false, default: '' },
       blockedStartTime: { type: String, unique: false, lowercase: false, default: '' },
       blockedEndTime: { type: String, unique: false, lowercase: false, default: '' },

            
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