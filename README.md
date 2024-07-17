# CEMEX Angular Tech Test

## Configuración Inicial

-   En primer lugar, se debe correr el comando `npm i` en la carpeta donde se localiza el package.json, para instalar las dependecias
-   El proyecto cuenta con un backend mockeado mediante JSON Server, se debe iniciar con `npx json-server mock.json`, ubicandose en [http://localhost:3000/](http://localhost:3000/)
-   Finalmente, se arranca el proyecto Angular mediante `ng serve`

## Documentación

### Resumen

La prueba consiste en la creación de una tabla de gestión de pedidos, con la capadidad de listarlos y filtrarlos (Estado, Línea de Producción, Fecha Inicio/Fin y Nuúmero de Orden

### Backend (Mock)

Como se menciona previamente, el backend se ofrece mediante un archivo .json que hace las veces de BD. Mediante la librería `json-server`, se crea un backend mock con los endpoints mínimos para interactuar con dicha BD.

### Modelos

Para la interacción con el backend, se han creado 1 modelo, con los atributos propios de dicho objeto en BD

-   Order

### Componentes y Vistas

La gestión de los componentes se ha realizado alojando en la vista principal del proyecto (app.component) un componente llamado order-history, el cual cuenta con la lógica y diseño completo de la tabla y filtros

El filtrado permite al usuario utilizar los filtros en cualquier orden, sumando entre ellos sus capacidades para obtener una búsqueda más concreta. En casos como el filtro de Product Line, las opciones sugeridas varían en función
de las presentes en ese momento en la tabla

### Services

La interacción con el backend se ha realizado mediante la creación de un servicio por cada una de las vistas, con los endpoints necesarios para nutrir al frontend de los datos.

Cada endpoint recurre a un archivo de constantes para conocer la ruta en cuestión, facilitando el mantenimiento del proyecto y la escalabilidad y, de la misma manera, al host en el que se encuentre el backend, dejándolo preparado para despegarlo en un futuro

### CSS
Para el estilado, se ha recurrido a SCSS (Sass: Syntactically Awesome Style Sheets), por las capacidades extra que aporta frente a CSS convencional, con el anidamiento de las clases.

Para facilitar dicho anidamiento, se usa una nomenclatura padre-hijo para las clases, por ejemplo

-   div padre -> class="card"
-   div hijo -> class="card__content"

El diseño en escritorio se muestra apegado a la vista móvil, siendo esta responsiva en múltiples dispositivos

### Testing
Para el testing, se ha utilizado la herramienta Karma Jasmine, opción por defecto de Agular, desarrollando tests para las nuevas vistas, componentes y servicios de interacción con el backend
