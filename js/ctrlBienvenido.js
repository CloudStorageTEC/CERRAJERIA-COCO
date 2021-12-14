Ext.require([
    'Ext.plugin.Viewport'
]);

Ext.onReady(function() {

    ajustaMenu();
    //añade el footer fijo
    Ext.ComponentQuery.query("#con")[0].add({
        xtype: 'container',
        itemId: 'foot2',
        id: 'foot2',
        html: footer,
        cls: 'footer2',
        region: 'south'
    });
    Ext.get('sct1').setHtml(
        '<div class="cuadro" style="display: block;">' +
        '<h4>Hola ' + sessionStorage.getItem('NomFirmado') + '</h4>' +
        '<h6>Ingresaste como ' + sessionStorage.getItem('TipoFirmado') + '</h6>' +
        '</div>');

});