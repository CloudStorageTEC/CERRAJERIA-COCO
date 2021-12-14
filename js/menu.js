Ext.require([
    'Ext.plugin.Viewport'
]);
Ext.onReady(function() {

    var btnMenu = Ext.get('btnmenu');
    var menu = Ext.get('menu');


    btnMenu.on('click', function() {
        'use strict';
        menu.toggleCls('mostrar');
    });
});