## Circutor Technical Test

This is a very simple application that shows some energy data Helsinki buildings from 1st January 2021 to around 28 Feb 2022.

It has an API written in GO and a frontend written in React. It uses the UI library ant design (https://ant.design/)

## Launch

Clone/Fork the repo with git clone <url>
Build the docker containers and launch the project with:
```sh
docker-compose up --build
```

The api is accessible on `http://localhost:1234/docs/index.html`
The frontend is accessible on `localhost:3001`

## Tasks

### Programming
- Implement an error message when login fails
- Implement a small test for this new feature
- Change the border radius of all components (button, input, ...)
- Change the default color from blue to green

Feel free to implement any other improvement as long as you write a test for it.

### Writing (modify this readme)
#### Write in this all red flags that you find in the code. Any examples that would stop a code review. If you want to fix some of them, go on.

##### Red flags
- No entiendo la razon por la cual tener 2 archivos App. app.js y app.jsx. Supongo seria un descuido, borrar el que no cumpla con la convencion del equipo respecto a si sufijo js o jsx. A vuelo de pajaro sobre el repo, veo que se usa mas el sufijo .js por lo tanto seria borrar el jsx.
- En la rama main los test no pasan

##### Code review stoppers
- El nombre de los archivos, se debe revisar y respetar la convencion que se tenga en el equipo. ex: buildings_list.js y buildingList.css.
- Agrupar los archivos por componentes, ex: el componente buildings_list deberia estar definido en una carpeta que contenga todos los elementos que lo definen como css, docs, stories, jsx/tsx, specs/test, etc. “el codigo que cambia junto, deberia mentenerse junto”.
- Hay varios archivos/codigo sin utilizar. Lo que deje de ser util se le prede fuego. ex: app.css, style.js
- Evitaria aplicar estilos de forma global, entiendo que la libreria antd pueda tener algunas restricciones, pero dejaria esta opcion como ultimo recurso. ex: index.css
- Potencial callbackHell en el useEffect de bookmarks_list, a vuelo de pajaro se podria remplazar por async/await, para mejorar la legibilidad y para mejorar la estructura tal vez convenga delegar la responsabilidad de esa logica a un modules especifico.

##### Fixs
- Subir la version de node en la definicion del contenedor web de 13 a 18.
- Hay varios warnnings reportados por eslint al momento de traspilar la aplicacion, son simples de solucionar.
- Arreglar la confiuracion de los test (jest) estan rotos en main.

#### How you would make this application maintainable and scalable. Write here all the steps you would take.

##### Developer experience

- Agregar hot-reloading al realizar cambios cuando se trabaja sobre el contenedor de docker. Esto en caso de que el objetivo sea incentivar a trabajar sobre los contendores de docker, personalmente creo no deberia ser necesario tener el back levantado para trabajar el front.
- Agregar checkeo automatizado de estilo de código y test en el pre-commit hook de git. Hay herramientas para esto, antes he usado husky el cual es fácil de integrar.
- Agregar CI con GHA o la herramienta de preferencia, en la pipeline del PR agregar las validaciones de pre-commit ya comentadas y de ser posible otras de pruebas en ambiente de test dedicado [e2e].

##### Escalabilidad

- No usar la carpeta de layouts para implementar las páginas que daran soporte a las rutas de la aplicación, mejor pasar todo lo que no sea un layout a la carpeta pages, algo parecido a lo que hace el framework NextJS/NuxtJs.
- Para hacer los consumos de api, en caso de no tener lógica compleja recomendaría almenos implementar un custom hook que aporte manejo de estado mínimo y pre-procesado de los datos que devuelva el api, se podría ubicar en la carpeta de /hooks y hacerlo genérico para que cualquier componente lo use. Para lógica intensiva entre la capa de api y componente, si recomendaría usar una arquitectura que permita abstraer el caso de uso fuera de react en una carpeta que llamaría modules.
- Intentaria mejorar la gestion de las rutas. agrupar cuáles necesitan estar securizadas y cuáles no, creo recordar react-router ofrecía las Guards para proteger rutas.
- Desplegaría la app exponiendo solo el proyecto transpilado (paquete js) a modo de CDN, actualmente el contenedor expone la app con el server que monta react-scripts para el modo desarrollo.
- Este servicio TokenIsValid, se esta usando a modo de guarda en todas las paginas de la app de forma directa, se me ocurre agrupar las rutas que requieren estar securizadas y usar como validador ese servicio, de ese modo no seria necesario pegar ese servicio en todas las paginas.

##### Otras mejoras que me gustaria hacer totalmente arbitrarias:

- Usar pnpm en vez de npm, tiene mejor performance además de generar un packageLock mas limpio.
- Migrar el proyecto a ts, tener checkeo estático de tipos agiliza el desarrollo y evita errores. Su utilidad se va haciendo mas evidente a medida que el proyecto crece.
- Agregar MSW, es una librería que monta un serviceWorker en el lado front[browser] que permite mockear las respuestas a solicitudes http. Esto agiliza el desarrollo, ya que solo con tener acordada la firma de un endpoint se puede adelantar el desarrollo del frontal.
- Agregar zod para validación dinámica de tipos que junto a la validación estática que ofrece ts, nos cubre bastante bien ante errores de tipado o contratos.
- Cambiar de empaquetador de [react-scripts] webpack a vite, tiene mejor performance y es mas sencillo de configurar.
- Cambiar de jest a vitest, jest junto a jsdom, trae problemas a la hora de integrarlo con otras herramientas modernas como el msw.

## Test submission

Please, submit this test as a new repository (a fork or a new one) in any free platform you want (bitbucket, gitlab, github, ..)
