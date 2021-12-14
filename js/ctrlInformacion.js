Ext.require([
    'Ext.plugin.Viewport'
]);

Ext.onReady(function() {

    //Limpia la sesión
    sessionStorage.setItem('NomFirmado', '');
    sessionStorage.setItem('TipoFirmado', '');
    ajustaMenu();
    Ext.get("sct1").setHtml(
        '<div id="c-slider">' +
        '<div id="slider">' +
        '<section>' +
        '<img src="media/servicios.jpg" alt="">' +
        '</section>' +
        '</div>' +
        '</div>');

    //
    //Ext.get('c-slider').set({ style: 'height: auto;' });
    Ext.get('slider').set({ style: 'height: auto;' });
    Ext.get('slider').set({ style: 'width: auto;' });
    Ext.get('c-slider').set({ style: 'height: 100%;' });
    //ajuste del footer para que se pueda desplazar hasta el final del section
    Ext.get('foot').show();


});