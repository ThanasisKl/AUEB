public class Point {

	private int x,y;

	public Point(int x,int y){
		this.x = x;
		this.y= y;
	}

	public int x(){
		return this.x;
	}

	public int y(){
		return this.y;
	}

	public double distanceTo(Point z){
		int dx = this.x - z.x(); 
		int dy = this.y - z.y();
		return Math.sqrt(dx*dx + dy*dy);
	}

	public int squareDistanceTo(Point z){
		int dx = this.x - z.x(); 
		int dy = this.y - z.y();
		return dx*dx + dy*dy;
	}

	public String toString(){
		
		return "(" + this.x +", " + this.y +")";
	}

}