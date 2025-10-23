// Copyright (c) 2025, Harish and contributors
// For license information, please see license.txt

frappe.ui.form.on("Airplane Ticket", {
	refresh(frm) {
        // Custom button for seat assignment
        frm.add_custom_button("Assign Seat", () => {
            const fields = [
                {
                    label: "Seat Number",
                    fieldname: "seat_number",
                    fieldtype: "Data",
                    reqd: 1,
                }
            ];

            const dialog = new frappe.ui.Dialog({
                title: "Select Seat",
                fields: fields,
                primary_action_label: "Assign",
                primary_action: (data) => {
                    frm.set_value("seat", data.seat_number);
                    dialog.hide();
                }
            });

            dialog.show();
        }, "Actions");
	},

    flight: async function(frm) {
        // Reset gate when flight changes
        frm.set_value("gate", "");

        if (!frm.doc.flight) return;

        // Fetch source_airport from the linked flight
        const r = await frappe.db.get_value("Airplane Flight", frm.doc.flight, "source_airport");
        if (!r.message || !r.message.source_airport) {
            frappe.msgprint("Selected flight does not have a Source Airport.");
            return;
        }

        frm.source_airport_for_gate = r.message.source_airport;

        // Refresh the gate field to apply the filter
        frm.fields_dict["gate"].get_query = function() {
            return {
                filters: {
                    airport: frm.source_airport_for_gate
                }
            };
        };
    },

    setup(frm) {
        // Initially set a default query just in case
        frm.fields_dict["gate"].get_query = function(doc) {
            if (!frm.source_airport_for_gate) return {};
            return {
                filters: {
                    airport: frm.source_airport_for_gate
                }
            };
        };
    }
});
