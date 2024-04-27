    // See http://mongoosejs.com/docs/models.html
    // for more of what you can do here.
    module.exports = function (app) {
        const modelName = 'userProfiles';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
                   userId: { type: String, unique: false, lowercase: false, default: '' },
       imageUrl: { type: String, unique: false, lowercase: false, default: '' },
       profileStatusId: { type: String, unique: false, lowercase: false, default: '' },
       uuId: { type: String, unique: false, lowercase: false, default: '' },
       oauthProviderId: { type: String, unique: false, lowercase: false, default: '' },
       oauthProviderName: { type: String, unique: false, lowercase: false, default: '' },
       loginTypeId: { type: String, unique: false, lowercase: false, default: '' },
       dateOfBirth: { type: String, unique: false, lowercase: false, default: '' },
       gender: { type: String, unique: false, lowercase: false, default: '' },
       accountStatus: { type: String, unique: false, lowercase: false, default: '' },
       currentMobileNumberId: { type: String, unique: false, lowercase: false, default: '' },
       currentRoleId: { type: String, unique: false, lowercase: false, default: '' },
       currentCompanyId: { type: String, unique: false, lowercase: false, default: '' },
       currentBranchId: { type: String, unique: false, lowercase: false, default: '' },
       currentDepartmentId: { type: String, unique: false, lowercase: false, default: '' },
       currentSubDepartmentId: { type: String, unique: false, lowercase: false, default: '' },

            
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