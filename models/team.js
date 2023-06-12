'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Organization, {
        foreignKey: 'organizationId',
        as: 'organization'
      })

      // association to User
      this.hasMany(models.User, {
        foreignKey: 'teamId',
        as: 'users'
      })
    }
  }
  Team.init({
    name: DataTypes.STRING,
    organizationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Team',
  });
  return Team;
};
