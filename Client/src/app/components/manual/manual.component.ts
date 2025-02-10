import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from '../dialog/dialog.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
    selector: 'app-manual',
    standalone: true,
    templateUrl: './manual.component.html',
    styleUrls: ['./manual.component.css'],
    imports: [CommonModule, NavbarComponent, DialogComponent]
})
export class ManualComponent {
  role: 'admin' | 'user' | null = null; // Para controlar la selección de rol

  itemsAdmin = [
    { title: '¿Qué es el Manual de Usuario?', content: 'El Manual de Usuario es una guía que te ayudará a entender cómo usar la aplicación de manera sencilla y rápida. En él encontrarás instrucciones detalladas sobre cómo navegar por las diferentes secciones, cómo realizar tareas específicas, y cómo aprovechar todas las funciones que la aplicación tiene para ofrecer. Además, el manual incluye soluciones a problemas comunes que puedan surgir, como cómo solucionar un error o qué hacer si algo no funciona como esperabas.' },
    { title: 'Inicio de Sesión', content: 'La vista de Inicio de Sesión permite al administrador acceder a la aplicación mediante su número de socio, nombre y contraseña. Para iniciar sesión, completa los campos de "Número de Socio", "Nombre" y "Contraseña". Si la contraseña es incorrecta, revisa que esté bien escrita; si hay datos incompletos, asegúrate de completar todos los campos antes de intentar iniciar sesión. Si el usuario no está registrado como administrador, usa un perfil con privilegios de administrador o habilita un nuevo socio como administrador.' },
    { title: 'Reportes', content: 'La sección de Reportes permite a los administradores publicar información relevante sobre el club o el estado del lago para su navegabilidad. Al ingresar, se mostrará automáticamente el clima en vivo sin necesidad de acción. Para publicar un reporte, el administrador debe haber iniciado sesión, escribir el mensaje en el campo habilitado y hacer clic en el botón de publicar. Los mensajes se muestran en orden cronológico, con el más reciente al inicio,  cada uno incluye la fecha y hora de su publicación. Se pueden eliminar o editar mensajes mediante las opciones disponibles a la derecha de cada uno. Si el clima no se carga correctamente, verifica la conexión a Internet (la falta de este elemento no afecta el funcionamiento de la sección). Para publicar mensajes, asegúrate de que no superen los 1000 caracteres, que ninguna palabra tenga más de 25 letras seguidas y que el mensaje no esté vacío, de lo contrario, los errores se mostrarán en pantalla.' },
    { title: 'Historia', content: 'La sección de Historia del Club permite a los usuarios conocer la trayectoria y evolución del club a lo largo de los años. Las únicas acciones a realizar son en la barra superior de navegación para volver hacia atrás.' },
    { title: 'Barra de Navegación', content: 'La barra de navegación de la aplicación proporciona una forma sencilla y rápida de moverse entre las diferentes secciones del sitio. En la barra, encontrarás un ícono de una casita, que te permitirá regresar a la página principal de la aplicación en cualquier momento. Además, está disponible un ícono de un libro, el cual te llevará al manual de usuario, donde podrás encontrar instrucciones detalladas sobre cómo utilizar la aplicación correctamente. En caso de que necesites volver a la página anterior, la aplicación es completamente compatible con la funcionalidad del navegador, por lo que puedes utilizar el botón de "volver atrás" sin ningún problema.' },
    { title: 'Menú de Administración', content: 'La sección de Menú Administrador es una interfaz simple que da acceso a las funciones de administración del sistema, con cuatro botones principales: Socios, Pagos, Reportes y Resumen. Al iniciar sesión como administrador, serás redirigido automáticamente al menú. Desde allí puedes seleccionar una sección para gestionar la información de los socios, administrar los pagos o acceder a los reportes para publicar anuncios. Si no puedes acceder al menú, asegúrate de haber iniciado sesión correctamente como administrador. En caso de que los botones no respondan, revisa tu conexión a Internet o recarga la página. Si el problema persiste, intenta más tarde o contacta a los desarrolladores del sistema.' },
    { title: 'Gestión de Socios', content: 'La sección de Gestión de Socios permite administrar la información de los socios. En la tabla se muestran los datos básicos de los socios y su estado de cuota, con 5 registros por página. Para buscar un socio, ingresa el DNI de 8 dígitos y presiona Buscar; para ver todos los registros nuevamente, presiona Refrescar. Puedes gestionar socios eliminándolos (ícono de tacho de basura, confirmando la acción), modificando sus datos (ícono de lápiz) o viendo su información completa (ícono de ojo). Para crear un nuevo socio, haz clic en el botón Nuevo Socio.' },
    { title: 'Gestión de Pagos', content: 'La sección de Gestión de Socios permite administrar la información de los socios. En la tabla se muestran los datos básicos de los socios y su estado de cuota, con 5 registros por página. Para buscar un socio, ingresa el DNI de 8 dígitos y presiona Buscar; para ver todos los registros nuevamente, presiona Refrescar. Puedes gestionar socios eliminándolos (ícono de tacho de basura, confirmando la acción), modificando sus datos (ícono de lápiz) o viendo su información completa (ícono de ojo). Para crear un nuevo socio, haz clic en el botón Nuevo Socio. Una vez dentro del historial de un usuario, tienes la opción de enviarle un email completando el campo correspondiente y presionando el botón Enviar Email. Además, puedes seleccionar un registro del historial y, al presionar el botón Generar Comprobante, obtendrás un archivo PDF con el comprobante correspondiente.' },
    { title: 'Creación de Usuario', content: 'La sección de Creación de Usuario permite registrar nuevos usuarios completando un formulario con datos obligatorios. Para usar la vista, completa los siguientes campos: Nombre (mínimo 3 caracteres), Apellido (mínimo 3 caracteres), Email (formato válido con @), Contraseña (mínimo 6 caracteres, con opción de alternar visibilidad mediante un ícono de ojo), Fecha de Nacimiento (posterior a la fecha actual, se puede escribir o seleccionar mediante un calendario), y DNI (exactamente 8 caracteres numéricos). Una vez completados correctamente todos los campos y sin errores visibles, presiona el botón Crear Usuario. Si algún campo está en rojo, revisa los mensajes de error específicos debajo de cada campo, como "El nombre debe tener al menos 3 caracteres" o "La contraseña debe tener al menos 6 caracteres". Si no puedes crear el usuario, verifica que todos los campos estén correctamente completados y sin errores. Si el calendario no se despliega, recarga la página o revisa tu conexión a Internet.' },
    { title: 'Informes', content: 'En esta sección se muestra el balance diario del cobro de pagos, donde puedes ver el número de socio, número de pago, fecha, método de pago y monto correspondiente a cada transacción. Además, se incluye un botón para *Volver Atrás*, que te permite regresar a la vista anterior.' },
  ];

