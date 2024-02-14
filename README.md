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
- En la rama main los test pasan

##### Code review stoppers
- El nombre de los archivos, se debe revisar y respetar la convencion que se tenga en el equipo. ex: buildings_list.js y buildingList.css.
- Agrupar los archivos por componentes, ex: el componente buildings_list deberia estar definido en una carpeta que contenga todos los elementos que lo definen como css, docs, stories, jsx/tsx, specs/test, etc. “el codigo que cambia junto, deberia mentenerse junto”.
- Hay varios archivos/codigo sin utilizar. Lo que deje de ser util se le prede fuego. ex: app.css, style.js
- Evitaria aplicar estilos de forma global, entiendo que la libreria ant pueda tener algunas restricciones, pero dejaria esta opcion como ultimo recurso. ex: index.css
- Potencial callbackHell en el useEffect de bookmarks_list, a vuelo de pajaro se podria remplazar por async/await, para mejorar la legibilidad y para mejorar la estructura tal vez convenga delegar la responsabilidad de esa logica a un modules especifico.

##### Fixs
- Subir la version de node en la definicion del contenedor web de 13 a 18.
- Hay varios warnnings reportados por eslint al momento de traspilar la aplicacion, son simples de solucionar.
- Arreglar la confiuracion de los test (jest) estan rotos en main.

#### How you would make this application maintainable and scalable. Write here all the steps you would take.


## Test submission

Please, submit this test as a new repository (a fork or a new one) in any free platform you want (bitbucket, gitlab, github, ..)
