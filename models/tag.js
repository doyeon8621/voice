"use strict";
const Sequelize = require("sequelize");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tag.hasMany(models.TrackTag, { foreignKey: "tagId" });
    }
  }
  Tag.init(
    {
      tagId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tag: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    },
    {
      sequelize,
      modelName: "Tag",
      timestamps: false,
    },
  );
  return Tag;
};
