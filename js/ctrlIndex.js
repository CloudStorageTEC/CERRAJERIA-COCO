Ext.require([
    'Ext.plugin.Viewport'
]);

Ext.onReady(function(){

  //Limpia la sesión
  sessionStorage.setItem('NomFirmado', '');
  sessionStorage.setItem('TipoFirmado', '');
	ajustaMenu();
  Ext.get("sct1").setHtml(
          '<div id="c-slider">'+
                '<div id="slider">'+
                    '<section>'+
                      '<img src="media/1.jpeg" alt="">'+
                    '</section>'+
                    '<section>'+
                      '<img src="media/2.jpeg" alt="">'+
                    '</section>'+
                    '<section>'+
                      '<img src="media/3.jpeg" alt="">'+
                    '</section>'+
                    '<section>'+
                      '<img src="media/4.jpeg" alt="">'+
                    '</section>'+
                '</div>'+
                '<div id="btn-prev">&#60;</div>'+
                '<div id="btn-next">&#62;</div>'+
        '</div>'+
          '<div class="columnas">'+
              '<h3 class="column__title">Conoce nuestros servicios</h3>'+
              '<p class="column__txt"> ¡SERVICIO RESIDENCIAL! Al igual que tú, sabemos que lo más importante es la seguridad de'+ 
              'los tuyos, de lo que amas, de tu hogar. Es por eso que la seguridad de tu familia, en el hogar, es nuestra'+
              ' prioridad. <br>'+
              'La confianza es nuestro pilar para ofrecerte nuestros servicios; para ello, nuestros técnicos están a su servicio'+
              'hasta la puerta de su hogar y contando con servicio las 24hrs. para aperturas los 365 días del año.'+
              '<br>¡SERVICIO AUTOMOTRIZ! Para tu medio de movilidad, la mejor seguridad con la mejor tecnología. Evolucionamos '+
              'la seguridad con la electrónica automotriz.'+
              'Nuestras tecnologías y herramientas nos permiten realizar llaves de todas las marcas de vehículos del mercado'+
              'y ofrecemos un servicio de 24hrs para aperturas automotrices los 365 días del año.'+
              '<br><br>¡SERVICIO COMERCIAL! Cuando se habla comercio la seguridad es el mejor negocio. Atención con calidad, rapidez'+
              ' y confianza a las puertas de sus instalaciones.'+
              'Nuestros técnicos cuentan con el perfil adecuado para prestar los servicios a industrias, inmobiliarias, bienes raíces'+
              ', aseguradoras y locales comerciales con los requerimientos de seguridad necesarios para llevar a cabo el desempeño de'+ 
              'sus actividades.</p>'+
          '</div>');

          //ajuste del footer para que se pueda desplazar hasta el final del section
          Ext.get('foot').show();

      });