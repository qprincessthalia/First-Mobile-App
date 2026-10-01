import {
  StyleSheet, // CSS
  View, // responsible for what you see in the app
  Text, // the text
  TouchableOpacity, // the buttons
} from 'react-native';

export default function StatusUpdate({ navigation }) {

  return (

    <View style={styles.container}>

      <View style={styles.taskBox}>

        <Text style={styles.title}>TASK STATUS</Text>

        <View style={styles.line} />

        <Text style={styles.sectionHeader}>Pending Activities</Text>

        <View style={styles.activityBox}>

          <Text style={styles.subjectLabel}>
            Subject: Mobile Programming
          </Text>

          <Text style={styles.taskTitle}>
            Title: Second Mobile App
          </Text>

          <Text style={styles.deadline}>
            Deadline: December 5, 2026
          </Text>

        </View>

        <Text style={styles.sectionHeader}>Completed Activities</Text>

        <View style={styles.activityBox}>

          <Text style={styles.subjectLabel}>
            Subject: Mobile Programming
          </Text>

          <Text style={styles.taskTitle}>
            Title: First Mobile App
          </Text>

          <Text style={styles.deadline}>
            Deadline: September 30, 2026
          </Text>

        </View>

        <View style={styles.activityBox}>

          <Text style={styles.subjectLabel}>
            Subject: Reading Visual Art
          </Text>

          <Text style={styles.taskTitle}>
            Title: Learning Application
          </Text>

          <Text style={styles.deadline}>
            Deadline: September 30, 2026
          </Text>

        </View>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('Status Update')}
        >

          <Text style={styles.editButtonText}>EDIT</Text>

        </TouchableOpacity>

      </View>

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#D5E8F0',
  },

  taskBox: {
    width: '100%',
    padding: 25,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#C7E0EA',
    borderRadius: 22,
    marginTop: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#527589',
    textAlign: 'center',
  },

  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#C7E0EA',
    marginTop: 15,
    marginBottom: 20,
  },

  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#527589',
    marginBottom: 10,
    marginTop: 5,
  },

  activityBox: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#B8D5E1',
    borderRadius: 12,
    backgroundColor: '#F8FCFE',
    marginBottom: 15,
  },

  subjectLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#527589',
    marginBottom: 5,
  },

  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#527589',
    marginBottom: 5,
  },

  activityType: {
    fontSize: 14,
    color: '#527589',
    marginBottom: 5,
  },

  description: {
    fontSize: 14,
    color: '#527589',
    marginBottom: 5,
  },

  deadline: {
    fontSize: 14,
    color: '#527589',
  },

  editButton: {
    width: '100%',
    backgroundColor: '#8ABDD3',
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
  },

  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

});