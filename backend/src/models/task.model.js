import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Task = sequelize.define(
  "Task",
  {
    
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },

    title:       { type: DataTypes.TEXT, allowNull: false },
    description: { type: DataTypes.TEXT },

    priority: {
      type: DataTypes.ENUM("low", "medium", "high", "none"),
      defaultValue: "none"
    },

    is_completed: { type: DataTypes.BOOLEAN, defaultValue: false }
  },
  {
    tableName:   "tasks",
    underscored: true,          
    createdAt:   "created_at",  
    updatedAt:   false          
  }
);
