import java.io.*;
import java.util.*;

public class TwoDTree {

	private TreeNode head;
	private static int size = 0;


	public TwoDTree(){
		head = null;
	}

	public boolean isEmpty(){
		return head == null;
	}

	public int size(){
		return size;
	}

	public void insert(Point p){
		if(search(p)){
			System.out.println("Point " + p + " already exist in the tree.");
		}else{
			size++;
			if (isEmpty()){
				head = new TreeNode(p);
			}else{
				insertNode(p,head,head,false,1);
			}
		}
	}

	public TreeNode insertNode(Point p, TreeNode node,TreeNode previousNode, boolean flag,int code){
		if (node == null) {
            if(code == 1){
            	previousNode.setRight(new TreeNode(p));
            }else{
            	previousNode.setLeft(new TreeNode(p));
            }
            return new TreeNode(p);
        }
        if (flag) {
            if (p.y() < node.getData().y()) {
                return insertNode(p, node.getLeft(),node, !flag,0);
            }else{
            	return insertNode(p, node.getRight(),node, !flag,1);
            }
        } else {
            if (p.x() < node.getData().x()) {
                return insertNode(p, node.getLeft(),node, !flag,0);
            }else{
            	return insertNode(p, node.getRight(),node, !flag,1);
            }
        }  
	}

	public boolean search(Point p) {
        return searchfor(p, head, false);
    }

    private boolean searchfor(Point p, TreeNode node, boolean flag) {
        if (node == null) {
            return false;
        }
        if (flag) {
            if (p.y() < node.getData().y()) {
                return searchfor(p, node.getLeft(), !flag);
            } else {
                if (node.getData().x() == p.x() && node.getData().y() == p.y()) {
                    return true;
                }
                return searchfor(p, node.getRight(), !flag);
            }
        } else {
            if (p.x() < node.getData().x()) {
                return searchfor(p, node.getLeft(), !flag);
            } else {
                if (node.getData().x() == p.x() && node.getData().y() == p.y()) {
                    return true;
                }
                return searchfor(p, node.getRight(), !flag);
            }
        }

    }

 	static Point min;
	static int minDistance;

    public Point nearestNeighbor(Point p){
    	if(isEmpty())
    		return null;
    	min = head.getData();
    	minDistance = head.getData().squareDistanceTo(p);
    	nearestNeighbor2(p,head);
    	return min;
    }

    public static void nearestNeighbor2(Point p,TreeNode n){
    	if (n == null)
    		return;
	    if(minDistance > n.getData().squareDistanceTo(p)){
	    	minDistance = n.getData().squareDistanceTo(p);
	    	min = n.getData();
	    }
    	nearestNeighbor2(p,n.getLeft());
    	nearestNeighbor2(p,n.getRight());
    }

    static List<Point> list;
    public List<Point> rangeSearch(Rectangle rect){
    	list = new List<>();
    	rangeSearch2(list,rect,head);
    	return list;
    }

   public static void rangeSearch2(List<Point> list,Rectangle rect,TreeNode node){
    	if (node == null)
    		return;
    	if (rect.contains(node.getData()))
    		list.insertAtBack(node.getData());
    	rangeSearch2(list,rect,node.getLeft());
        rangeSearch2(list,rect,node.getRight());
    }

    public static void main(String[] args){

    	String txtfile = "";
		for (String i : args){
			txtfile += i;
		}

		int numOfPoints = 0;
		int x,y;
		TwoDTree tree = new TwoDTree();
		boolean flag = false;
		boolean FileFound = true;
		int i = 0;
		try{
			Scanner scanner = new Scanner(new File(txtfile));
			while(scanner.hasNext()){
				if (i == 0){
					numOfPoints = Integer.parseInt(scanner.next());
				}else{
					x = Integer.parseInt(scanner.next());
					y = Integer.parseInt(scanner.next());
					tree.insert(new Point(x,y));
					if(x > 100 || y > 100)
						flag = true;
				}
				i++;
			}
			scanner.close();
		}catch(FileNotFoundException e){
			FileFound = false;
			System.out.println("Could not find file.");
		}catch(Exception ex){     // IN CASE THAT ELEMENTS IN THE TXT FILE ARE LESS THAN THE FIRST LINE WRITE

		}

		Scanner read = new Scanner(System.in);
		String choice;
		int xmin,xmax,ymin,ymax;
		Rectangle r;
		List<Point> list;
		Node<Point> iterator;
		if((i != numOfPoints+1 || flag) && FileFound){      //IF(ELEMENTS ARE THAN THE FIRST LINE WRITE OR X,Y>0)
			System.out.println("WRONG DATA ");
		}else if (FileFound){
			while (true){
				System.out.println("------------------------------------------------");
				System.out.println("1. Compute the size of the tree");
				System.out.println("2. Insert a new point");
				System.out.println("3. Search if a given point exists in the tree");
				System.out.println("4. Provide a query rectangle");
				System.out.println("5. Provide a query point");
				System.out.println("6. Exit");
				System.out.println("------------------------------------------------");
				choice = read.next();
				if(choice.equals("1")){
					System.out.println("Size of the tree :" + tree.size());
				}else if(choice.equals("2")){
					System.out.print("Give me x : ");
					x = read.nextInt();
					System.out.print("Give me y : ");
					y = read.nextInt();
					if (x <= 100 && y <= 100){
						tree.insert(new Point(x,y));
					}else{
						System.out.println("Error: x <= 100 and y <= 100.Try Again.");
					}
				}else if(choice.equals("3")){
					System.out.print("Give me x : ");
					x = read.nextInt();
					System.out.print("Give me y : ");
					y = read.nextInt();
					if (x <= 100 && y <= 100){
						if(tree.search(new Point(x,y))){
							System.out.println("Point (" + x +", " + y +") exists in the tree ");
						}else{
							System.out.println("Point (" + x +", " + y +") does not exists in the tree ");
						}

					}else{
						System.out.println("Error: x <= 100 and y <=100.Try Again.");
					}
				}else if(choice.equals("4")){
					System.out.println("Give me xmin and xmax : ");
					xmin = read.nextInt();
					xmax = read.nextInt();
					System.out.println("Give me ymin and ymax : ");
					ymin = read.nextInt();
					ymax = read.nextInt();
					r = new Rectangle(xmin,ymin,xmax,ymax);
					list = tree.rangeSearch(r);

					System.out.println("Points inside the rectangle (" + r + ") : ");
					if (list.isEmpty()){
						System.out.println("There are no Points inside the Rectangle");
					}else{
						iterator = list.getHead();
						while(true){
							System.out.println(iterator.getData());
							iterator = iterator.getNext();
							if(iterator == null)
								break;
						}
					}

				}else if(choice.equals("5")){
					System.out.print("Give me x : ");
					x = read.nextInt();
					System.out.print("Give me y : ");
					y = read.nextInt();
					System.out.println();
					if (x <= 100 && y <= 100){
						System.out.println("The nearest point is: "+tree.nearestNeighbor(new Point(x,y)));
					}else{
						System.out.println("Error: x <= 100 and y <=100.Try Again.");
					}

				}else if(choice.equals("6")){
					break;
				}else{
					System.out.println("There are only 6 options.Try Again");
				}
			}
		}
    }
}