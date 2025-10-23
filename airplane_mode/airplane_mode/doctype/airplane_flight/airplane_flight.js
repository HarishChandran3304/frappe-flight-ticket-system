// Copyright (c) 2025, Harish and contributors
// For license information, please see license.txt

frappe.ui.form.on("Airplane Flight", {
    setup(frm) {
        // Set query for crew_member in child table
        frm.fields_dict["crew_members"].grid.get_field("crew_member").get_query = function(doc) {
            if (!frm.doc.airplane) {
                frappe.msgprint("Please select an Airplane first.");
                return false;
            }

            // Get the airline linked to the airplane (sync-safe way)
            let airline = null;
            frappe.call({
                method: "frappe.client.get_value",
                args: {
                    doctype: "Airplane",
                    filters: { name: frm.doc.airplane },
                    fieldname: "airline"
                },
                async: false, // make it synchronous so it finishes before returning filters
                callback: function(r) {
                    if (r.message) airline = r.message.airline;
                }
            });

            if (!airline) {
                frappe.msgprint("No airline found for the selected airplane.");
                return false;
            }

            return {
                filters: { airline: airline }
            };
        };
    }
});

