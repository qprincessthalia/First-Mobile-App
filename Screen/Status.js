import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function StatusUpdate({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>TASK STATUS</Text>
        
        <View style={styles.line} />

        <Text style={styles.sectionHeader}>Pending Activities</Text>
        <View style={styles.taskBox}>
          
          {/* Activity 1 */}
          <View style={styles.activityBoxFirst}>
            <Text style={styles.subjectLabel}>Subject: Mobile Programming</Text>
            <Text style={styles.taskTitle}>Title: Second Mobile App</Text>
            <Text style={styles.activityType}>Activity Type: MCO2</Text>
            <Text style={styles.description}>Description: Create a Dynamic Mobile App</Text>
            <Text style={styles.deadline}>Deadline: December 5, 2026</Text>
          </View>

        </View>

        {/* --- COMPLETED ACTIVITIES SECTION --- */}
        <Text style={[styles.sectionHeader]}>Completed Activities</Text>
        <View style={styles.taskBox}>

          {/* Completed Item 1 */}
          <View style={styles.activityBoxFirst}>
            <Text style={styles.subjectLabel}>Subject: Mobile Programming</Text>
            <Text style={styles.taskTitle}>Title: First Mobile App</Text>
            <Text style={styles.deadline}>Deadline: September 30, 2026</Text>
          </View>

          {/* Completed Item 2 */}
          <View style={styles.activityBox}>
            <Text style={styles.subjectLabel}>Subject: Reading Visual Art</Text>
            <Text style={styles.taskTitle}>Title: Learning Application</Text>
            <Text style={styles.deadline}>Deadline: September 30, 2026</Text>
          </View>

        </View>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('Status Update')}
        >
          <Text style={styles.editButtonText}>
            Edit
          </Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#008080',
    marginBottom: 5,
    textAlign: 'center',
  },
  line: {
    height: 2,
    backgroundColor: '#008080',
    marginBottom: 15,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2a5050',
    marginBottom: 8,
    marginTop: 2,
  },
  taskBox: {
    width: '100%',
    padding: 12,
    borderWidth: 2,
    borderColor: '#377979',
    borderRadius: 15,
    backgroundColor: '#F5F7FA',
    marginBottom: 10,
  },
  activityBoxFirst: {
    marginBottom: 4,
  },
  activityBox: {
    borderTopWidth: 1,
    borderTopColor: '#377979',
    paddingTop: 10,
    marginTop: 8,
    marginBottom: 4,
  },
  subjectLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#377979',
    marginBottom: 2,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  activityType: {
    fontSize: 14,
    marginBottom: 3,
    color: '#555',
  },
  description: {
    fontSize: 14,
    marginBottom: 3,
    color: '#555',
  },
  deadline: {
    fontSize: 14,
    marginBottom: 3,
    color: '#666',
  },
  editButton: {
    backgroundColor: '#008080',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});