import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info : {
            title: 'Proyecto Ecommerce',
            version: '1.0.0'
        }
    },
    apis: [`${path.join(__dirname, './src/routes/*')}`]
}

export const swaggerSpec = swaggerJSDoc(options)

