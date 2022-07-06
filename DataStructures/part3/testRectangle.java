public class testRectangle{
	public static void main(String[] args) {
		Rectangle r = new Rectangle(1,1,4,3);

		Point p1 = new Point(1,2);
		Point p2 = new Point(3,2);
		Point p3 = new Point(4,2);
		Point p4 = new Point(1,1);
		Point p5 = new Point(2,3);

		Point p6 = new Point(4,4);
		Point p7 = new Point(0,0);
		Point p8 = new Point(2,4);
		Point p9 = new Point(3,0);
		Point p10 = new Point(0,1);
		
		//true:
		System.out.println(r.contains(p1));
		System.out.println(r.contains(p2));
		System.out.println(r.contains(p3));
		System.out.println(r.contains(p4));
		System.out.println(r.contains(p5));
		System.out.println("_____________________");
		//false
		System.out.println(r.contains(p6));
		System.out.println(r.contains(p7));
		System.out.println(r.contains(p8));
		System.out.println(r.contains(p9));
		System.out.println(r.contains(p10));

		System.out.println("----------------------");

		Rectangle r2 = new Rectangle(1,0,4,1);
		Rectangle r3 = new Rectangle(1,4,4,5);
		Rectangle r4 = new Rectangle(3,2,5,4);
		Rectangle r5 = new Rectangle(0,0,50,50);
		Rectangle r6 = new Rectangle(0,0,100,100);
		Rectangle r7 = new Rectangle(1,1,50,50);


		System.out.println(r.intersects(r2));	//true
		System.out.println(r.intersects(r3));	//false
		System.out.println(r.intersects(r4));	//true
		System.out.println(r5.intersects(r6));  //true
		System.out.println(r7.intersects(r6));  //true


		System.out.println("-------------------------------");
		Point point = new Point(5,4);
		Point point2 = new Point(3,2);
		System.out.println(r.squareDistanceTo(point));
		System.out.println(r.squareDistanceTo(point2));

		System.out.println("-------------------------------");
		System.out.println(r);
	}
}