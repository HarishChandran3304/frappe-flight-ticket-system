# Copyright (c) 2025, Harish and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class FlightPassenger(Document):
	def get_full_name(self):
		return f"{self.first_name} {self.last_name or ''}".strip()
	
	def before_save(self):
		self.full_name = self.get_full_name()
		
