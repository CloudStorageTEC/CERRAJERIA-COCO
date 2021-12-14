Ext.require([
    'Ext.plugin.Viewport'
]);
Ext.onReady(function() {

    ajustaMenu();
    Ext.get('sct1').setStyle({
        height: '' + (280) + 'px'
    });
    //Define modelo para tabla de acuerdo a lo que devuelve PHP
    Ext.define('Servicio', {
        extend: 'Ext.data.Model',
        fields: [
            { name: 'ClaveServ', type: 'int' },
            { name: 'Tipo', type: 'string' },
            { name: 'Descripcion', type: 'string' },
            { name: 'Precio', type: 'float' }
        ]
    });

    //Define modelo para el tipo de Servicio (se requiere para la lista desplegable)
    Ext.define('TipoPrd', {
        extend: 'Ext.data.Model',
        fields: [
            { name: 'NombreTipo', type: 'string' }
        ]
    });



    //Define almacenamiento para tipo de Servicios
    var tipoPrdStore = Ext.create('Ext.data.Store', {
        model: 'TipoPrd',
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: 'ctrlPHP/ctrlBuscarTipo.php?Opc=Tipo',
            reader: {
                type: 'json',
                rootProperty: 'data'
            },
            afterRequest: function(request, success) {
                tipoPrdStore.insert(0, { NombreTipo: 'Todos' })
            },
            listeners: {
                exception: function(proxy, response, operation, eOpts) {
                    Ext.Msg.alert(
                        'Aviso',
                        'Error al llamar al servidor'
                    );
                }
            }
        }
    });


    //Define almacenamiento de Servicios proveniente de PHP y usado en la tabla (grid)
    var ServiciosStore = Ext.create('Ext.data.Store', {
        storeId: 'ServicioStr',
        model: 'Servicio',
        buffered: false,
        autoLoad: false, //se carga a petición
        autoSync: false, //no requiere sincronizar vista y modelo (porque se hace en PHP)
        proxy: {
            type: 'ajax',
            url: 'ctrlPHP/ctrlBuscarServicios.php',
            reader: {
                type: 'json',
                rootProperty: 'data'
            },
            afterRequest: function(request, success) {

                //reconfiguracion de la pagina para que se pueden obervar todos los elementos de
                //la tabla 
                var rows = Ext.ComponentQuery.query("#tblServicios")[0].getView().getNodes();


                if (sessionStorage.getItem('NomFirmado') === '' || sessionStorage.getItem('TipoFirmado') === 'Administrador') {

                    var heightT = 25;
                    if (rows.length > 3) {
                        heightT = rows.length * 30;

                        Ext.get('sct1').setStyle({
                            height: '' + (heightT + 150) + 'px'
                        });

                    } else {
                        Ext.get('sct1').setStyle({
                            height: '' + (heightT + 250) + 'px'
                        });
                    }
                } else {
                    var heightT = 45;
                    if (rows.length > 3) {
                        heightT = rows.length * 50;

                        Ext.get('sct1').setStyle({
                            height: '' + (heightT + 150) + 'px'
                        });

                    } else {
                        Ext.get('sct1').setStyle({
                            height: '' + (heightT + 240) + 'px'
                        });
                    }
                }

                Ext.get('tblServicios').setStyle({
                    height: '' + heightT + 'px'
                });
                Ext.get('FormCat').setStyle({
                    height: '' + heightT + 'px'
                });
                Ext.get('tblServicios-body').setStyle({
                    height: '' + heightT + 'px',
                    overflow: 'visible'
                });
                Ext.get('FormCat-body').setStyle({
                    height: '' + heightT + 'px',
                    overflow: 'visible'
                });
                Ext.ComponentQuery.query("#main")[0].getScrollable().refresh(true);


            },
            listeners: {
                exception: function(proxy, response, operation, eOpts) {
                    Ext.Msg.alert(
                        'Aviso',
                        'Error al llamar al servidor'
                    );
                }
            }
        }
    });

    //Crea formulario que incluye una tabla
    var c = Ext.create('Ext.form.Panel', {
        title: 'Servicios disponibles por categoria',
        renderTo: Ext.get('sct1'),
        id: 'FormCat',
        bodyPadding: 5,
        overFlow: 'visible',
        width: '75%',
        itemId: 'frmConsArt',
        layout: {
            type: 'table',
            columns: '2',
            tableAttrs: {
                style: {
                    width: '100%'
                },
                cellpadding: '8px',
                cellspacing: '3px'
            }
        },
        items: [{
                xtype: 'combobox',
                columnWidth: 1,
                width: 250,
                fieldLabel: 'Tipo de Servicio',
                displayField: 'NombreTipo',
                valueField: 'NombreTipo',
                autoSelect: false,
                value: 'Todos',
                name: 'cmbTipo',
                id: 'cmbTipo',
                store: tipoPrdStore
            },
            {
                columnWidth: 1,
                xtype: 'button',
                width: 150,
                height: 25,
                text: 'Buscar',
                id: 'sbm2',
                itemId: 'sbm2',
                handler: function() {
                    var frm = this.up('form').getForm();

                    if (frm.isValid()) {
                        ServiciosStore.getProxy().url =
                            "ctrlPHP/ctrlBuscarServicios.php?TipoServ=" +
                            Ext.getCmp('cmbTipo').getValue();
                        ServiciosStore.load();
                    }
                }
            }, {
                xtype: 'grid',
                store: ServiciosStore,
                id: 'tblServicios',
                disableSelection: true,
                colspan: 2,
                width: '100%',
                columns: [{
                        text: 'Id',
                        width: 45,
                        sortable: false,
                        hideable: false,
                        dataIndex: 'ClaveServ'
                    },
                    {
                        text: 'Tipo',
                        width: 100,
                        sortable: false,
                        hideable: false,
                        dataIndex: 'Tipo',
                        id: 'cellTipo'
                    },
                    {
                        text: 'Descripcion',
                        width: 310,
                        sortable: false,
                        hideable: false,
                        dataIndex: 'Descripcion',
                        id: 'cellDescripcion'
                    },
                    {
                        text: 'Precio',
                        width: 100,
                        sortable: false,
                        hideable: false,
                        id: 'cellPrecio',
                        dataIndex: 'Precio'
                    },
                    {
                        text: 'Agregar',
                        width: 170,
                        sortable: false,
                        hideable: false,
                        dataIndex: 'ClaveServ',
                        id: 'cellAdd',
                        renderer: function(value) {
                            return '<input type="image" id=' + value + ' value=0 src="media/add.png" class="cat" name="add">'
                        }
                    },
                    {
                        text: 'Eliminar',
                        width: 170,
                        sortable: false,
                        dataIndex: 'ClaveServ',
                        hideable: false,
                        id: 'cellDel',
                        renderer: function(value) {
                            return '<input type="image" id=' + value + ' value=0 src="media/del.png" class="cat" name="add">'
                        }
                    }
                ]
            }
        ]
    });

    //ajuste de la tabla para los tipos de usuarios
    if (sessionStorage.getItem('NomFirmado') === '' || sessionStorage.getItem('NomFirmado') === null) {
        Ext.ComponentQuery.query('#cellPrecio')[0].destroy();
        Ext.ComponentQuery.query('#cellDel')[0].destroy();
        Ext.ComponentQuery.query('#cellAdd')[0].destroy();
        Ext.ComponentQuery.query('#cellTipo')[0].setWidth(350);
        Ext.ComponentQuery.query('#cellDescripcion')[0].setWidth(430);

    }

    if (sessionStorage.getItem('TipoFirmado') === 'Administrador') {
        Ext.ComponentQuery.query('#cellDel')[0].destroy();
        Ext.ComponentQuery.query('#cellAdd')[0].destroy();
        Ext.ComponentQuery.query('#cellTipo')[0].setWidth(110);
        Ext.ComponentQuery.query('#cellDescripcion')[0].setWidth(270);
        Ext.ComponentQuery.query('#cellPrecio')[0].setWidth(370);
    }


    //ajuste del footer para que se pueda desplazar hasta el final del section
    c.setStyle({
        margin: 'auto',
        marginTop: '50px'
    });
    Ext.get('foot').show();
});