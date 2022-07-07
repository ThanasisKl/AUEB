#(a)
read.table('grades_2014_data.txt',header = TRUE, sep = '\t',stringsAsFactors = TRUE) -> data
success <- data$GRADE >= 5 
midterm <- data$MIDTERM
midterm[is.na(midterm)] <-0
new_data <- data.frame(cbind(success,midterm))
remove(success)
remove(midterm)
attach(new_data)
plot(midterm,success)
glm(success~midterm, family=binomial("logit")) ->m
x = seq(from = -1,to = 10, by = 0.2)
predict(m,newdata=data.frame(midterm=x),type='response')-> y
lines(x,y,col = 'red')

#(b)
predict(m,newdata=data.frame(midterm=5),type='response')

#(c)
summary(m)