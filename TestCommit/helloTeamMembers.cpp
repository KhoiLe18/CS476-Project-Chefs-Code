#include <iostream>
#include <string>

using namespace std;

int main() {
	string member1, member2, member3, member4, member5, member6;
	member1 = "Khoi Le";
	member2 = "Alia Sayeed :)";
	member3 = "Nairit Patel";
	string membersList[6] = {member1, member2, member3, member4, member5, member6};

	for (int i = 0; i < 6; i++) {
		cout << (membersList[i]) << "\n";
	}
	
	return 0;
}
