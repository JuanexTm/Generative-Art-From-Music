# Arte Generativo

## Ideación e introducción de conceptos

### ¿Qué es lo procedural?

> Lo procedural se refiere a la creación de contenido mediante la definición de un conjunto de reglas, parámetros y algoritmos que guían el proceso de generación. Este enfoque se utiliza en diversos campos, desde la generación de gráficos por computadora hasta la producción de música y la creación de arte digital.
> 

Alrededor de esto han surgido proyectos de todo tipo al tratarse de procesos que ahorran tiempo al desarrollador en cualquier tipo de proyecto que pretenda hacer. Ejemplos de su uso son:

- Generación de mapas, modelos o historia para videojuegos de forma aleatoria (Minecraft, No Man’s Sky, Shadows Of Doubt).
- Creación de efectos visuales para películas o videojuegos.
- Modelado 3D generativo para Blender, Maya o Houdini.
- Composición musical generativa basada en algoritmos.
- Generación de imágenes y obras de arte usando algoritmos y reglas matemáticas.

Es este último en el que se hará énfasis.

### ¿Qué es el arte generativo?

> El arte generativo es una forma de expresión artística que se basa en la creación de obras mediante la utilización de sistemas o procesos algorítmicos. En lugar de depender exclusivamente de la mano del artista, el arte generativo involucra la participación de reglas, algoritmos, o sistemas computacionales para generar arte de manera automática o semi-automática. Estos sistemas pueden variar desde simples scripts hasta complejos modelos de inteligencia artificial.
> 

En los últimos años han surgido múltiples modelos que se han encargado de permitir que cualquier persona pueda crear obras de arte generativo desde la comodidad de su hogar a partir de información de entrada conocida como *prompt*, el cual puede ser un texto, un sonido o una imagen.

Intenté aplicar el concepto alrededor de un proyecto relacionado al entretenimiento; un concierto donde las personas pudieran tener participación en el show sin que la experiencia se viera interrumpida. A partir de esta idea ¿Qué podría usar para realizar el montaje de un proyecto generativo para un evento en vivo? **Pensé que podía aprovechar esta tecnología para hacer que los usuarios que se encuentren en el concierto pudieran usar sus teléfonos para enviar prompts y generar imágenes generativas que funcionaran como efectos visuales dentro del show del artista**.

### TouchDesigner

Decidí recurrir a TouchDesigner, es una plataforma de desarrollo visual y creación de efectos visuales en tiempo real. Desarrollado por Derivative, es ampliamente utilizado en una variedad de campos como arte interactivo, instalaciones multimedia, diseño de escenarios, visualización de datos, y mucho más. Permite a los usuarios crear experiencias interactivas por medio de su lenguaje de programación basado en nodos.

Para sacar adelante el proyecto, fue necesario resolver dos problemas:

- ¿Cómo se generarían las imágenes?
- ¿Cómo harían las personas para enviar un prompt?

---

<aside>
<img src="https://www.notion.so/icons/photo-landscape_purple.svg" alt="https://www.notion.so/icons/photo-landscape_purple.svg" width="40px" /> **Generación de imágenes**

</aside>

La mejor forma de solucionar esto fue usando inteligencia artificial, tendría que encontrar un modo de correr un modelo dentro de TouchDesigner para la generación de imágenes a partir de texto, es ahí cuando la opción fue recurrir a un API.

### ¿Qué es un API?

> Un API (Interfaz de Programación de Aplicaciones) es un conjunto de reglas y herramientas que permite a diferentes aplicaciones comunicarse entre sí. Funciona como un intermediario que define cómo interactuar con un software o servicio específico, permitiendo que otras aplicaciones utilicen sus funciones y datos de manera controlada y segura. Todo por medio de códigos usualmente escritos en Python.
> 

TouchDesigner es un programa montado en base a Python, por lo que es posible montar scripts escritos en Python y ponerlos a interactuar con los distintos nodos que tiene la aplicación, dicho esto, la opción de usar el API de una inteligencia artificial generativa open source es posible y permitiría la generación de imágenes en tiempo real. Así que decidí recurrir a una de las IAs más conocidas del momento en generación de imágenes; **Stable Diffusion**.

