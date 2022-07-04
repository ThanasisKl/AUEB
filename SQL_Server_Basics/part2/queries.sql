/*1. Εμφανίστε έναν κατάλογο με τους πρώτους εκατό καλύτερους πελάτες της 
εταιρείας. Ο κατάλογος θα περιέχει την χώρα, το ονοματεπώνυμο του υπεύθυνου
του τουριστικού γραφείου και την συνολική αξία των κρατήσεων που έχουν γίνει 
από το συγκεκριμένο τουριστικό γραφείο.*/

select top 100  country, fname, Iname,  sum(unitCost*overnights*persons) as total_cost
from Booking, Country, Customer, Seat
where Booking.custID = Customer.custID and Booking.cID = Country.cID and Booking.catCode = Seat.catCode
group by Booking.custID, country, fname, Iname 
order by total_cost desc;
----------------------------------------------------------------------------------------------------------------------------

/*2. Εμφανίστε ένα κατάλογο με την συνολική αξία των κρατήσεων κάθε κατασκήνωσης 
ανά κατηγορία θέσης για το έτος 2000 (Όνομα Κατασκήνωσης, Κατηγορία Θέσης, 
Αξία κρατήσεων).*/

select campName, category, sum(unitCost*overnights*persons) as total_cost
from Camp, Seat, Booking
where Camp.campCode = Booking.campCode and Seat.catCode = Booking.catCode and year(Booking.startDate) = 2000 
group by campName, category;
----------------------------------------------------------------------------------------------------------------------------

/*3. Εμφανίστε έναν κατάλογο με την συνολική αξία των κρατήσεων ανά κατασκήνωση 
σε μηνιαία βάση για το έτος 2018. */
 
select campName, month(Booking.startDate) as month_num, sum(unitCost*overnights*persons) as total_cost
from Camp, Seat, Booking
where Camp.campCode = Booking.campCode and Seat.catCode = Booking.catCode and year(Booking.startDate) = 2018
group by campName , month(Booking.startDate);
----------------------------------------------------------------------------------------------------------------------------

/*4. Η διοίκηση της εταιρείας θέλει μία αναφορά που θα περιέχει τις ακόλουθες 
πληροφορίες.
    a. Τον συνολικό αριθμό των ενοικιαστών
    b. Τον αριθμό των ενοικιαστών ανά έτος
    c. Τον αριθμό των ενοικιαστών ανά έτος και κατασκήνωση 
    d. Τον αριθμό των ενοικιαστών ανά έτος, κατασκήνωση και κατηγορίας 
       θέσης.
Γράψτε μια επερώτηση σε γλώσσα SQL η οποία να παράγει την παραπάνω 
αναφορά.*/

select count(custID) as total_customers, year(Booking.startDate) as year, campName, category
from Booking, Camp, Seat
where Booking.campCode = Camp.campCode and Booking.catCode = Seat.catCode
group by rollup(category, campName,  year(Booking.startDate));
----------------------------------------------------------------------------------------------------------------------------

/*5. Εμφανίστε τα ονόματα των κατασκηνώσεων που δέχθηκαν περισσότερους 
ενοικιαστές το έτος 2018 σε σχέση με το 2017. Για το συγκεκριμένο ερώτημα 
επιτρέπεται η δημιουργία όψεων.
*/

create view view_for_2017 as
select campName, count(custID) as total_customers
from Booking, Camp
where Booking.campCode = Camp.campCode and year(Booking.startDate) = 2017
group by campName;

create view view_for_2018 as
select campName, count(custID) as total_customers
from Booking, Camp
where Booking.campCode = Camp.campCode and year(Booking.startDate) = 2018
group by campName;

select view_for_2018.campName
from view_for_2017,view_for_2018
where view_for_2018.total_customers > view_for_2017.total_customers and view_for_2018.campName = view_for_2017.campName;
----------------------------------------------------------------------------------------------------------------------------