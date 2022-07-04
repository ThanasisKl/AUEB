insert into Customer
select distinct custID, fname, Iname
from campdata;

insert into Country
select distinct cID, country
from campdata;

insert into Camp
select distinct campCode, campName
from campdata;

insert into Seat
select distinct catCode, category, unitCost
from campdata;

insert into Booking
select bookID, bookDate, custID, cID, campCode, catCode, empno, startDate, overnights, persons
from campdata;