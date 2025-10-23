// Copyright (c) 2025, Harish and contributors
// For license information, please see license.txt

frappe.ui.form.on('Airport Shop', {
    // This event fires when the form is loaded
    onload: function(frm) {

        // Set a query filter on the 'shop_type' link field
        frm.set_query('shop_type', function() {
            return {
                filters: {
                    'enabled': 1 // 1 means true (checked)
                }
            };
        });

    }
});