## Stable Diffusion

Stable Diffusion es un modelo de inteligencia artificial (IA) que se destaca por su capacidad para generar imágenes fotorrealistas a partir de prompts. Stable Diffusion cuenta con muchas ventajas:

- Es un modelo versátil que permite distintos tipos de inputs como prompts entre los que destacan:
    - Texto → Imagen
    - Imagen → Imagen
    - Imagen → Video
- Es capaz de crear imágenes con niveles de realismo elevados.
- Es de código abierto, permitiendo que cualquiera pueda acceder, modificar y mejorar el modelo.

Siendo esta última característica la que más importancia podría tener en el proyecto, más adelante se explicará cómo se logra la integración del API del programa para poder generar imágenes desde un código de Python dentro de TouchDesigner.

<aside>
<img src="https://www.notion.so/icons/share_purple.svg" alt="https://www.notion.so/icons/share_purple.svg" width="40px" /> **Envío de prompts**

</aside>

Ahora el problema es la comunicación con el usuario, ¿cómo podrían los usuarios enviar prompts? Para esto es posible recurrir a un WebSocket, un canal de comunicación abierto que permita la conexión durante todo el tiempo que dure el show.

## WebSocket

Imagina que querer mantener una conversación por teléfono, pero en lugar de colgar y volver a llamar cada vez que quieres decir algo, la llamada se mantiene abierta todo el tiempo que dura la conversación. Eso es lo que hacen los WebSockets:

> Mantener una conversación fluida y sin interrupciones estableciendo una conexión que permite el intercambio de datos en tiempo real sin la necesidad de constantes solicitudes y respuestas.
> 

Este intercambio de datos se da gracias a la interacción entre un servidor y un cliente, el servidor actúa como un intermediario, facilitando la comunicación entre los clientes conectados. Cuando un cliente envía un mensaje, el servidor lo retransmite a todos los demás clientes conectados al chat.

De esta manera, todos reciben los mensajes de forma instantánea, creando una experiencia de chat fluida, al conectar una página web (cliente 1) con el programa en TouchDesigner (cliente 2) sería posible permitir el flujo de datos entre estos dos, y así hacer llegar los prompts al API de Stable Diffusion.

---

# Cómo usar el programa

## Instalaciones

1. Inicialmente es necesario clonar el repositorio donde se encuentran todos los archivos del proyecto.
    - Para clonar un repositorio solo hace falta copiar el url de la página y pasarlo por algún software de manejo de control de versiones como:
        - Git Bash.
        - Github Desktop.
        - GitKraken.
2. Al ser TouchDesigner el programa que va a servir de puente entre el WebSocket y Stable Diffusion, hace falta haber instalado alguna de las versiones más recientes del software desde la página oficial del programa.
    
    Luego es necesario iniciar el programa ***“Stable Diffusion + WebSocket.toe”***, aquí se encuentra toda la lógica del programa.
    
3. Para el funcionamiento del WebSocket de forma local en el computador donde se vaya a ejecutar el programa, es necesario tener instalado Node.js, un framework de javascript que es el encargado del montaje del programa.
    - Desde la página oficial de Node.js es posible descargar la última versión del framework, luego solo hay que instalarla dentro del computador.
    - Estando **dentro de la carpeta del proyecto**, hay que abrir la terminal y ejecutar los siguientes comandos:
        
        ```python
        # Este es para instalar la librería Node Package Manager, librería necesaria
        # para tener el paquete que nos permita acceder a WebSockets
        npm install
        
        # Este ejecutará el comando necesario para iniciar el código index.js que
        # controla el WebSocket, de este modo el servicio quedará activo
        npm start
        ```
        

## Cómo acceder a Stable Diffusion

Al estar usando el API de Stable Diffusion no hace falta hacer ninguna instalación, pero es necesario crear una cuenta de Stability para poder acceder al servicio del API y para obtener un **Key**.

