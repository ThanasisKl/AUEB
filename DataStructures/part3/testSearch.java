public class testSearch{
	public static void main(String args[]){
		System.out.println("--------TEST FOR CLASS TwoDTree------- ");
		Point p = new Point(3,2);
		Point p2 = new Point(4,3);
		Point p3 = new Point(5,4);
		Point p4 = new Point(6,7);
		Point p5 = new Point(3,1);
		Point p6 = new Point(3,5);

		TwoDTree ob = new TwoDTree();
		ob.insert(p2);
		ob.insert(p);
		ob.insert(p3);
		ob.insert(p4);
		ob.insert(p5);
		ob.insert(p6);

		System.out.println("Search: ");

		System.out.println(ob.search(p4));
		System.out.println(ob.search(p3));
		System.out.println(ob.search(p2));
		System.out.println(ob.search(p));
		System.out.println(ob.search(new Point(0,0)));

		System.out.println("--------------------");
		
		System.out.println("nearestNeighbor:");
		System.out.println(ob.nearestNeighbor(new Point(3,4)));
		System.out.println(ob.nearestNeighbor(new Point(6,8)));
		System.out.println(ob.nearestNeighbor(new Point(5,5)));

		System.out.println("--------------------");

		System.out.println("rangeSearch:");

		Rectangle r = new Rectangle(1,1,4,3);
		List<Point> list = ob.rangeSearch(r);

		Node<Point> iterator = list.getHead();
		while(true){
			System.out.println(iterator.getData());
			iterator = iterator.getNext();
			if(iterator == null)
				break;
		}

		System.out.println("____________________");

		Rectangle r2 = new Rectangle(0,0,7,7);
		list = ob.rangeSearch(r2);

		iterator = list.getHead();
		while(true){
			System.out.println(iterator.getData());
			iterator = iterator.getNext();
			if(iterator == null)
				break;
		}
	}
}