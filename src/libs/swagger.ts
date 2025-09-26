import swaggerJSDoc from "swagger-jsdoc"

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Союз Вестей",
      version: "1.0.0",
      description: "Документация API",
    },
  },
  apis: ["./src/app/api/**/*.ts"],
}

export const swaggerSpec = swaggerJSDoc(options)
