# TI4 - Fan App(?)

Pose para entender lee: <https://medium.com/@gethylgeorge/using-socket-io-in-react-redux-app-to-handle-real-time-data-c0e734297795>
Explica como trabaja redux con socket io

# Server - Backend

Hay que agregar el login (deje el template anterior que tenia un ejemplo hasta con fb) y registro.

Modificar los sockets events para lo que necesitamos:

 - Listar todas las partidas.
 - Meter user a una partida
 - Eleccion de raza (podemos hacer constantes json con toda la data de cada raza con una estructura entendible asi mosca o guido las cargan [Lo mismo para las tecnologias]): Necesit que me devuelvas una lista con todas las razas: {nombre} y todas las tecnologias: {id,nombre, dependencias, color, racial}.
 - Para este momento el usuario ya esta linkeado a la partida (por lo que hasta que no se cierre la partida la tiene como current) y a una raza en esa partida.
 - Adquisicion de tecnologias


Para levantar el server:
```sh
$ npm run server

```

Para levantar la web y el server
```sh
$ npm run server+cliente

```

Events incoming:
 - Games:
    - listGames
    - createGame
    - joinGame
    - claimUser
 - Game:
    - chooseRace
    - chooseTechnology
    - attackOn
    - finishBattle
    - addModifier
    - gameFinish

events outgoing:
 - Games:
    - listGames
    - createGame
    - userJoined ( devuele id del user )
 - Game:
    - userRace
    - chooseTecnology
    - attackOn - ( solo notificacion )
    - finishBattle
    - addModifier
    - gameFinish


# Para v1 esta bien creo.
