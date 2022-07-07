#include "p3180079-p3180057-pizza2.h"

pthread_mutex_t lock4cook;
pthread_cond_t  cond4cook;
pthread_mutex_t lock4oven;
pthread_cond_t  cond4oven;
pthread_mutex_t lock4delivery;
pthread_cond_t  cond4delivery;
pthread_mutex_t lock4screen;
pthread_mutex_t lock4time;

int available_cooks = Ncook;
int available_ovens = Noven;
int available_delivery = Ndeliver;
unsigned int global_seed;
int max_time_x = -1;
double sum_of_time_x = 0;
int max_time_y = -1;
double sum_of_time_y = 0;

void *order(void *x){
	int id = *(int *)x;
	int rc;
	struct timespec startX;
	clock_gettime(CLOCK_REALTIME,&startX);
	
	rc = pthread_mutex_lock(&lock4cook);
	while (available_cooks  == 0) {
		//Δεν υπάρχουν διαθέσιμοι μάγειρες για την παραγγελία. Blocked...
		rc = pthread_cond_wait(&cond4cook, &lock4cook);
	}
	available_cooks --;
	unsigned int local_seed = global_seed + id;
	int random_pizzas =   rand_r(&local_seed) %  Norderhigh  +  1;         //Υπολογισμός του πλήθους πιτσών της παταγγελίας.
	rc = pthread_mutex_unlock(&lock4cook);
	sleep(Tprep*random_pizzas); 
	
	rc = pthread_mutex_lock(&lock4oven);
	while (available_ovens == 0) {
		//Δεν υπάρχουν διαθέσιμοι φούρνοι για την παραγγελία: %d. Blocked...
		rc = pthread_cond_wait(&cond4oven, &lock4oven);
	}
	available_ovens --;
	available_cooks ++;                                 //Αν βρεθεί διαθέσιμος φούρνος τότε ο μάγειρας απελευθερώνεται.
	rc = pthread_cond_signal(&cond4cook);      //Σήμα στις παραγγελίες που περιμένουν διαθέσιμο μάγειρα.
	rc = pthread_mutex_unlock(&lock4oven);
	sleep(Tbake);
	
	struct timespec startY;                      // Μόλις τελειώσει το ψήσιμο ξεκινάμε να μετράμε για τον χρόνο κρυώματος.
	clock_gettime(CLOCK_REALTIME,&startY);

	rc = pthread_mutex_lock(&lock4delivery);
	while (available_delivery == 0) {
		//Δεν υπάρχουν διαθέσιμοι διανομείς για την παραγγελία: %d. Blocked...
		rc = pthread_cond_wait(&cond4delivery, &lock4delivery);
	}
	available_ovens ++;
	available_delivery--;               // Όταν ψηθεί η παταγγελία τότε αναλαμβάνει ο διανομέας.
	
	rc = pthread_cond_signal(&cond4oven);       //Σήμα στις παραγγελίες που περιμένουν διαθέσιμο φούρνο.
	rc = pthread_mutex_unlock(&lock4delivery);

	int random_time =  Tlow + rand_r(&local_seed) %  (Thigh - Tlow + 1);      //Υπολογισμός του χρόνου που χρειάζεται ο διανομέας ώστε να παραδώσει την παταγγελία.
	sleep(random_time);                                                //Ο διανομέας πάει την παραγγελία στους πελατες.
	struct timespec endX;
	struct timespec endY;
	clock_gettime(CLOCK_REALTIME,&endX);
	clock_gettime(CLOCK_REALTIME,&endY);
	rc= pthread_mutex_lock(&lock4time);
	int serve_time_x = endX.tv_sec - startX.tv_sec;
	int serve_time_y = endY.tv_sec - startY.tv_sec;

	rc= pthread_mutex_lock(&lock4screen);
	printf("Η παραγγελία με αριθμό %d παραδώθηκε σε %d  λεπτά και κρύωνε %d λεπτά.\n",id,serve_time_x,serve_time_y);    
	rc= pthread_mutex_unlock(&lock4screen);        

	if(serve_time_x > max_time_x){
		max_time_x= serve_time_x;      
	}
	if(serve_time_y > max_time_y){
		max_time_y= serve_time_y;      
	}                                   
	sum_of_time_x += serve_time_x;
	sum_of_time_y += serve_time_y;
	rc= pthread_mutex_unlock(&lock4time);

	sleep(random_time);                                          //Ο διανομέας επιστρέφει στην πιτσαρία.

	rc = pthread_mutex_lock(&lock4delivery);                                 
	available_delivery++;
	rc = pthread_cond_signal(&cond4delivery);       //Σήμα στις παραγγελίες που περιμένουν διαθέσιμο διανομέα.
	rc = pthread_mutex_unlock(&lock4delivery);

	pthread_exit(NULL);
}


int main(int argc, char **argv) {

	if (argc != 3) {
		printf("ERROR: Provide two arguments(Ncust and Seed).\n");
		return -1;
	} 

	int Ncust = atoi(argv[1]);
	unsigned int seed  =atoi(argv[2]);
	int random_sec;
	global_seed = seed;

	int id[Ncust];

	int rc;
	pthread_t threads[Ncust];

	pthread_mutex_init(&lock4cook, NULL);
	pthread_cond_init(&cond4cook, NULL);
	
	pthread_mutex_init(&lock4oven, NULL);
	pthread_cond_init(&cond4oven, NULL);

	pthread_mutex_init(&lock4delivery, NULL);
	pthread_cond_init(&cond4delivery, NULL);
	
	pthread_mutex_init(&lock4screen, NULL);
	
	pthread_mutex_init(&lock4time, NULL);

	for (int i = 0; i < Ncust; i++) {
		id[i] = i+1;
    		rc = pthread_create(&threads[i], NULL, order, &id[i]);
		if(rc != 0){
			printf("Error From pthread_create\n");
			return -1;
		}
		random_sec = rand_r(&seed) % Torderhigh + 1 ;
		sleep(random_sec);                          //Η επόμενη παραγγελία θα ξεκινήει σε random_sec δευτερόλεπτα
	}
	
	for (int i = 0; i < Ncust; i++) {
		pthread_join(threads[i], NULL);
	}
	
	pthread_mutex_destroy(&lock4cook);
	pthread_cond_destroy(&cond4cook);
	pthread_mutex_destroy(&lock4oven);
	pthread_cond_destroy(&cond4oven);
	pthread_mutex_destroy(&lock4delivery);
	pthread_cond_destroy(&cond4delivery);
	pthread_mutex_destroy(&lock4screen);
	pthread_mutex_destroy(&lock4time);
	
	if (Ncust > 0){
		printf("----------------------------------------------------------------\n");
		printf("Μέσος Χρόνος Παράδοσης Παραγγελίων: %f λεπτά\n", sum_of_time_x/Ncust);
		printf("Μέγιστος Χρόνος Παράδοσης Παραγγελίας: %d λεπτά\n",  max_time_x);
		printf("Μέσος Χρόνος Κρυώματος Παραγγελίων: %f λεπτά\n", sum_of_time_y/Ncust);
		printf("Μέγιστος Χρόνος Κρυώματος Παραγγελίας: %d λεπτά\n",  max_time_y);
		printf("----------------------------------------------------------------\n");
	}else{
		printf("Ncust must be greater than 0\n");
		return -1;
	}
	return 0;
}