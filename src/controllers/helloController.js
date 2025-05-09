// src/controllers/helloController.js
const sayHello = (req, res) => {
    res.status(200).json({ message: "¡Hola, mundo!" });
};

module.exports = { sayHello };
