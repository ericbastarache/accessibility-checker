'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Organization, {
        foreignKey: {
          name: 'organizationId',
          allowNull: true
        },
        as: 'organization'
      });
      this.belongsTo(models.Team, {
        foreignKey: {
          name: 'teamId',
          allowNull: true
        },
        as: 'team'
      });
      this.hasOne(models.Subscription, {
        foreignKey: 'userId',
        as: 'subscription'
      });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    image: DataTypes.STRING,
    emailVerified: DataTypes.DATE,
    organizationId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
