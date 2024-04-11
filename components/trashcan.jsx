import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { firebaseDatabase } from './firebaseConfig';
import { ref, onValue, off } from 'firebase/database'; // Import for realtime db

const Card = ({ children, style }) => {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.cardContent}>
        {children}
      </View>
    </View>
  );
};

const TrashCan = () => {
  const [paper, setPaper] = useState(0);
  const [plastic, setPlastic] = useState(0);

  useEffect(() => {
    const databaseRef = ref(firebaseDatabase, 'smartbin');
    const fetchData = (snapshot) => {
      if (snapshot.exists()) {
        const getData = snapshot.val();
        if (getData) {
          setPaper(getData.paperbin);
          setPlastic(getData.plasticbin);
        }
      } else {
        console.log("No available data!");
      }
    };

    onValue(databaseRef, fetchData);

    return () => {
      off(databaseRef, 'value', fetchData);
    };
  }, []);

  const fillStyle_paper = {
    height: `${paper}%`,
    backgroundColor: paper >= 100 ? 'red' : 'green',
  };

  const fillStyle_plastic = {
    height: `${plastic}%`,
    backgroundColor: plastic >= 100 ? 'red' : 'green',
  };

  return (
    <View>
      <Card>
        <Text style={styles.title}>Smart Trash Bin Monitoring</Text>
        <View style={styles.trashCans}>
          <View style={styles.trashItem}>
            <View style={styles.trashCan}>
              <View style={styles.trashCanLid} />
              <View style={[styles.trashFill, fillStyle_paper]} />
              <View style={styles.trashCanHandle} />
            </View>
            <Text style={styles.fillLevelText}>{`Paper bin: ${paper}% `}</Text>
          </View>
          <View style={styles.trashItem}>
            <View style={styles.trashCan}>
              <View style={styles.trashCanLid} />
              <View style={[styles.trashFill, fillStyle_plastic]} />
              <View style={styles.trashCanHandle} />
            </View>
            <Text style={styles.fillLevelText}>{`Plastic bin: ${plastic}% `}</Text>
          </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  trashCans: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trashItem: {
    marginHorizontal: 10,
  },
  trashCan: {
    position: 'relative',
    width: 100,
    height: 150,
    backgroundColor: 'lightgray',
    borderRadius: 10,
    overflow: 'hidden',
  },
  trashFill: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  trashCanLid: {
    position: 'absolute',
    top: -20,
    width: '100%',
    height: 20,
    backgroundColor: 'lightgray',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
  },
  trashCanHandle: {
    position: 'absolute',
    top: 40,
    width: '100%',
    height: 15,
    backgroundColor: 'lightgray',
    borderTopWidth: 2,
    borderTopColor: 'gray',
  },
  fillLevelText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TrashCan;
