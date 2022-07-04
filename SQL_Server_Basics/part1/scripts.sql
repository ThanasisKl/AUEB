----------------------EXERCISE 1 ----------------------------------------------------------
--QUESTION 1
checkpoint
dbcc dropcleanbuffers

set statistics io on

select title from movies where pyear between 1990 and 2000

select pyear, title from movies where pyear between 1990 and 2000

select title, pyear from movies where pyear between 1990 and 2000
order by pyear, title

--INDEX
create index ask1_1 on movies(pyear, title);
--DROP INDEX
drop index ask1_1 on movies;

--QUESTION 2
checkpoint
dbcc dropcleanbuffers

set statistics io on

select mid, count(rating)
from user_movies group by mid order by mid

select userid, count(rating)
from user_movies group by userid order by userid

--INDEX
create index ask1_2 on user_movies(mid, rating);
--DROP INDEX
drop index ask1_2 on user_movies;


----------------------EXERCISE 2 ----------------------------------------------------------

--QUESTION 1
checkpoint
dbcc dropcleanbuffers

set statistics io on

--ORIGINAL QUERY
select title 
from movies, movies_genre 
where movies.mid=movies_genre.mid and genre='Adventure'
UNION
select title 
from movies, movies_genre 
where movies.mid=movies_genre.mid and genre ='Action'

--MY QUERY
select distinct title 
from movies, movies_genre 
where movies.mid=movies_genre.mid and (genre='Adventure' or genre='Action');

--INDEXES
create clustered index ask2_1_1 on movies_genre(genre);
drop index ask2_1_a on movies_genre;

create index ask2_1_2 on movies(title);
drop index ask2_1_2 on movies;

--QUESTION 2
checkpoint
dbcc dropcleanbuffers

set statistics io on

--MY QUERIES:

--41819 rows affected
select distinct movies.mid 
from movies,roles
where movies.mid = roles.mid and movies.mid not in(
    select mid
    from actors,roles
    where gender ='F' and actors.aid = roles.aid);

--QUERY 1: 41819 rows affected
select title 
from movies
where mid in(
    select distinct movies.mid 
    from movies,roles
    where movies.mid = roles.mid and movies.mid not in(
        select mid
        from actors,roles                             
        where gender ='F' and actors.aid = roles.aid));

--QUERY 2: 41819 rows affected
select title 
from movies
where mid in(
    select distinct movies.mid  
    from movies, roles, actors  
    where movies.mid=roles.mid and actors.aid=roles.aid and gender = 'M'  
    except  
    select distinct movies.mid   
    from movies, roles, actors   
    where movies.mid=roles.mid and actors.aid=roles.aid and gender = 'F');

--INDEXES
create  index ask2_2_1 on actors(gender);

create  index ask2_2_2 on movies(title);

create  index ask2_2_3 on roles(mid);

create  index ask2_2_4 on roles(aid);

--DROP INDEXES
drop index ask2_2_1 on actors;

drop index ask2_2_2 on movies;

drop index ask2_2_3 on roles;

drop index ask2_2_4 on roles;



----------------------EXERCISE 3 ----------------------------------------------------------
--QUESTION 1
checkpoint dbcc dropcleanbuffers

set statistics io on

select movies.mid,title,firstName
from movies,actors,roles
where movies.mid = roles.mid and actors.aid = roles.aid and mrank > 9
order by movies.mid;

--INDEX1
create index ask3_1_1 on roles(mid);
--DROP INDEX1
drop index ask3_1_1 on roles;

--INDEX2
create index ask3_1_2 on actors(firstName);
--DROP INDEX2
drop index ask3_1_2 on actors;

--QUESTION 2
checkpoint
dbcc dropcleanbuffers

set statistics io on

select users.userid,uname,avg(rating)
from users, user_movies
where users.userid = user_movies.userid
group by users.userid,uname;

--INDEX
create index ask3_1_2 on user_movies(userid,rating);
--DROP INDEX
drop index ask3_1_2 on user_movies;