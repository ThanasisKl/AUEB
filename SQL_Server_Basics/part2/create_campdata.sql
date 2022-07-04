CREATE TABLE campdata(
    custID int,
    fname varchar(30),
    Iname varchar(30),
    cID int,
    country varchar(30),
    bookID int,
    bookDate date,
    campCode char(3),
    campName Varchar(50),
    empno int,
    catCode char(1),
    category varchar(20),
    unitCost numeric(4,2),
    startDate date,
    overnights int,
    persons int
);

BULK INSERT campdata
FROM 'C:\Users\thana\OneDrive\Συνημμένα\Υπολογιστής\CAMPDATA\CAMPDATA.TXT' 
WITH (FIRSTROW =2, FIELDTERMINATOR='|', ROWTERMINATOR = '\n');
