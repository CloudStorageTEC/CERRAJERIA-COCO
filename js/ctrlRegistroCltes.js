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
        title: 'Formulario de registro',
        renderTo: Ext.get('sct1'),
        bodyPadding: 7,
        width: '70%',
        anchor: '100%',
        url: 'ctrlPHP/ctrlRegistroCltes.php',
        layout: {
            type: 'table',
            columns: '2',
            tableAttrs: {
                style: {
                    width: '100%'
                },
                cellpadding: '8px',
                cellspacing: '8px'
            }
        },
        fieldDefaults: {
            labelWidth: 120,
            labelStyle: {
                font: 'bolder'
            }
        },
        standardSubmit: false, //como es falso entonces es llamada parcial
        defaultType: 'textfield', //todos los controles son inputText a menos que diga lo contrario
        items: [{
                fieldLabel: 'Nombre completo',
                name: 'txtNom',
                allowBlank: false,
                emptyText: 'Juan Perez',
                regex: /^[^1234567890¡!¿?@#%()=+-,]*$/,
                invalidText: 'Los nombres solo tienen letras'
            },
            {
                fieldLabel: 'Password',
                name: 'txtPss',
                allowBlank: false,
                emptyText: 'AB123abc22/XZ1234xyz90',
                invalidText: 'la contrase\u00F1a no es segura',
                validator: function(val) {
                    return val.length <= 25 ? true : "Maximo 80 caracteres";
                }
            },
            {
                fieldLabel: 'Codigo postal',
                name: 'txtCP',
                allowBlank: false,
                emptyText: '94476',
                regex: /^(\d{5})$/,
                invalidText: 'ingrese un C.P valido'
            },
            {
                fieldLabel: 'Telefono celular',
                id: 'telC',
                name: 'txtTelC',
                allowBlank: true,
                regex: /^[\d]*$/,
                emptyText: '1234567890',
                invalidText: 'Los n\u00D1meros solo tienen digitos',
            },
            {
                fieldLabel: 'Email',
                name: 'txtEml',
                emptyText: 'algo@algo.algo',
                regex: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
                allowBlank: false,
                invalidText: 'No tiene formato de email'
            },
            {
                xtype: 'textarea',
                fieldLabel: 'Direcci&oacute;n',
                name: 'txtDic',
                allowBlank: false,
                emptyText: 'Avenida N entre calle N Y N,Municipio, Estado.',
                validator: function(val) {
                    return val.length <= 80 ? true : "Maximo 80 caracteres";
                }
            }
        ],
        buttons: [{
            text: 'Enviar',
            id: 'sbm2',
            itemId: 'sbm2',
            handler: function() {
                var frm = this.up('form').getForm();

                if (frm.isValid()) {
                    // Envío, viaja de forma parcial por la configuración inicial
                    frm.submit({
                        success: function(form, action) { //Función en caso de éxito

                            Ext.get('sct1').setHtml(
                                '<section  id="bienvenido" class="cuadro">' +
                                '<div id="respuesta">' +
                                '<p><h8 style="text-align: center">¡Felicidades tu registro ha sido exitoso!</h8></p>' +
                                '</div>' +
                                '</section>'
                            );

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
        marginTop: '25px'
    });

});