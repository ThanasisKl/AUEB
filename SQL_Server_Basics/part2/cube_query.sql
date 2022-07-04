/*Γράψτε μια επερώτηση σε γλώσσα SQL το αποτέλεσμα της οποίας είναι η δημιουργία ενός 
κύβου που αναλύει κάποια μέτρηση με βάση τρείς διαστάσεις. 
a. Εξηγείστε τι περιέχει το καθε κελί του κύβου. 
b. Γράψτε όλα τα group by που περιέχει ο κύβος.*/

select country, campName,category, sum(unitCost*overnights*persons) as total_cost
from Booking, Camp, Seat, Country
where Booking.campCode = Camp.campCode and Booking.catCode = Seat.catCode and Country.cId = Booking.cID
group by cube(country, campName,category);