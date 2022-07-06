#(a)
> read.table('grades_2014_data.txt',header = TRUE, sep = '\t',stringsAsFactors = TRUE) -> data
> attach(data)
> plot(MIDTERM,GRADE)
> m <- lm(GRADE~MIDTERM)
> abline(m,col = 'red')
> qqnorm(m$residuals)

#(b)
> confint(m)
                 2.5 %    97.5 %
(Intercept) -0.1862308 1.3374309
MIDTERM      0.7035840 0.9544545

#(c)
> summary(m)$coefficients
             Estimate Std. Error   t value     Pr(>|t|)
(Intercept) 0.5756001 0.38438110  1.497472 1.371607e-01
MIDTERM     0.8290192 0.06328825 13.099102 4.042767e-24
> t = 0.8290192 /0.06328825 
> 2*pt(-abs(t), df = 109)
[1] 4.042778e-24

#(d)
> predict(m,newdata = data.frame(MIDTERM = 7),interval = "confidence")
       fit      lwr      upr
1 6.378735 5.960928 6.796541
> b0<-m$coefficients[1]
> b1
  MIDTERM 
0.8290192 
> b1 = 0.8290192 
> b1*7+b0
(Intercept) 
   6.378734

#(e)
> predict(m,newdata = data.frame(MIDTERM = 7),interval = "prediction")
       fit      lwr      upr
1 6.378735 2.537905 10.21956
 
