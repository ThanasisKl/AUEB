#(a)
read.table('data.txt',header = TRUE, sep = '\t',stringsAsFactors = TRUE) -> data
attach(data)
levels(color)
tabulate(color)
detach(data)
edit(data)-> data #height=176
attach(data)
plot(height~color)
with(na.omit(data[,c("height","color")]),tapply(height,color,mean))
with(na.omit(data[,c("height","color")]),tapply(height,color,sd))
with(na.omit(data[,c("height","color")]),tapply(height,color,length))

#(b)
with(na.omit(data[,c("height","color")]),aov(height~color))

with(na.omit(data[,c("height","color")]),aov(height~color))-> var
anova(var)            
0.0055186/0.0075306

