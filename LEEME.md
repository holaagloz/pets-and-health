# Pets & Health · Landing (propuesta)

Primera versión de la página web del Centro de Atención Veterinaria Pets & Health, construida sobre la **dirección de arte 3 «Marea que late»**, aprobada el 15 de noviembre de 2026. Es una muestra para presentarle a la clínica: tiene fotos y logo provisionales y marcadores amarillos donde faltan datos reales.

Para verla, abre `index.html` en Chrome. Para verla como en un celular: clic derecho › Inspeccionar › ícono de celular (arriba a la izquierda del panel) › iPhone SE o 375 px.

## Qué hay en la carpeta

| Archivo o carpeta | Qué es |
|---|---|
| `index.html` | La página. Cada sección empieza y termina con un comentario `<!-- ===== Nombre (inicio) ===== -->`, así se pueden mover sin romper nada. |
| `css/estilos.css` | Colores, letras y diseño. Los colores están arriba de todo, en `:root`. |
| `js/main.js` | Movimiento: la marea, el latido, los textos que suben, la barra fija del celular y los enlaces de WhatsApp. |
| `img/` | Fotos, logo redibujado, `favicon.svg`, `apple-touch-icon.png` (180 px) y `og-imagen.jpg` (1200 × 630, la tarjeta que se ve al compartir el enlace). |
| `fonts/` | Gabarito, la letra de la página, guardada dentro del proyecto. |
| `vendor/` | Librerías de animación: GSAP 3.13.0 (con ScrollTrigger y SplitText) y Lenis 1.3.11. |
| `direccion-de-arte-3.html` | La hoja aprobada. No se toca: es la referencia. |
| `revision-landing/` | Capturas de la última revisión en celular y escritorio. |

## Secciones, en orden

| # | Sección | Qué logra | Gesto de movimiento | Botón |
|---|---|---|---|---|
| 1 | Portada | Igual a la hoja 3. Único cambio: en celular el dálmata se ancla a la derecha y sale un poco por el borde, así el recorte de su oreja lo hace la pantalla y no la foto. | El monitor dibuja el filo, la marea sube, el perro emerge y el latido hace latir el botón. | Agendá tu cita |
| 2 | Trayectoria | «Más de 12 años cuidando peluditos en San Pedro» y los datos clave. | El título sube por líneas. | — |
| 3 | Salud | La carta clínica: seis grupos de servicios médicos, cada uno con su botón. Sigue el monitor de Diagnóstico (rayos X, ultrasonido y laboratorio) y cierra con «Y los michis, también.», el bloque de gatos. | Cada renglón se subraya con un latido que se dibuja; al pasar el mouse, late en menta. Sobre el gato late el eco de ultrasonido. | Agendá (por servicio) · Agendá para tu michi |
| 4 | Emergencias 24/7 | El titular más grande después de la portada, con un monitor que no para. | «24/7» sube letra por letra. | Llamar al 2253-4184 |
| 5 | Hotel y estética | La sección azul rey (el respiro de la página): Canino Real Hotel & Daycare y grooming. | La marea sube con el scroll y cambia la página a azul; las fotos se acercan despacio al entrar. | Agendá su estadía · Agendá su baño |
| 6 | Te lo ponemos fácil | Transporte, trámites de viaje, vacunas a domicilio y la Pets Card. | La Pets Card flota y se inclina con el mouse. | Pedí tu Pets Card |
| 7 | Ya son de la familia | Nombres reales de pacientes de sus historias de Instagram, equipo y testimonio (con marcadores). | Los nombres se destapan como una cortina de agua. | — |
| 8 | Tu cita en tres latidos | Qué pasa después de tocar el botón. | Tres latidos que se dibujan en orden. | Agendá tu cita |
| 9 | Preguntas frecuentes | Siete dudas con respuestas basadas en datos reales. | La cruz gira y se vuelve una equis. | Preguntar por WhatsApp |
| 10 | Contacto | Dirección, horario, teléfonos e Instagram. | La marea vuelve y su latido pasa por el botón. | Agendá tu cita |
| 11 | Pie | Logo, lema, secciones, contacto y créditos. | El filo del latido se dibuja. | — |

