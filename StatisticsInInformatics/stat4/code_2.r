> #(a)
> read.table('data.txt',header = TRUE, sep = '\t',stringsAsFactors = TRUE) -> data
> attach(data)
> levels(color)
[1] "black" "blue"  "red"  
> tabulate(color)
[1] 28 24 19
> detach(data)
> edit(data)-> data #height=176
> attach(data)
> plot(height~color)
> with(na.omit(data[,c("height","color")]),tapply(height,color,mean))
   black     blue      red 
1.757143 1.735652 1.766842 
> with(na.omit(data[,c("height","color")]),tapply(height,color,sd))
     black       blue        red 
0.07901510 0.09476411 0.08768964 
> with(na.omit(data[,c("height","color")]),tapply(height,color,length))
black  blue   red 
   28    23    19 

#(b)
> with(na.omit(data[,c("height","color")]),aov(height~color))
Call:
   aov(formula = height ~ color)

Terms:
                    color Residuals
Sum of Squares  0.0110371 0.5045472
Deg. of Freedom         2        67

Residual standard error: 0.08677877
Estimated effects may be unbalanced
> with(na.omit(data[,c("height","color")]),aov(height~color))-> var
> anova(var)
Analysis of Variance Table

Response: height
          Df  Sum Sq   Mean Sq F value Pr(>F)
color      2 0.01104 0.0055186  0.7328 0.4844
Residuals 67 0.50455 0.0075306               
> 0.0055186/0.0075306
[1] 0.7328234
