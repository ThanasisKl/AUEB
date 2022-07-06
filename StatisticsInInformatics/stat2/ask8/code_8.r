> read.table("survey_data_2020.txt",header=TRUE,sep='\t',stringsAsFactors = TRUE)-> data
> attach(data)
> men_height <- height[sex=="M"]
> women_height <- height[sex=="F"]
> men_height <- na.omit(men_height) 
> women_height <- na.omit(women_height)
> edit(men_height) -> men_height 
> t.test(men_height,women_height)
 Welch Two Sample t-test

data:  men_height and women_height
t = 8.9921, df = 64.907, p-value = 5.177e-13
alternative hypothesis: true difference in means is not equal to 0
95 percent confidence interval:
 0.09846512 0.15469278
sample estimates:
mean of x mean of y 
 1.793158  1.666579 

> t = -qt(0.025, min(length(men_height)-1,length(women_height)-1))
>  mean(men_height) - mean(women_height)-> mean_
> (sd(men_height) * sd(men_height))/length(men_height) -> sd1
> (sd(women_height) * sd(women_height))/length(women_height) -> sd2
>  mean_ + c(-1,1) * t * sqrt(sd1+sd2)
[1] 0.09805689 0.15510101

> men_grades = prob[sex =="M" ]
> women_grades = prob[sex =="F" ]
> men_grades <- na.omit(men_grades)
> women_grades <- na.omit(women_grades)
> edit(men_grades) -> men_grades
> edit(women_grades)-> women_grades
> t.test(men_grades,women_grades,alternative ="greater")

        Welch Two Sample t-test

data:  men_grades and women_grades
t = -1.1841, df = 71.526, p-value = 0.8798
alternative hypothesis: true difference in means is greater than 0
95 percent confidence interval:
 -1.239088       Inf
sample estimates:
mean of x mean of y 
 6.323529  6.838235 


