    // See http://mongoosejs.com/docs/models.html
    // for more of what you can do here.
    module.exports = function (app) {
        const modelName = 'fieldPermissions';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
                   roleId: { type: String, unique: false, lowercase: false, default: '' },
       userId: { type: String, unique: false, lowercase: false, default: '' },
       serviceId: { type: String, unique: false, lowercase: false, default: '' },
       fieldId: { type: String, unique: false, lowercase: false, default: '' },
       read: { type: String, unique: false, lowercase: false, default: '' },
       create: { type: String, unique: false, lowercase: false, default: '' },
       patchany: { type: String, unique: false, lowercase: false, default: '' },
       patchown: { type: String, unique: false, lowercase: false, default: '' },
       deleteany: { type: String, unique: false, lowercase: false, default: '' },
       deleteown: { type: String, unique: false, lowercase: false, default: '' },

            
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