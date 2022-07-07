c(30.3,31.0,31.1,32.2,32.6,32.7,33.4,33.6,34.2,34.5)->x
fivenum(x)
c(0.0,0.0,0.2,0.8,1.2,1.4,3.2,4.2,6.4,9.0)->y
fivenum(y)
c(0, 1, 6, 8 ,10 ,13 ,15 ,16 ,17 ,17 ,18 ,18 ,20 ,20 ,21 ,25 ,26 ,30 ,35 ,39 ,40 ,41 ,43 ,44 ,46 ,48 ,52 ,54 ,58 ,59 ,59 ,60 ,66 ,81, 86 ,87,88,89,94,96)->z
fivenum(z)

qqnorm(x)
qqline(x)
qqnorm(y)
qqline(y)
qqnorm(z)
qqline(z)

hist(x,probability=TRUE,xlab="Δεδομένα 1",main="Ιστόγραμμα Δεδομένων 1")
density(x)->pdf_x
lines(pdf_x)
range(x)

x_1<-seq(30.3,34.5,0.1)
dnorm(x_1,mean=mean(x),sd=sd(x))->y
lines(x_1,y,col="red")

hist(y,probability=TRUE,xlab="Δεδομένα 2",main="Ιστόγραμμα Δεδομένων 2")
density(y)->pdf_y
lines(pdf_y)
range(y)

y_1<-seq(0,9,0.1)
dnorm(y_1,mean=mean(y),sd=sd(y))->y_
lines(y_1,y_,col="red")

hist(z,probability=TRUE,xlab="Δεδομένα 3",main="Ιστόγραμμα Δεδομένων 3")
density(z)->pdf_z
lines(pdf_z)
range(z)

x<-seq(0,96,1)
dnorm(x,mean=mean(z),sd=sd(z))->y
lines(x,y,col="red")

# DATA 1
c(30.3,31.0,31.1,32.2,32.6,32.7,33.4,33.6,34.2,34.5)->x
f <- ecdf(x)
mean(x)-> m
sd(x)-> s
f(m+s) - f(m-s)

f(m+2*s) - f(m-2*s)

f(m+3*s) - f(m-3*s)

pnorm(m+s,mean = m,sd = s)- pnorm(m-s,mean = m,sd = s)

pnorm(m+2*s,mean = m,sd = s)- pnorm(m-2*s,mean = m,sd = s)

pnorm(m+3*s,mean = m,sd = s)- pnorm(m-3*s,mean = m,sd = s)

# DATA 2
c(0.0,0.0,0.2,0.8,1.2,1.4,3.2,4.2,6.4,9.0)->y
f2 <- ecdf(y)
mean(y) -> m
sd(y) -> s
f2(m+s) - f2(m-s)

f2(m+2*s) - f2(m-2*s)

f2(m+3*s) - f2(m-3*s)

pnorm(m+s,mean = m,sd = s)- pnorm(m-s,mean = m,sd = s)

pnorm(m+2*s,mean = m,sd = s)- pnorm(m-2*s,mean = m,sd = s)

pnorm(m+3*s,mean = m,sd = s)- pnorm(m-3*s,mean = m,sd = s)

# DATA 3
c(0, 1, 6, 8 ,10 ,13 ,15 ,16 ,17 ,17 ,18 ,18 ,20 ,20 ,21 ,25 ,26 ,30 ,35 ,39 ,40 ,41 ,43 ,44 ,46 ,48 ,52 ,54 ,58 ,59 ,59 ,60 ,66 ,81, 86 ,87,88,89,94,96)->z
f3 <- ecdf(z)
mean(z) -> m
sd(z) -> s
f3(m+s) - f3(m-s)

f3(m+2*s) - f3(m-2*s)

f3(m+3*s) - f3(m-3*s)

pnorm(m+s,mean = m,sd = s)- pnorm(m-s,mean = m,sd = s)

pnorm(m+2*s,mean = m,sd = s)- pnorm(m-2*s,mean = m,sd = s)

pnorm(m+3*s,mean = m,sd = s)- pnorm(m-3*s,mean = m,sd = s)
