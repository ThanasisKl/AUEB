public class testPoint{
	public static void main(String[] args) {
		Point p = new Point(3,2);
		Point p2 = new Point(4,3);
		Point p3 = new Point(4,5);
		System.out.println("Point(3,2) -> "+p.x()+" "+p.y());
		System.out.println(p);

		System.out.println(p.distanceTo(p2));
		System.out.println(p.squareDistanceTo(p2));

		System.out.println(p2.squareDistanceTo(p3));


	}
}