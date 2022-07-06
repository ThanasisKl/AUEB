public class TreeNode{
    private Point data;
    private TreeNode left;
    private TreeNode right;

    public TreeNode(){
    }

    public TreeNode(Point data){
        this.data = data;
    }

    public Point getData() {
        return data;
    }

    public void setData(Point data) {
        this.data = data;
    }

    public TreeNode getLeft() {
        return left;
    }

    public void setLeft(TreeNode left) {
        this.left = left;
    }

    public TreeNode getRight() {
        return right;
    }

    public void setRight(TreeNode right) {
        this.right = right;
    }
}
