const User = require('../backend/user');

const authController = {};

// Registrar usuario
authController.register = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        // Verificar si el email ya está registrado
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'El email ya está registrado' });
        }

        // Crear usuario
        const newUser = new User({ nombre, email, password: password });
        await newUser.save();

        res.json({ mensaje: 'Usuario creado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// 🔹 Método de Login sin encriptación ni tokens
authController.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar si el usuario existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Usuario no encontrado' });
        }

        // Comparar la contraseña (en texto plano)
        if (user.password !== password) {
            return res.status(400).json({ error: 'Contraseña incorrecta' });
        }

        res.json({ mensaje: 'Login exitoso', usuario: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};


module.exports = authController;