En celular aparece una **barra fija** con «Agendá tu cita» y un botón de emergencias cuando la portada queda arriba. Se esconde al llegar a Contacto.

## Qué editar fácil

- **Textos:** directamente en `index.html`, dentro de cada sección.
- **Mensajes de WhatsApp:** cada botón tiene su mensaje en el atributo `data-wa="..."`. Cambia ese texto y listo: `js/main.js` arma el enlace al abrir la página. El enlace escrito en `href` es el respaldo por si el JavaScript falla; si cambias un mensaje, idealmente actualiza también ese `href` (o pídele a Claude que lo regenere).
- **Número de WhatsApp:** en `js/main.js`, la constante `WA` (`50689101055`, con el 506 de Costa Rica) y en los `href` del HTML.
- **Fotos:** reemplaza los archivos de `img/` con el mismo nombre y proporción, o cambia el `src` en el HTML. Están en WebP (un formato de imagen liviano):
  - `dalmata-692.webp` (portada), `yorkie-recorte-*.webp` (estética) y `gato-recorte.webp` (gatos) son recortes con fondo transparente. La yorkie y el gato se recortaron con `rembg` (modelos BiRefNet, U2Net e ISNet) en la computadora, sin servicios externos.
  - `perro-chocolate-*.webp` (hotel) conserva su fondo blanco: el CSS lo mezcla con el hielo de la ventana (`mix-blend-mode: multiply`), así que se ve recortado sin serlo.
  - Las fotos originales están en `referencias/remplazo/`.
- **Colores:** en `css/estilos.css`, al inicio (`:root`).
- **Cambios de CSS o JS ya publicados:** sube el número `?v=` (hoy `estilos.css?v=6` y `main.js?v=3`) en las dos líneas de `index.html` que cargan `estilos.css` y `main.js`, así los navegadores no muestran la versión vieja guardada (eso se llama caché).

## Dirección de arte (valores técnicos)

- **Colores:** abismo `#010C26`, marino `#021C4C` (fondo), hondo `#062F75`, azul rey `#0668D0`, azul clínico `#0882E8`, menta `#3ED2BC` (acción), menta clara `#A9F7F0` (hover), hielo `#F1F5FB` (texto), huella `#B4C2D6` (texto secundario). Marcadores en amarillo `#FFE45C`.
- **Contrastes:** hielo sobre marino 15.1:1; huella sobre marino 9.1:1; huella sobre hondo 7.0:1; marino sobre menta (el botón) 8.8:1; hielo sobre azul rey 4.9:1. Todos pasan AA para texto normal.
- **Letra:** Gabarito variable (400–900), con `clamp()` para que crezca con la pantalla. Titulares en 900 con interletra de −0.04 a −0.055 em.
- **Movimiento:** curvas `power3.out` (entrada), `expo.out` (letras y marea), `sine.inOut` (flotado); duración base 1.15 s, escalonado 0.06 s; scroll suave Lenis con `lerp 0.08`.
- **Radios:** 32 / 24 / 16 px y botones redondos.
- **Funciona sin JavaScript y con «Reducir movimiento»:** todo se ve completo y quieto (revisado en Chrome).

## De dónde sale cada dato

Todo sale del Instagram @petshealthcr_veterinaria, revisado el 14 de noviembre de 2026 (`research/instagram-auditoria.md` y los textos de sus publicaciones): servicios, horario, dirección, WhatsApp, teléfono, «más de 12 años», Canino Real Hotel & Daycare (habitaciones, áreas verdes, piscina, juegos supervisados, atención veterinaria 24/7), terapia física con caminadora y láser, cirugía ortopédica, farmacia con pedidos express, marcas de alimento, la frase «Un peludito limpio es un peludito feliz… chineos», la Pets Card y los nombres de pacientes del destacado «Clientes». Los lemas «El lugar favorito de tus peluditos» y «El segundo hogar de tu mascota» son suyos.

