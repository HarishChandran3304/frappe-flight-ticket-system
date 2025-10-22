import frappe
from random import choice, randrange

def get_seat():
    seat = f"{randrange(1, 100)}{choice(['A', 'B', 'C', 'D', 'E'])}"
    return seat

def execute():
    try:
        tickets = frappe.db.get_all("Airplane Ticket")
        for ticket in tickets:
            frappe.db.set_value("Airplane Ticket", ticket.name, "seat", get_seat())
        
        frappe.db.commit()
    
    except Exception as e:
        frappe.db.rollback()
        frappe.throw(e)