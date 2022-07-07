#include "p3180079-p3180057-pizza1.h"

pthread_mutex_t lock;
pthread_cond_t  cond;
pthread_mutex_t lock2;
pthread_cond_t  cond2;
pthread_mutex_t lock4screen;
pthread_mutex_t lock4time;

int available_cooks = Ncook;
int available_ovens = Noven;
unsigned int global_seed;
int max_time = -1;
double sum_of_time = 0;

void *order(void *x){
	int id = *(int *)x;
	int rc;
	unsigned int local_seed ;
	int random_pizzas;
	struct timespec start;
	clock_gettime(CLOCK_REALTIME,&start);
	
    	rc = pthread_mutex_lock(&lock);
    	while (available_cooks  == 0) {
		//Δεν υπάρχουν διαθέσιμοι μάγειρες για την παραγγελία. Blocked...
		rc = pthread_cond_wait(&cond, &lock);
    	}
   	available_cooks --;
	local_seed = global_seed + id;
	random_pizzas =   rand_r(&local_seed) %  Norderhigh  +  1;         //Υπολογισμός του πλήθους πιτσών της παταγγελίας
	rc = pthread_mutex_unlock(&lock);
    	sleep(Tprep*random_pizzas); 
	
	rc = pthread_mutex_lock(&lock2);
	while (available_ovens == 0) {
		//Δεν υπάρχουν διαθέσιμοι φούρνοι για την παραγγελία. Blocked...
		rc = pthread_cond_wait(&cond2, &lock2);
    	}
   	available_ovens --;
	rc = pthread_mutex_unlock(&lock2);
	sleep(Tbake);

    	rc = pthread_mutex_lock(&lock);
	rc = pthread_mutex_lock(&lock2);
    	available_cooks ++;                                   
	available_ovens ++;
	rc = pthread_cond_signal(&cond);      //Σήμα στις παραγγελίες που περιμένουν διαθέσιμο μάγειρα
    	rc = pthread_mutex_unlock(&lock);
	rc = pthread_cond_signal(&cond2);    //Σήμα στις παραγγελίες που περιμένουν διαθέσιμο φούρνο
    	rc = pthread_mutex_unlock(&lock2);

	struct timespec end;
	clock_gettime(CLOCK_REALTIME,&end);
	rc= pthread_mutex_lock(&lock4time);
	int serve_time = end.tv_sec - start.tv_sec;         //Υπολιγισμός χρόνου εξυπηρέτησης παραγγελίας
	if(serve_time > max_time){
		max_time = serve_time;                                       //Υπολιγισμός μέγιστου χρόνου παραγγελίας
	}
	sum_of_time += serve_time;
	rc= pthread_mutex_unlock(&lock4time);

	rc= pthread_mutex_lock(&lock4screen);
	printf("Η παραγγελία: %d ολοκληρώθηκε, χρόνος: %d λεπτά\n",id,serve_time);    
    	rc= pthread_mutex_unlock(&lock4screen);

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

    	pthread_mutex_init(&lock, NULL);
    	pthread_cond_init(&cond, NULL);
	
	pthread_mutex_init(&lock2, NULL);
    	pthread_cond_init(&cond2, NULL);
	
	pthread_mutex_init(&lock4screen, NULL);

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
	
    	pthread_mutex_destroy(&lock);
    	pthread_cond_destroy(&cond);
	pthread_mutex_destroy(&lock2);
    	pthread_cond_destroy(&cond2);
	pthread_mutex_destroy(&lock4screen);
	pthread_mutex_destroy(&lock4time);
	
	if (Ncust > 0){
		printf("----------------------------------------------------------------\n");
		printf("Μέσος Χρόνος Εξυπηρέτησης Παραγγελίας: %f λεπτά\n", sum_of_time/Ncust);
		printf("Μέγιστος Χρόνος Εξυπηρέτησης Παραγγελίας: %d λεπτά\n", max_time);
		printf("----------------------------------------------------------------\n");
	}else{
		printf("Ncust must be greater than 0\n");
		return -1;
	}
    	return 0;
}