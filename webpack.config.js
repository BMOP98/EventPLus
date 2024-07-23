module.exports = {
    // Otras configuraciones
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            // Otras reglas
        ],
    },
    // Otras configuraciones
};