  itemsUser = [
    { title: '¿Qué es el Manual de Usuario?', content: 'El Manual de Usuario es una guía que te ayudará a entender cómo usar la aplicación de manera sencilla y rápida. En él encontrarás instrucciones detalladas sobre cómo navegar por las diferentes secciones, cómo realizar tareas específicas, y cómo aprovechar todas las funciones que la aplicación tiene para ofrecer. Además, el manual incluye soluciones a problemas comunes que puedan surgir, como cómo solucionar un error o qué hacer si algo no funciona como esperabas.' },
    { title: 'Inicio de Sesión', content: 'Esta sección a los socios iniciar sesión en la aplicación utilizando su número de socio, nombre y contraseña. Para utilizarla, primero debes completar el campo "Número de Socio", luego ingresar tu "Nombre" y finalmente escribir tu "Contraseña". Es importante que todos los campos estén completos para poder acceder correctamente. En caso de que encuentres problemas, te presentamos algunas soluciones comunes: si la contraseña es incorrecta, verifica que hayas ingresado la contraseña asignada correctamente; si no logras acceder, te esperamos en el club para restablecerla. Si los campos están incompletos, asegúrate de completarlos antes de intentar iniciar sesión. Si aún no estás registrado, te invitamos a acercarte al club para realizar el proceso de registro y obtener acceso a la plataforma.' },
    { title: 'Reportes', content: 'En la sección de Reportes, la información climática se carga automáticamente al entrar en la vista, sin que el usuario necesite realizar ninguna acción. Los mensajes se presentan en orden cronológico, comenzando con el más reciente y finalizando con el más antiguo. Para ver más mensajes, solo necesitas desplazarte hacia abajo.' },
    { title: 'Historia', content: 'La sección de Historia del Club permite a los usuarios conocer la trayectoria y evolución del club a lo largo de los años. Las únicas acciones a realizar son en la barra superior de navegación para volver hacia atrás.' },
    { title: 'Barra de Navegación', content: 'La barra de navegación de la aplicación proporciona una forma sencilla y rápida de moverse entre las diferentes secciones del sitio. En la barra, encontrarás un ícono de una casita, que te permitirá regresar a la página principal de la aplicación en cualquier momento. Además, está disponible un ícono de un libro, el cual te llevará al manual de usuario, donde podrás encontrar instrucciones detalladas sobre cómo utilizar la aplicación correctamente. En caso de que necesites volver a la página anterior, la aplicación es completamente compatible con la funcionalidad del navegador, por lo que puedes utilizar el botón de "volver atrás" sin ningún problema.' },
    { title: 'Información y Estado de Cuenta', content: 'La sección de Información y Estado de Cuenta permite a los socios ver su información personal y el estado de su cuota. Esta vista sólo es accesible después de haber iniciado sesión. Al ingresar, podrás ver tus datos personales actualizados, como nombre, número de socio, etc. Si necesitas actualizar tu información, contacta al club para realizar los cambios necesarios. Podrás consultar el estado de tu cuota, el cual puede indicar que estás al día si no debes el mes corriente, en mora si tienes pagos pendientes (1 mes), o inactivo si tu cuenta ha sido desactivada debido a falta de pago (3 meses). En caso de que el estado de tu cuota no se haya actualizado o no lo pueda visualizar correctamente, revisa tu historial de pagos o contacta con el club. ' },
  ];

  selectedItem: { title: string; content: string } | null = null;

  openDialog(item: { title: string; content: string }) {
    this.selectedItem = item;
  }

  closeDialog() {
    this.selectedItem = null;
  }

  selectRole(role: 'admin' | 'user') {
    this.role = role; // Establece el rol seleccionado
  }
}