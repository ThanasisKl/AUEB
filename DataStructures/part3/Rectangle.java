public class Rectangle {

	private int xmin,ymin,xmax,ymax;

	public Rectangle(int xmin,int ymin,int xmax,int ymax){
		this.xmin = xmin;
		this.ymin = ymin;
		this.xmax = xmax;
		this.ymax = ymax;
	}

	public int xmin(){
		return xmin;
	}

	public int ymin(){
	 	return ymin;
	}

	public int xmax(){
	 	return xmax;
	}
	
	public int ymax(){
	 	return ymax;
	}

	public boolean contains(Point p){
		if(xmax >= p.x() && xmin <= p.x() && ymax >= p.y() && ymin <= p.y())
			return true;			
		return false;
	}

	public boolean intersects(Rectangle that){
		if(this.contains(new Point(that.xmin(),that.ymin())) || this.contains(new Point(that.xmax(),that.ymax())) || this.contains(new Point(that.xmin(),that.ymax())) || this.contains(new Point(that.xmax(),that.ymin())) ) //Case: rectangle intersects other rectangle
			return true;
		if(that.contains(new Point(this.xmin(),this.ymin())) && that.contains(new Point(this.xmax(),this.ymax())) && that.contains(new Point(this.xmin(),this.ymax())) && that.contains(new Point(this.xmax(),this.ymin())))  //Case: rectangle inside rectangle
			return true;
		return false;
	}

	public double distanceTo(Point p) {

		/*Point p1 = new Point(xmin,ymin);
		Point p2 = new Point(xmax,ymax);
		Point p3 = new Point(xmin,ymax);
		Point p4 = new Point(xmax,ymin);

		int distance1 = p1.squareDistanceTo(p);
		int distance2 = p2.squareDistanceTo(p);
		int distance3 = p3.squareDistanceTo(p);
		int distance4 = p4.squareDistanceTo(p);

		if (distance1 <= distance2 &&  distance1 <= distance3 &&  distance1 <= distance4)
			return Math.sqrt(distance1);
		if (distance2 <= distance1 &&  distance2 <= distance3 &&  distance2 <= distance4)
			return Math.sqrt(distance2);
		if (distance3 <= distance1 &&  distance3 <= distance2 &&  distance3 <= distance4)
			return Math.sqrt(distance3);
		return Math.sqrt(distance4);*/
		if(this.contains(p))
			return 0;

		int min = (new Point(xmin,ymin)).squareDistanceTo(p); //RANDOM STARTING VALUE FOR MIN DISTANCE
		int x,y;
		int i;

		y = ymin;
		for(i = xmin;i <= xmax;i++){
			if(min > p.squareDistanceTo(new Point(i,y)))
				min  = p.squareDistanceTo(new Point(i,y));
		}

		y = ymax;
		for(i = xmin;i <= xmax;i++){
			if(min > p.squareDistanceTo(new Point(i,y)))
				min  = p.squareDistanceTo(new Point(i,y));
		}

		x = xmin;
		for(i = ymin;i <= ymax;i++){
			if(min > p.squareDistanceTo(new Point(x,i)))
				min  = p.squareDistanceTo(new Point(x,i));
		}

		x = xmax;
		for(i = ymin;i <= ymax;i++){
			if(min > p.squareDistanceTo(new Point(x,i)))
				min  = p.squareDistanceTo(new Point(x,i));
		}

		return Math.sqrt(min);
	}

	public int squareDistanceTo(Point p) {

	/*	Point p1 = new Point(xmin,ymin);
		Point p2 = new Point(xmax,ymax);
		Point p3 = new Point(xmin,ymax);
		Point p4 = new Point(xmax,ymin);

		int distance1 = p1.squareDistanceTo(p);
		int distance2 = p2.squareDistanceTo(p);
		int distance3 = p3.squareDistanceTo(p);
		int distance4 = p4.squareDistanceTo(p);
		if (distance1 <= distance2 &&  distance1 <= distance3 &&  distance1 <= distance4)
			return distance1;
		if (distance2 <= distance1 &&  distance2 <= distance3 &&  distance2 <= distance4)
			return distance2;
		if (distance3 <= distance1 &&  distance3 <= distance2 &&  distance3 <= distance4)
			return distance3;
		return distance4;*/
		if(this.contains(p))
			return 0;

		int min = (new Point(xmin,ymin)).squareDistanceTo(p);
		int x,y;
		int i;

		y = ymin;
		for(i = xmin;i <= xmax;i++){
			if(min > p.squareDistanceTo(new Point(i,y)))
				min  = p.squareDistanceTo(new Point(i,y));
		}

		y = ymax;
		for(i = xmin;i <= xmax;i++){
			if(min > p.squareDistanceTo(new Point(i,y)))
				min  = p.squareDistanceTo(new Point(i,y));
		}

		x = xmin;
		for(i = ymin;i <= ymax;i++){
			if(min > p.squareDistanceTo(new Point(x,i)))
				min  = p.squareDistanceTo(new Point(x,i));
		}

		x = xmax;
		for(i = ymin;i <= ymax;i++){
			if(min > p.squareDistanceTo(new Point(x,i)))
				min  = p.squareDistanceTo(new Point(x,i));
		}

		return min;

	}

	public String toString() {
		return "["+ xmin +", " + xmax + "] x [" + ymin +", " + ymax + "]";
	}  
}