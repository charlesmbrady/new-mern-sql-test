const fs = require('fs');
const path = require('path');
require('dotenv').config();
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '/../config/config.js'))[env];
const db = {};
let sequelize;

config.details.operatorsAliases = {
  $and: Sequelize.Op.and,
  $or: Sequelize.Op.or,
  $eq: Sequelize.Op.eq,
  $gt: Sequelize.Op.gt,
  $lt: Sequelize.Op.lt,
  $lte: Sequelize.Op.lte,
  $like: Sequelize.Op.like
};

if (process.env[config.use_env_variable]) {
  sequelize = new Sequelize(
    process.env[config.use_env_variable]
    // {
    //   port: 3306,
    //   dialect: 'mysql',
    //   database: config.details.database,
    //   username: config.details.username,
    //   password: config.details.password,
    //   host: config.details.host
    // }
  );
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config.details
  );
}

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file !== 'index.js'
    );
  })
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
