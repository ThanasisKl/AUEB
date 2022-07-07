read.table("survey_data_2020.txt",header=TRUE,sep='\t')-> data
attach(data)
data.frame(height,shoe)->frame1
edit(frame1)->frame2
plot(frame2,xlab="Υψος",ylab="Νούμερο Παπουτσιού",main="Scatterplot")


frame2$height[!is.na(height)&!is.na(shoe)]->height_
frame2$shoe[!is.na(height)&!is.na(shoe)]-> shoe_
cor(height_,shoe_)

lm(height_~shoe_)  