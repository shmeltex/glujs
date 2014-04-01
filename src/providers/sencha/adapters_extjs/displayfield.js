/*
 * Copyright (C) 2012 by CoNarrative
 */
/**
 * @class glu.extjs.adapters.displayfield
 * @author Mike Gai
 * @extends glu.provider.adapters.field
 */
glu.regAdapter('displayfield', {
    extend : 'field',
    valueBindings:{
        setComponentProperty:function (value, oldValue, options, control) {
            control.setValue(value);
            control.value = control.getValue();
        }
    },
    /**
     * @cfg {Boolean/String} tooltip
     * *One-way binding*
     * Updates the tooltip of the field.
     */
    tooltipBindings:{
        setComponentProperty:function (newValue, oldValue, options, control) {
            if (newValue !== oldValue) {
                control.tip.update(newValue);
            }
        },
        onInit:function (binding, control) {
            //initialize with proper valid markings--must be done AFTER RENDER...
            control.on('render', function () {
                if(control.tip == null) {
                    control.tip = Ext.create('Ext.tip.ToolTip', {
                        target: control.getEl(),
                        html: control.tooltip
                    });
                }
            }, this, {
                single: true
            });
            control.on('render', function () {
                //AND after it has REALLY rendered
                glu.provider.adapters.displayfield.tooltipBindings.setComponentProperty(control.tooltip, '', {}, control);
            }, this, {
                delay: 1
            });
        }
    }
});