    // See http://mongoosejs.com/docs/models.html
    // for more of what you can do here.
    module.exports = function (app) {
        const modelName = 'companies';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
                   companyName: { type: String, unique: false, lowercase: false, default: '' },
       companyNo: { type: String, unique: false, lowercase: false, default: '' },
       brandName: { type: String, unique: false, lowercase: false, default: '' },
       website: { type: String, unique: false, lowercase: false, default: '' },
       addressId: { type: String, unique: false, lowercase: false, default: '' },
       logourl: { type: String, unique: false, lowercase: false, default: '' },
       companyEmail: { type: String, unique: false, lowercase: false, default: '' },
       phoneTypeId: { type: String, unique: false, lowercase: false, default: '' },
       faxTypeId: { type: String, unique: false, lowercase: false, default: '' },
       isDefault: { type: String, unique: false, lowercase: false, default: '' },

            
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