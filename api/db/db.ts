import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('hoteldb', 'root', 'masterkey', {
    dialect: 'mariadb',
    host: 'localhost'
});

try {
    await sequelize.authenticate();
    
} catch (error) {
    console.error('Conexão malsucedido')
}