Los Keys dentro de las APIs funcionan como pases únicos que te dan acceso a los recursos y funcionalidades de una API, suelen ser cadenas de caracteres únicas que se asocian a una cuenta específica. Cuando utilizas una API, necesitas incluir tu clave API en la solicitud para que el servidor pueda verificar tu identidad y concederte acceso.

Es también una cuestión de seguridad, por lo que lo ideal es que nadie pueda acceder a la clave de tu cuenta, o tendrá acceso al API desde tu perfil y podrá usar los créditos gratuitos de generación que Stable Diffusion entrega por default con los que podrás generar una cantidad limitada de imágenes.

Pasos para conseguir el Key:

1. Desde la página de Stability AI podrás crear una cuenta.
2. Al acceder a tu perfil en la parte superior derecha de la página, podrás encontrar la sección de API Keys.
3. Dentro podrás copiar tu llave del API, en caso de no tener ninguna, en la misma ventana puedes crear una, copiala y guardala en un lugar seguro.
4. Dentro del programa de TouchDesigner, vas a encontrar dos nodos principales: base_stable_diffusion y WebSocket.
    - Dale click al nodo base_stable_diffusion y en la arte superior derecha se abrirán las propiedades del nodo.
    - Dentro de las propiedades verás dos pestañas: Stable Diffusion API | Key. Abre la pestaña Key.
    - Dentro de la pestaña habrá un espacio de texto, pega tu llave del API ahí, de esta forma ya tendrás Stable Diffusion funcionando dentro del programa.

En la pestaña Stable Diffusion API podrás personalizar las respuestas que obtendrás de la AI:

- **Prompt:** Es un campo de texto donde es posible escribir un prompt para generar una imagen, es importante que este prompt **esté escrito en inglés** o el programa no va a reconocer lo que se le pide, sin embargo, no deberías escribir nada dentro del campo o desconfigurarías la conexión que tiene con los mensajes de llegada del WebSocket, por lo que solo envía prompts desde allí, más abajo se explicará cómo.
- **Resolution:** Aquí podrás definir la resolución de las imágenes expresada en pixeles.
- **Cfg Scale:** Es la “fuerza” del modelo, al aumentar hará que las imágenes generadas sean más creativas y abstractas, en caso de ser un valor más bajo generará imágenes más realistas y cercanas al prompt.
- **Steps:** Determina el número de iteraciones que realizará el modelo para generar la imagen. Un mayor número de steps dará como resultado imágenes más refinadas y detalladas, pero también tardará más tiempo en generarse.
- **Number of images:** Serán la cantidad de imágenes que van a generarse por prompt.
- **Image Output Directory:** En este campo puedes seleccionar la carpeta de tu pc donde quieras que se guarden todas las imágenes que genere el programa.

Finalmente hay un botón que se encarga de activar el API, puedes pulsarlo para generar algo, pero de todos modos está sincronizado para activarse cuando se envía un prompt desde el WebSocket.

## Cómo entrar al WebSocket

Una vez instalado y activado el WebSocket, solo hace falta entrar a la página web que tiene activada para enviar mensajes.

1. Tendrás que dirigirte a cualquier buscador web que prefieras.
2. Dentro de este, deberás escribir en la sección de URLs lo siguiente: 127.0.0.1:3000
3. Esto significa que estás conectandote a la IP 127.0.0.1 desde el puerto 3000, todo esto está definido desde los scripts del WebSocket que instalaste al clonar el repositorio.
4. Una vez dentro de la página, verás un campo de texto y un botón de enviar, en el campo de texto podrás escribir el prompt que deseas generar, recuerda que es importante que el prompt sea **escrito en inglés**, y al dar al botón enviar, se generará la imagen desde Stable Diffusion, podrás ver la imagen desde la previsualización de TouchDesiger o buscando en la carpeta que seleccionaste como destino para el API.
5. Adicionalmente, podrás conectarte al WebSocket desde cualquier otro equipo distinto al local **siempre y cuando estén conectados en la misma red de internet**, para esto tendrás que cambiar la IP del URL en el buscador del equipo externo por la IP del computador local (computador donde se esté ejecutando el programa y el WebSocket). De la siguiente forma: IpLocal:3000.
    - Podrás ver la IP local en las propiedades de red del PC.