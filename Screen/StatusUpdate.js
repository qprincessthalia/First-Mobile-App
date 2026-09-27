import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

export default function ActivityStatus({ navigation }) {
  const [subjects, setSubjects] = useState([
    { id: 1, name: 'Subject 1', status: 'Completed' },
    { id: 2, name: 'Subject 2', status: 'Pending' },
    { id: 3, name: 'Subject 3', status: 'Pending' },
  ]);

  const [openId, setOpenId] = useState(null);

  const changeStatus = (id, status) => {
    setSubjects(
      subjects.map((subject) =>
        subject.id === id
          ? { ...subject, status: status }
          : subject
      )
    );

    setOpenId(null);
  };

  return (
    <View style={styles.container}>

      <View style={styles.box}>

        <Text style={styles.title}>Activity Status</Text>

        <View style={styles.line} />

        {subjects.map((item) => (
          <View key={item.id} style={styles.card}>

            <View style={styles.row}>

              <Text style={styles.subject}>
                Subject: {item.name}
              </Text>

              <TouchableOpacity
                style={styles.statusButton}
                onPress={() =>
                  setOpenId(
                    openId === item.id ? null : item.id
                  )
                }
              >
                <Text
                  style={
                    item.status === 'Completed'
                      ? styles.completed
                      : styles.pending
                  }
                >
                  {item.status}
                </Text>

                <Text style={styles.arrow}>⌄</Text>
              </TouchableOpacity>

            </View>

            {openId === item.id && (
              <View style={styles.dropdown}>

                <TouchableOpacity
                  style={styles.option}
                  onPress={() =>
                    changeStatus(item.id, 'Pending')
                  }
                >
                  <Text style={styles.pending}>
                    Pending
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.option}
                  onPress={() =>
                    changeStatus(item.id, 'Completed')
                  }
                >
                  <Text style={styles.completed}>
                    Completed
                  </Text>
                </TouchableOpacity>

              </View>
            )}

          </View>
        ))}

        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => navigation.navigate('Status')}
        >
          <Text style={styles.saveText}>
            SAVE UPDATE
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },

  box: {
    width: '100%',
    borderWidth: 3,
    borderColor: '#307172',
    borderRadius: 28,
    padding: 20,
    backgroundColor: '#F3F9F8',
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
  },

  line: {
    height: 1.5,
    backgroundColor: '#A2C2C1',
    marginBottom: 20,
  },

  card: {
    borderWidth: 1.5,
    borderColor: '#416368',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  subject: {
    fontSize: 15,
    color: '#1A202C',
  },

  statusButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#416368',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#F3F9F8',
  },

  completed: {
    color: '#2D8A60',
    fontSize: 14,
    fontWeight: '600',
  },

  pending: {
    color: '#D92846',
    fontSize: 14,
    fontWeight: '600',
  },

  arrow: {
    marginLeft: 4,
    color: '#416368',
  },

  dropdown: {
    marginTop: 10,
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderColor: '#416368',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },

  option: {
    padding: 10,
    minWidth: 120,
  },

  saveButton: {
    backgroundColor: '#307172',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },

  saveText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
