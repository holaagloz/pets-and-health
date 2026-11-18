# Gloz Vet · Landing de demostración (Studio Gloz)

Sitio de muestra de Studio Gloz para presentarle a veterinarias el tipo de página que podemos hacer. **Gloz Vet es una clínica ficticia:** el nombre, el logo y los datos son de ejemplo. Nació como propuesta para otra clínica y el 18 de noviembre de 2026 se quitó todo lo que la identificaba. Está construida sobre la **dirección de arte 4 «Recreo»**.

- **Contacto de la demo:** todos los botones de WhatsApp y teléfono van al 6265-2841 de Studio Gloz, así que quien los pruebe nos escribe a nosotros. Instagram [@studiogloz](https://www.instagram.com/studiogloz/) y web [studiogloz.com](https://www.studiogloz.com).
- **Ubicación de ejemplo:** Ciudad Quesada, San Carlos, Costa Rica.
- **Se mantuvieron** los servicios, el horario, los lemas, la Pets Card, las fotos y los marcadores amarillos, porque muestran cómo quedaría la página con contenido real.

Para verla, abre `index.html` en Chrome. Para verla como en un celular: clic derecho › Inspeccionar › ícono de celular (arriba a la izquierda del panel) › iPhone SE o 375 px.

## Qué hay en la carpeta

| Archivo o carpeta | Qué es |
|---|---|
| `index.html` | La página. Cada sección empieza y termina con un comentario `<!-- ===== Nombre (inicio) ===== -->`, así se pueden mover sin romper nada. |
| `css/recreo.css` | Colores, letras y diseño. Los colores están arriba de todo, en `:root`. La primera parte es la de la hoja 4, tal cual; desde el comentario «Página completa» empiezan las secciones nuevas. |
| `js/recreo.js` | Movimiento: la entrada de la portada (pelota, dálmata y gata), el latido, los textos que saltan, el menú, la barra fija del celular y los enlaces de WhatsApp. |
| `img/` | Fotos, logo redibujado, `favicon.svg`, `apple-touch-icon.png` (180 px) y `og-gloz-vet.jpg` (1200 × 630, la tarjeta que se ve al compartir el enlace). |
| `fonts/` | Gabarito, la letra de la página, guardada dentro del proyecto. |
| `vendor/` | Librerías de animación: GSAP 3.13.0 (con ScrollTrigger y SplitText) y Lenis 1.3.11. |
| `direccion-de-arte-4.html` | La hoja aprobada. No se toca: es la referencia. |
| `index-direccion-3.html` | La landing anterior (dirección 3 «Marea que late»), guardada por si se quiere comparar. Usa `css/estilos.css` y `js/main.js`. |

## Secciones, en orden

| # | Sección | Qué muestra | Gesto de movimiento | Botón |
|---|---|---|---|---|
| — | Navegación | Logo, Emergencias 24/7 y WhatsApp. En escritorio, cinco enlaces (Servicios, Hotel & Daycare, Estética, Horario, Preguntas); en celular, un botón de menú. Al bajar se vuelve una barra azul marino. | — | — |
| 1 | Portada | Igual a la hoja 4: la pelota rebota en «peluditos», el dálmata llega, juega y se sienta de frente. | La firma de la hoja 4. | Agendá tu cita |
| 2 | Trayectoria y atajos | «Más de 12 años…», datos clave y la tarjeta «Todo en un solo lugar» con seis íconos que llevan a cada servicio. | El subrayado menta se dibuja. | Atajos a cada sección |
| 3 | Salud | Seis servicios en una «historia clínica» (portapapeles), cada uno con su botón. Sigue Diagnóstico (rayos X, ultrasonido y laboratorio) y «Y los michis, también.» con la foto del gato. | La pelota dibuja el latido en el monitor; los garabatos del gato se dibujan. | Agendá (por servicio) · Agendá un examen · Agendá para tu michi |
| 4 | Emergencias 24/7 | La noche, con la gata dormida y la luna. | Las «z» flotan. | Llamar al 6265-2841 |
| 5 | Hotel & Daycare | Una casita con el perro café asomándose, el sello «Canino Real» y las ocho comodidades. | Las tarjetas se pegan como stickers. | Agendá su estadía |
| 6 | Estética y grooming | El poodle rompe el papel de la tarjeta, con burbujas dibujadas. | Las burbujas se dibujan. | Agendá su baño |
| 7 | Te lo ponemos fácil | Transporte, trámites de viaje, vacunas a domicilio y la Pets Card. | La Pets Card flota. | Pedí tu Pets Card |
| 8 | Ya son de la familia | Los nombres de pacientes en placas como las del collar, el equipo y el testimonio (con marcadores). | — | — |
| 9 | Tu cita en tres latidos | Los tres pasos, en escalera. | — | Agendá tu cita |
| 10 | Preguntas frecuentes | Siete dudas con respuestas basadas en datos reales. | La cruz gira al abrir. | Preguntar por WhatsApp |
| 11 | Horario y contacto | El horario en grande (con el dálmata asomándose), la dirección con «Cómo llegar» y los contactos. | El dálmata ladea la cabeza al pasar el mouse. | Agendá tu cita |
| 12 | Pie | Logo, lema, secciones, contacto y aviso de sitio de demostración. | La pelota del lema late. | — |

En celular aparece una **barra fija** con «Agendá tu cita» y un botón de emergencias cuando la portada queda arriba. Se esconde al llegar a Contacto.

## Qué editar fácil

- **Textos:** directamente en `index.html`, dentro de cada sección.
- **Mensajes de WhatsApp:** cada botón tiene su mensaje en el atributo `data-msj="..."`. Cambia ese texto y listo: `js/recreo.js` arma el enlace al abrir la página. El enlace escrito en `href` es el respaldo por si el JavaScript falla; si cambias un mensaje, idealmente actualiza también ese `href` (o pídele a Claude que lo regenere).
- **Número de WhatsApp:** en `js/recreo.js`, la constante `WA` (`50662652841`, con el 506 de Costa Rica), y en los `href` del HTML.
- **Fotos:** en WebP (un formato de imagen liviano), dentro de `img/`. Reemplázalas con el mismo nombre y proporción, o cambia el `src` en el HTML:
  - `gato-recorte.webp` (gatos) es un recorte con fondo transparente, el mismo de la hoja 4.
  - `perro-chocolate-*.webp` (hotel) y `poodle-papel-*.webp` (estética) conservan su fondo blanco: el CSS los mezcla con el hielo de la tarjeta (`mix-blend-mode: multiply`), así que se ven recortados sin serlo. Al poodle se le subió el blanco del fondo a blanco puro para que no se note el borde de la foto.
  - Las fotos originales están en `referencias/remplazo/`.
- **Colores:** en `css/recreo.css`, al inicio (`:root`).
- **Cambios de CSS o JS ya publicados:** sube el número `?v=` (hoy `recreo.css?v=1` y `recreo.js?v=1`) en las dos líneas de `index.html` que los cargan. Así los navegadores no muestran la versión vieja guardada (eso se llama caché).

## Dirección de arte (valores técnicos)

- **Colores:** azul rey `#0668D0` (fondo de toda la página), hielo `#F1F5FB` (personajes, títulos y tarjetas), marino `#021C4C` (trazo de los dibujos y letra sobre claro), hondo `#062F75` (sombra de sticker), menta `#3ED2BC` (la pelota y lo que se toca), menta clara `#A9F7F0` (brillos y hover), azul clínico `#0882E8` (garabatos y subrayados). Marcadores en amarillo `#FFE45C`.
- **Contrastes (calculados con la fórmula WCAG):** hielo sobre azul rey 4.9:1; marino sobre hielo 15.1:1; marino sobre menta (el botón) 8.8:1; menta clara sobre marino 13.5:1. Todos pasan AA para texto normal.
- **Letra:** Gabarito variable (400–900), con `clamp()` para que crezca con la pantalla. Titulares en 900 con interletra de −0.035 a −0.055 em.
- **Trazo y sombra:** borde marino de 2.5 px y sombra sólida de 7 px hacia abajo (`--sombra`). Los dibujos tiemblan con un filtro `feTurbulence` que cambia de semilla unas 7 veces por segundo.
- **Movimiento:** curvas `back.out(1.5–2.6)` (entradas de sticker), `expo.out` y `elastic.out(1, .38)` (rebotes); duración base 0.7 s, escalonado 0.055 s; scroll suave Lenis con `lerp 0.1`.
- **Radios:** 30 / 22 / 14 px y botones redondos.
- **Funciona sin JavaScript y con «Reducir movimiento»:** todo se ve completo y quieto, y el dálmata aparece directamente sentado (revisado en Chrome).

## De dónde sale cada dato

Los servicios, el horario y los textos salieron de la propuesta original. El nombre Gloz Vet, la ubicación y el contacto son de Studio Gloz; no queda ningún dato de la clínica original. Los nombres de mascotas de «Ya son de la familia» (Canela, Rocky, Luna, Max, Nala y Toby) son de ejemplo.

### Logo

`img/logo/` tiene el logo Gloz Vet en cuatro versiones: `logo.svg` con fondo de sticker, `logo-lema.svg`, `logo-oscuro.svg` y `logo-oscuro-lema.svg`. Usa la misma composición, colores (marino `#00204A`, turquesa `#2FB3AC`, blanco) y estetoscopio que el redibujo anterior, con la letra Anton convertida en curvas.

## Decisiones de diseño

1. **Navegación nueva:** se agregaron enlaces a las secciones en la barra de arriba (escritorio, desde 1100 px) y un botón de menú en celular. Es el único cambio visible en la portada de la hoja 4.
2. **Atajos «Todo en un solo lugar»:** es la fila de íconos de la hoja 4, ahora con enlaces a cada sección, para que la persona encuentre rápido lo que busca.
3. **Fotos:** el gato va en Salud, en el bloque de michis (igual que en la hoja 4); el perro café con blanco, en Hotel & Daycare; y el poodle que rompe el papel, en Estética, porque se ve recién arreglado.
4. **Estética** quedó como sección propia (antes compartía sección con el hotel), para que tenga su propio enlace en el menú.
5. **Íconos nuevos dibujados** con el mismo trazo para cirugía (hueso con curita), terapia física (patita), dermatología (lupa), odontología (diente), farmacia (frasco), viajes (avión de papel) y los pasos de la cita.
6. **Gatos:** los servicios del bloque «Y los michis, también.» son los generales de la clínica; confirmar que todos aplican a gatos.
7. **Vacunas a domicilio** y **«Fotos y reportes del día» en el hotel** salen de publicaciones; confirmar que siguen vigentes.
8. **Verbos de botón:** el principal es siempre «Agendá tu cita»; por contexto se usan «Agendá su estadía», «Agendá su baño», «Agendá un examen», «Agendá para tu michi», «Pedí tu Pets Card» y «Llamar al 6265-2841» para emergencias.
9. **Los nombres de mascotas** son de ejemplo.
10. **La Pets Card dibujada** es una ilustración propia, no su tarjeta real.
11. **«Más de 12 años»** es un dato de ejemplo.
12. **La página no se indexa en Google** (`noindex`) porque es una demostración.

## Pendientes (marcadores amarillos y material que falta)

- [FOTO REAL DEL EQUIPO]
- [NOMBRES, CARGOS Y CÓDIGOS DEL COLEGIO DE MÉDICOS VETERINARIOS]
- [TESTIMONIO REAL DE CLIENTE, CON SU PERMISO] y [NOMBRE DEL CLIENTE Y DE SU PELUDITO]
- [BENEFICIOS REALES DE LA PETS CARD]
- [ZONAS Y TARIFA DEL TRANSPORTE]
- [PRECIO O RANGO DE LA CONSULTA, SI LO QUIEREN PUBLICAR]
- **Fotos:** el gato, el perro café con blanco y el poodle vienen de referencias de Pinterest. Se dejaron porque es una demostración; si la página se adapta para una clínica real, hay que reemplazarlas por fotos propias o con licencia.
- Al publicar: dominio propio, cambiar `noindex` por `index`, poner las direcciones completas (`https://…`) en `og:image` y agregar `canonical` y `og:url`.

## Cómo publicar

El sitio se publica en GitHub Pages (https://holaagloz.github.io/pets-and-health/) con `.github/workflows/pages.yml` cada vez que se sube un cambio a `main`. Solo se publican `index.html`, `css/`, `js/`, `vendor/`, `fonts/` e `img/`. Para que el enlace no diga "pets-and-health", hay que renombrar el repositorio en GitHub y actualizar `og:image` y `og:url` en `index.html`.
