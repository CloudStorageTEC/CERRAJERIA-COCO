Ext.require([
    'Ext.plugin.Viewport'
]);
Ext.onReady(function() {

    //Almacenar slider y botones en una varible
    var slider = Ext.get('slider');
    var siguiente = Ext.get('btn-next');
    var anterior = Ext.get('btn-prev');

    //Mover ultima imagen al pprincipio
    Ext.get(Ext.query('#slider section:last-child')[0]).insertBefore(Ext.get(Ext.query('#slider section:first-child')[0]));

    //Mostrar la primera magen coon un margen de -120%
    slider.setStyle({
        marginLeft: '-' + 120 + '%'
    });

    function moverD() {
        slider.animate({
            duration: 700,
            to: {
                marginLeft: 0
            },

            listeners: {
                afteranimate: function() {
                    Ext.get(Ext.query('#slider section:first-child')[0]).insertAfter(Ext.get(Ext.query('#slider section:last-child')[0]));
                    slider.setStyle({
                        marginLeft: '-' + 120 + '%'
                    });
                }
            }
        });
    }

    function moverI() {
        slider.animate({
            duration: 700,
            to: {
                marginLeft: 0
            },

            listeners: {
                afteranimate: function() {
                    Ext.get(Ext.query('#slider section:last-child')[0]).insertBefore(Ext.get(Ext.query('#slider section:first-child')[0]));
                    slider.setStyle({
                        marginLeft: '-' + 120 + '%'
                    });
                },
            }
        });
    }


    siguiente.on('click', function() {
        moverI();
    });

    anterior.on('click', function() {
        moverI();
    });
});