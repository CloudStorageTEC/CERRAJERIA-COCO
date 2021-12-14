Ext.require([
    'Ext.plugin.Viewport'
]);

var header = '<header class="main">' +
    '<figure style="display: inline" >' +
    '<img class="cabe paraTraslado" src="MEDIA/cabecera.png" border="0"/>' +
    '</figure>' +
    '<h1 id="titu"> Cerrajeria "COCOTLE 2" </h1>' +
    '</header>';

var nav = '<nav class="main-nav">' +
    '<div class="sombra">' +
    '<div class="container container--flex">' +
    '<span class="icon-menu" id="btnmenu"></span>' +
    '<ul class="menu" id="menu">' +
    '<li class="menu__item"><a href="index.php" class="menu__link" id="mnuinicio">INICIO</a></li>' +
    '<li class="menu__item"><a href="sesion.php" class="menu__link" id="mnusesion">INICIAR SESI&Oacute;N</a></li>' +
    '<li class="menu__item"><a href="registro.php" class="menu__link" id="mnuregistro">REGISTRARSE</a></li>' +
    '<li class="menu__item"><a href="catalogo.php" class="menu__link" id="mnucatalogo">VER SERVICIOS</a></li>' +
    '<li class="menu__item"><a href="ctrlPHP/ctrlLogout.php" class="menu__link" id="mnusalir">SALIR</a></li>' +
    '</ul>' +
    '</div>' +
    '</div>' +
    '</nav>';


var main = '<main>' +
    '<section id="sct1">' +
    '</section>' +
    '</main>';

var footer = '<footer class="main-footer">' +
    'Aviso Legal. Las imagenes de la pagina son propiedad de Cerrajeria Cocotle 2, y se muestran con prop&oacutesito acad&eacutemico.' +
    '<address>' +
    'Responsables del proyecto: Alberto Cocotle Castro, Diaz Rojas Ruben Navany y Erick Cansino Rosas. Instituto Tecnol&oacute;gico de Orizaba.' +
    '</address>' +
    '</footer>';



Ext.application({
    name: 'Cerrajeria COCOTLE 2',
    launch: function() {
        var frame = Ext.create('Ext.container.Viewport', {
            padding: 5,
            layout: 'border',
            id: 'con',
            itemId: 'con',
            autoSize: false,
            defaults: {
                xtype: 'container',
                border: false
            },
            items: [{
                    html: header,
                    cls: 'header',
                    region: 'north',
                    height: '14%',
                    responsiveConfig: {
                        wide: {
                            height: '10em'
                        },
                        tall: {
                            height: 'auto'
                        }
                    }
                },
                {
                    html: nav,
                    xtype: 'panel',
                    cls: 'nav',
                    region: 'north',
                    width: '15%',
                    height: '8%',
                    responsiveConfig: {
                        wide: {
                            minHeight: '10em'
                        },
                        tall: {
                            minHeight: '5em'
                        }
                    }
                },
                {
                    html: main,
                    cls: 'main',
                    region: 'center',
                    id: 'main',
                    itemId: 'main',
                    scrollable: 'y',
                    listeners: {
                        afterrender: function() {
                            Ext.get('' + Ext.get('sct1').parent().getId() + '').appendChild({
                                xtype: 'container',
                                itemId: 'foot',
                                id: 'foot',
                                html: footer,
                                hidden: true,
                                cls: 'footer',
                                region: 'south'
                            }, true);
                            this.getScrollable().refresh(true);
                        }
                    }
                }
            ]
        });
    }
});

//Ajusta los menús de acuerdo a la sesión, la función se llama en cada ctrl de página
function ajustaMenu() {
    var NomFirmado = sessionStorage.getItem('NomFirmado');
    inicio = 'bienvenido.php';
    registro = 'menu_inhab';
    sesion = 'menu_inhab';
    catalogo = 'menu__link';
    salir = 'ctrlPHP/ctrlLogout.php';

    //Ajustar el menú de acuerdo a sesión
    if (NomFirmado === null || NomFirmado === '') {
        inicio = 'index.php';
        registro = 'menu__link';
        sesion = 'menu__link';
        catalogo = 'menu__link';
        salir = 'informacion.php';
        Ext.get('mnusalir').setText('INFORMACI\u00D3N');
    }

    //Asignar clases y direcciones a los menús
    Ext.get('mnuinicio').set({ href: inicio });
    Ext.get('mnusesion').set({ cls: sesion });
    Ext.get('mnuregistro').set({ cls: registro });
    Ext.get('mnucatalogo').set({ cls: catalogo });
    Ext.get('mnusalir').set({ href: salir });

}