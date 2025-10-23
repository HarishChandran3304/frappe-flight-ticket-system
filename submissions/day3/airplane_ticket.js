// Copyright (c) 2025, Harish and contributors
// For license information, please see license.txt

frappe.ui.form.on("Airplane Ticket", {
	refresh(frm) {
        frm.add_custom_button("Assign Seat", () => {
            const fields = [
                {
                    label: ("Seat Number"),
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
                    const seatNumber = data.seat_number;
                    frm.set_value("seat", seatNumber);

                    dialog.hide();
                }
            });

            dialog.show();
        }, "Actions");
	},
});