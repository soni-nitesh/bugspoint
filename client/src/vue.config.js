module.export = {
    devServer:{
        proxy: {
            '': {
                target: 'http://localhost:3333'
            }
        }
    }
}