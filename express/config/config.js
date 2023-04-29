require('dotenv').config();

CONFIG = {};

CONFIG.db_host = process.env.DB_HOST;
CONFIG.db_user = process.env.DB_USER;
CONFIG.db_password = process.env.DB_PASSWORD;
CONFIG.db_name = process.env.DB_NAME;
CONFIG.db_port = process.env.DB_PORT;
CONFIG.secretKey = process.env.SECRET;
CONFIG.jwt_encryption = process.env.JWT_ENCRYPTION;
CONFIG.jwt_expiration = process.env.JWT_EXPIRATION;
CONFIG.user = process.env.USER;
CONFIG.pass = process.env.PASS;
CONFIG.db_dialect = process.env.DIALECT;