CREATE TABLE Country(
	cID int primary key,
	country varchar(30)
);

CREATE TABLE Camp(
	campCode char(3) primary key,
	campName Varchar(50)
);

CREATE TABLE Customer(
	custID int primary key,
	fname varchar(30),
	Iname varchar(30)
);

CREATE TABLE Seat(
	catCode char(1) primary key,
	category varchar(20),
	unitCost numeric(4,2)
);

CREATE TABLE Booking(
	bookID int ,
	bookDate date,
	custID int,
	cID int,
	campCode char(3),
	catCode char(1),
	empno int,
	startDate date,
	overnights int,
	persons int,
	foreign key(campCode) references Camp(campCode),
	foreign key(catCode) references Seat(catCode),
	foreign key(custID) references Customer(custID),
	foreign key(cID) references Country(cID),
	primary KEY(bookID,custID,cID,campCode,catCode,startDate,empno)
);