## Por validar (decisiones que tomé y la clínica debe revisar)

1. **Dálmata en celular:** anclado a la derecha y saliendo unos píxeles por el borde, para que el recorte de la foto no se note. En escritorio no cambió.
2. **Orden de secciones y agrupación de servicios:** los servicios médicos se juntaron en seis renglones (por ejemplo, «Odontología y chequeo geriátrico»), y hotel y estética comparten la sección azul.
3. **Gatos:** confirmado que la clínica recibe gatos. Los servicios del bloque «Y los michis, también.» (consulta y vacunas, esterilización, laboratorio y rayos X, emergencias) son los generales de la clínica; confirmar que todos aplican a gatos.
4. **Vacunas a domicilio:** aparece en su auditoría de servicios; confirmar que sigue vigente.
5. **«Fotos y reportes del día» en el hotel:** sale de una publicación; confirmar.
6. **Verbos de botón:** el principal es siempre «Agendá tu cita»; por contexto se usan «Agendá su estadía», «Agendá su baño», «Agendá un examen», «Pedí tu Pets Card» y «Llamar al 2253-4184» para emergencias.
7. **Los nombres de pacientes** (Chocolate, Valentina, Yako, Maki, Hugo, Timón) salen de sus historias; pedir permiso a sus dueños antes de publicar.
8. **La Pets Card dibujada** es una ilustración propia, no su tarjeta real.
9. **«Más de 12 años»** es lo que dice la clínica; idealmente confirmar el año de apertura.
10. **Menú de escritorio:** se agregaron cinco enlaces a secciones (solo se ven en pantallas de 1100 px o más).
11. **La página no se indexa en Google** (`noindex`) mientras sea una propuesta.

## Pendientes (marcadores amarillos y material que falta)

- [FOTO REAL DEL EQUIPO]
- [NOMBRES, CARGOS Y CÓDIGOS DEL COLEGIO DE MÉDICOS VETERINARIOS]
- [TESTIMONIO REAL DE CLIENTE, CON SU PERMISO] y [NOMBRE DEL CLIENTE Y DE SU PELUDITO]
- [BENEFICIOS REALES DE LA PETS CARD]
- [ZONAS Y TARIFA DEL TRANSPORTE]
- [PRECIO O RANGO DE LA CONSULTA, SI LO QUIEREN PUBLICAR]
- Logo original en vector (el actual está redibujado a partir de una imagen de baja resolución).
- Fotos propias de la clínica y de sus pacientes (perros y gatos).
- **Derechos de las cuatro fotos:** el dálmata, el perro chocolate, la yorkie y el gato vienen de referencias de Pinterest, sin autor ni permiso. Sirven para la propuesta; antes de publicar hay que reemplazarlas o conseguir la licencia.
- Confirmar si `@petsandhealth.cr` y la página de Facebook «Pets And Health CR» son suyas para agregarlas.
- Al publicar: dominio propio, cambiar `noindex` por `index`, poner las direcciones completas (`https://…`) en `og:image` y agregar `canonical` y `og:url`.

## Cómo publicar (cuando la clínica apruebe)

1. Resolver los pendientes de arriba (o decidir publicar con marcadores).
2. Opción simple: [Netlify Drop](https://app.netlify.com/drop) con una cuenta gratuita y la sesión iniciada, arrastrando la carpeta con `index.html`, `css/`, `js/`, `img/`, `fonts/` y `vendor/`. Sin cuenta, el enlace es temporal.
3. Conectar el dominio de la clínica y probar el enlace en un chat de WhatsApp para ver la tarjeta para compartir.
