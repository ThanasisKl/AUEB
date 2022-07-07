#(a)
read.table('grades_2014_data.txt',header = TRUE, sep = '\t',stringsAsFactors = TRUE) -> data
attach(data)
plot(MIDTERM,GRADE)
m <- lm(GRADE~MIDTERM)
abline(m,col = 'red')
qqnorm(m$residuals)

#(b)
confint(m)

#(c)
summary(m)$coefficients

t = 0.8290192 /0.06328825 
2*pt(-abs(t), df = 109)


#(d)
predict(m,newdata = data.frame(MIDTERM = 7),interval = "confidence")

b0<-m$coefficients[1]
b1 = 0.8290192 
b1*7+b0

#(e)
predict(m,newdata = data.frame(MIDTERM = 7),interval = "prediction")

 
