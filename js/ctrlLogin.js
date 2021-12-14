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
    //Formulario tipo panel
    var f = Ext.create('Ext.form.Panel', {
        title: 'Inicio de sesi&oacute;n ',
        renderTo: Ext.get('sct1'),
        bodyPadding: 7,
        width: '50%',
        height: 175,
        //x: 235,
        url: 'ctrlPHP/ctrlLogin.php',
        layout: {
            type: 'table',
            columns: '1',
            tableAttrs: {
                style: {
                    width: '100%'
                },
                cellpadding: '8px'
            }
        },
        standardSubmit: false, //como es falso entonces es llamada parcial
        defaultType: 'textfield', //todos los controles son inputText a menos que diga lo contrario
        items: [{

                fieldLabel: 'Email',
                name: 'txtEmailUsu',
                emptyText: 'Obligatorio',
                regex: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
                allowBlank: false,
                invalidText: 'No tiene formato de email'
            },
            {
                fieldLabel: 'Password ',
                name: 'txtPwdUsu',
                allowBlank: false,
                emptyText: 'Obligatorio'
            }
        ],
        buttons: [{
            text: 'Enviar',
            id: 'sbm',
            itemId: 'sbm',
            handler: function() {
                var frm = this.up('form').getForm();

                if (frm.isValid()) {
                    // Envío, viaja de forma parcial por la configuración inicial
                    frm.submit({
                        success: function(form, action) { //Función en caso de éxito
                            //Guarda información de sesión en cliente
                            sessionStorage.setItem('NomFirmado',
                                action.result.data.NombreCompleto);
                            sessionStorage.setItem('TipoFirmado',
                                action.result.data.Tipo);

                            Ext.get('sct1').setHtml(
                                '<section id="bienvenido" class="cuadro">' +
                                '<h5>Hola <span id="paraTipo">' + action.result.data.Tipo + ' </span>' +
                                '<span id="paraNombre">' + action.result.data.NombreCompleto + '</span></h5>' +
                                '</section>'
                            );

                            Ext.get('mnuinicio').set({ href: "bienvenido.php" });
                            Ext.get('mnusesion').set({ cls: 'menu_inhab' });
                            Ext.get('mnuregistro').set({ cls: 'menu_inhab' });
                            Ext.get('mnucatalogo').set({ cls: 'menu__link' });
                            Ext.get('mnusalir').set({ href: "ctrlPHP/ctrlLogout.php" });
                            Ext.get('mnusalir').setText('SALIR');


                        },
                        failure: function(form, action) { //Función en caso de error
                            Ext.Msg.alert('Error', action.result ? action.result.status : 'Sin respuesta');
                        }
                    });
                }
            }
        }]
    });
    //ajusta estilo css para centrar el grid
    f.setStyle({
        margin: 'auto',
        marginTop: '50px'
    });

});