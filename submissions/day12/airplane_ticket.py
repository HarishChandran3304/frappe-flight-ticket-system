# Copyright (c) 2025, Harish and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

from random import choice, randrange


class AirplaneTicket(Document):
	def calculate_total_amount(self):
		total_amount = int(self.flight_price) + sum(add_on.amount for add_on in self.add_ons)
		self.total_amount = total_amount
	
	def remove_deleted_add_ons(self):
		s = set()
		unique = []
		for add_on in self.add_ons:
			if add_on.item in s:
				self.add_ons.remove(add_on)
				continue
			s.add(add_on.item)
			unique.append(add_on)
		
		self.add_ons = unique
	
	def allocate_seat(self):
		self.seat = f"{randrange(1, 100)}{choice(["A", "B", "C", "D", "E"])}"
	

	def validate(self):
		self.calculate_total_amount()
		self.remove_deleted_add_ons()
	
	def before_submit(self):
		if self.status != "Boarded":
			frappe.throw("Only boarded tickets can be submitted")
	
	def before_insert(self):
		self.allocate_seat()