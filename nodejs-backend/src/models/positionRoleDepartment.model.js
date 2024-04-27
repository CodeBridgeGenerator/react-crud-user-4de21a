    // See http://mongoosejs.com/docs/models.html
    // for more of what you can do here.
    module.exports = function (app) {
        const modelName = 'positionRoleDepartment';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
                   userId: { type: String, unique: false, lowercase: false, default: '' },
       positionId: { type: String, unique: false, lowercase: false, default: '' },
       roleId: { type: String, unique: false, lowercase: false, default: '' },
       departmentId: { type: String, unique: false, lowercase: false, default: '' },
       start: { type: String, unique: false, lowercase: false, default: '' },
       end: { type: String, unique: false, lowercase: false, default: '' },

            
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